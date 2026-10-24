import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
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
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#FBB600]/25 text-[#0F296B] border border-[#FBB600]/60 shrink-0">
                  <span class="w-2 h-2 rounded-full bg-[#E5A500] animate-ping shrink-0"></span>
                  Último Comunicado Oficial
                </span>
                <span class="inline-flex items-center gap-1 text-[11px] text-[#254EB6] font-semibold bg-white px-2 py-0.5 rounded-full border border-blue-200 shrink-0">
                  <app-icon name="facebook" [size]="13" className="text-[#254EB6]"></app-icon>
                  Facebook Oficial
                </span>
              </div>
              <div class="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <app-icon name="calendar" [size]="13" className="text-gray-400"></app-icon>
                <span>{{ formatDate(announcement()!.fecha) }}</span>
              </div>
            </div>

            <!-- Botón de cierre superior -->
            <button
              type="button"
              (click)="closeModal()"
              class="text-gray-400 hover:text-[#0F296B] hover:bg-gray-200/60 p-1.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F296B] shrink-0"
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

            <!-- Imagen si existe -->
            @if (announcement()!.imagenUrl) {
              <div class="relative w-full rounded-xl overflow-hidden border-2 border-gray-200/80 bg-gray-100 shadow-sm group">
                <img
                  [src]="announcement()!.imagenUrl"
                  [alt]="announcement()!.titulo"
                  class="w-full h-48 sm:h-64 object-cover object-center transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />
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
export class LatestAnnouncementModalComponent implements OnInit {
  private api = inject(PortalApiService);

  announcement = signal<EventModel | null>(null);
  isOpen = signal<boolean>(false);

  @ViewChild('modalContainer') modalContainer?: ElementRef<HTMLDivElement>;

  private previousActiveElement: HTMLElement | null = null;
  private readonly SESSION_STORAGE_KEY = 'doramayer_announcement_seen_v1';

  ngOnInit(): void {
    // Cargar último comunicado oficial desde la API / DB
    this.api.getLatestAnnouncement().subscribe({
      next: (event) => {
        if (event) {
          this.announcement.set(event);
          // Verificar si ya fue cerrado en esta sesión de navegación
          const seen = sessionStorage.getItem(this.SESSION_STORAGE_KEY);
          if (!seen) {
            this.openModal();
          }
        }
      },
      error: () => {
        // En caso de error de red, no interrumpir la navegación
      }
    });
  }

  openModal(): void {
    this.previousActiveElement = document.activeElement as HTMLElement;
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';

    // Foco en la ventana modal para accesibilidad
    setTimeout(() => {
      this.modalContainer?.nativeElement.focus();
    }, 50);
  }

  closeModal(): void {
    this.isOpen.set(false);
    document.body.style.overflow = '';
    sessionStorage.setItem(this.SESSION_STORAGE_KEY, 'true');

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
