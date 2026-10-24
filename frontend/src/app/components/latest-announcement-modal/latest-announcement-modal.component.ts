import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalApiService } from '../../services/portal-api.service';
import { EventModel } from '../../models/portal.models';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-latest-announcement-modal',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen() && announcement()) {
      <!-- Backdrop translúcido con desenfoque suave -->
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-announcement-title"
        (click)="onBackdropClick($event)"
      >
        <!-- Modal Card con MARCO GRUESO institucional -->
        <div
          #modalContainer
          tabindex="-1"
          class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-4 border-[#0F296B] ring-4 ring-[#FBB600]/40 overflow-hidden flex flex-col max-h-[92vh] focus:outline-none transition-transform animate-scale-up"
          (click)="$event.stopPropagation()"
        >
          <!-- Barra superior dorada institucional -->
          <div class="h-2 w-full bg-gradient-to-r from-[#0F296B] via-[#FBB600] to-[#254EB6]"></div>

          <!-- Cabecera de la Card -->
          <div class="px-4 sm:px-7 pt-4 pb-3 flex items-start justify-between gap-3 border-b border-gray-100 bg-[#F4F6FB]">
            <div class="flex flex-col gap-1.5 flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#FBB600]/25 text-[#0F296B] border border-[#FBB600]/60 shrink-0">
                  <span class="w-2 h-2 rounded-full bg-[#E5A500] animate-ping shrink-0"></span>
                  <span>Último Comunicado Oficial</span>
                </span>
                <span class="inline-flex items-center gap-1 text-xs text-[#254EB6] font-semibold bg-white px-2.5 py-0.5 rounded-full border border-blue-200 shrink-0">
                  <app-icon name="facebook" [size]="14" className="text-[#254EB6]"></app-icon>
                  <span>Facebook Oficial</span>
                </span>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <app-icon name="calendar" [size]="14" className="text-gray-400"></app-icon>
                <span>{{ formatDate(announcement()!.fecha) }}</span>
              </div>
            </div>

            <!-- Botón de cierre superior -->
            <button
              type="button"
              (click)="closeModal()"
              class="text-gray-400 hover:text-[#0F296B] hover:bg-gray-200/60 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F296B] shrink-0"
              aria-label="Cerrar comunicado"
            >
              <app-icon name="close" [size]="20"></app-icon>
            </button>
          </div>

          <!-- Cuerpo deslizable con la información del comunicado -->
          <div class="px-5 sm:px-7 py-4 overflow-y-auto space-y-4">
            <!-- Título del Comunicado -->
            <h3
              id="modal-announcement-title"
              class="font-serif text-xl sm:text-2xl font-bold text-[#0F296B] leading-tight"
            >
              {{ announcement()!.titulo }}
            </h3>

            <!-- Galería Multi-imagen con rotación automática suave -->
            @if (activeImages().length > 0) {
              <div class="relative w-full rounded-xl overflow-hidden border-2 border-gray-200/80 bg-gray-100 shadow-sm group">
                <div class="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-900">
                  @for (img of activeImages(); track img; let i = $index) {
                    <img
                      [src]="img"
                      [alt]="announcement()!.titulo + ' foto ' + (i + 1)"
                      class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
                      [class.opacity-100]="activeImageIndex() === i"
                      [class.opacity-0]="activeImageIndex() !== i"
                      loading="lazy"
                    />
                  }
                </div>

                <!-- Indicadores de fotos múltiples si hay más de 1 -->
                @if (activeImages().length > 1) {
                  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs z-10">
                    @for (img of activeImages(); track img; let i = $index) {
                      <button
                        type="button"
                        (click)="setActiveImage(i)"
                        [class]="activeImageIndex() === i ? 'w-5 bg-[#FBB600]' : 'w-1.5 bg-white/70 hover:bg-white'"
                        class="h-1.5 rounded-full transition-all cursor-pointer"
                        [attr.aria-label]="'Ver imagen ' + (i + 1)"
                      ></button>
                    }
                  </div>
                }
              </div>
            }

            <!-- Resumen destacado -->
            <div class="bg-[#F4F6FB] border-l-4 border-[#FBB600] p-4 rounded-r-lg text-gray-800 text-sm sm:text-base leading-relaxed italic font-serif">
              "{{ announcement()!.resumen }}"
            </div>

            <!-- Contenido detallado -->
            <div class="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-2">
              {{ announcement()!.contenido }}
            </div>
          </div>

          <!-- Pie con acciones y botón directo a Facebook -->
          <div class="px-5 sm:px-7 py-4 bg-gray-50 border-t border-gray-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            @if (announcement()!.facebookPermalink) {
              <a
                [href]="announcement()!.facebookPermalink"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-[#254EB6] text-[#254EB6] hover:bg-blue-50 font-semibold text-sm transition-colors group"
              >
                <app-icon name="facebook" [size]="16" className="text-[#254EB6] group-hover:scale-110 transition-transform"></app-icon>
                <span>Ver publicación original en Facebook</span>
                <app-icon name="external-link" [size]="14" className="text-gray-400 group-hover:text-[#254EB6]"></app-icon>
              </a>
            } @else {
              <a
                href="https://www.facebook.com/doramayer.dezulen"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-[#254EB6] text-[#254EB6] hover:bg-blue-50 font-semibold text-sm transition-colors group"
              >
                <app-icon name="facebook" [size]="16" className="text-[#254EB6] group-hover:scale-110 transition-transform"></app-icon>
                <span>Visitar Facebook Oficial</span>
                <app-icon name="external-link" [size]="14" className="text-gray-400 group-hover:text-[#254EB6]"></app-icon>
              </a>
            }

            <button
              type="button"
              (click)="closeModal()"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#0F296B] hover:bg-[#1A3D8F] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#FBB600]"
            >
              <app-icon name="check-circle" [size]="16" className="text-[#FBB600]"></app-icon>
              <span>Entendido / Continuar al portal</span>
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleUp {
      from { transform: scale(0.97); }
      to { transform: scale(1); }
    }
    .animate-fade-in {
      animation: fadeIn 0.2s ease-out forwards;
    }
    .animate-scale-up {
      animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class LatestAnnouncementModalComponent implements OnInit, OnDestroy {
  private api = inject(PortalApiService);

  announcement = signal<EventModel | null>(null);
  isOpen = signal<boolean>(false);
  activeImageIndex = signal<number>(0);

  activeImages = computed(() => {
    const a = this.announcement();
    if (!a) return [];
    if (a.imagenes && a.imagenes.length > 0) {
      return a.imagenes;
    }
    return a.imagenUrl ? [a.imagenUrl] : [];
  });

  @ViewChild('modalContainer') modalContainer?: ElementRef<HTMLDivElement>;

  private previousActiveElement: HTMLElement | null = null;
  private imageRotationTimer: any = null;

  ngOnInit(): void {
    // Cargar último comunicado oficial en tiempo real desde la base de datos
    this.api.getLatestAnnouncement().subscribe({
      next: (event) => {
        if (event) {
          this.announcement.set(event);
          this.activeImageIndex.set(0);
          // Siempre abrir en primer plano al ingresar o recargar el portal
          this.openModal();
          this.startImageRotation();
        }
      },
      error: () => {}
    });
  }

  ngOnDestroy(): void {
    this.stopImageRotation();
  }

  private startImageRotation(): void {
    this.stopImageRotation();
    if (this.activeImages().length > 1) {
      this.imageRotationTimer = setInterval(() => {
        const next = (this.activeImageIndex() + 1) % this.activeImages().length;
        this.activeImageIndex.set(next);
      }, 4000);
    }
  }

  private stopImageRotation(): void {
    if (this.imageRotationTimer) {
      clearInterval(this.imageRotationTimer);
      this.imageRotationTimer = null;
    }
  }

  setActiveImage(index: number): void {
    this.activeImageIndex.set(index);
    this.startImageRotation(); // reiniciar timer al interactuar
  }

  openModal(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      this.modalContainer?.nativeElement.focus();
    }, 50);
  }

  closeModal(): void {
    this.stopImageRotation();
    this.isOpen.set(false);
    document.body.style.overflow = '';

    if (this.previousActiveElement) {
      this.previousActiveElement.focus();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  @HostListener('window:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.isOpen()) {
      event.preventDefault();
      this.closeModal();
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        const months = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const monthName = months[monthNum - 1] || '';
        return `Publicado el ${day} de ${monthName} de ${year}`;
      }
      return dateStr;
    } catch {
      return dateStr;
    }
  }
}
