import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { PortalApiService } from '../../services/portal-api.service';
import { TestimonialModel } from '../../models/portal.models';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="testimonios" class="py-20 bg-white border-b border-[#0F296B]/15 overflow-hidden select-none">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <!-- Header de Sección Sobrio y Editorial -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-white text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider border border-[#0F296B]/15 rounded-full shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>Voces de nuestra comunidad mayerina</span>
            </div>
            <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F296B] tracking-tight">
              Voces de la Familia Mayerina
            </h2>
            <p class="font-sans text-sm text-slate-600 leading-relaxed font-normal">
              Testimonios de exalumnos egresados y familias que vivieron en primera persona el lema de Estudio, Trabajo y Amistad forjado en nuestras aulas del Rímac.
            </p>
          </div>
          
          <div class="hidden md:flex items-center space-x-2 font-sans text-xs text-slate-500 font-medium">
            <span class="w-2 h-2 rounded-full bg-[#254EB6]"></span>
            <span>Testimonios registrados en archivo escolar</span>
          </div>
        </div>

        <!-- Carrusel Enmarcado con Botones Ergonómicos < y > Centrados -->
        <div
          class="relative px-2 sm:px-8"
          (mouseenter)="pauseAutoPlay()"
          (mouseleave)="resumeAutoPlay()"
          (focusin)="pauseAutoPlay()"
          (focusout)="resumeAutoPlay()"
        >
          
          <!-- Botón Anterior Flotante Ergonómico '<' -->
          @if (totalPages() > 1) {
            <button
              type="button"
              (click)="prev()"
              (mouseenter)="pauseAutoPlay()"
              (mouseleave)="resumeAutoPlay()"
              aria-label="Página anterior de testimonios"
              class="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#0F296B] text-[#0F296B] hover:text-white border border-[#0F296B]/25 shadow-md hover:shadow-lg flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#254EB6]"
            >
              <span class="font-mono text-xl sm:text-2xl leading-none select-none">&lt;</span>
            </button>
          }

          <!-- Contenedor con Deslizamiento por Páginas Completas (Zero Cortes, 100% Centrado) -->
          <div
            class="overflow-hidden py-2"
            (touchstart)="onTouchStart($event)"
            (touchmove)="onTouchMove($event)"
            (touchend)="onTouchEnd()"
          >
            <div
              class="flex transition-transform duration-500 ease-in-out"
              [style.transform]="'translateX(-' + (currentPage() * 100) + '%)'"
            >
              @for (page of pagedTestimonials(); track $index; let pIdx = $index) {
                <div class="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
                  @for (item of page; track item.id) {
                    <div
                      (mouseenter)="pauseAutoPlay()"
                      (mouseleave)="resumeAutoPlay()"
                      class="bg-[#F4F6FB] rounded-sm p-6 border border-[#0F296B]/15 shadow-card-soft hover:shadow-card-elevated hover:-translate-y-1 transition-all duration-300 min-h-[380px] sm:min-h-[390px] flex flex-col justify-between"
                    >
                      
                      <!-- Encabezado de Tarjeta con Etiqueta Cálida Humana -->
                      <div class="space-y-3">
                        <div class="flex items-center justify-between border-b border-[#0F296B]/10 pb-2.5">
                          <span class="font-sans text-[11px] font-bold text-[#0F296B] uppercase tracking-wider truncate">
                            {{ item.detalle || ('Egresado Promoción ' + (item.id)) }}
                          </span>
                          <div class="text-[#FBB600] text-2xl font-serif font-black leading-none">“</div>
                        </div>

                        <!-- Cita Testimonial en Cursiva -->
                        <div class="min-h-[140px] max-h-[160px] overflow-hidden text-slate-700 leading-relaxed font-sans italic text-xs sm:text-[13px]">
                          <p class="italic line-clamp-5">“{{ item.texto }}”</p>
                        </div>

                        <button
                          type="button"
                          (click)="openModal(item)"
                          class="font-sans text-xs font-bold text-[#254EB6] hover:text-[#0F296B] flex items-center space-x-1 uppercase transition-colors cursor-pointer pt-1"
                        >
                          <span>Leer completo</span>
                          <app-icon name="arrow-right" size="13"></app-icon>
                        </button>
                      </div>

                      <!-- Autor Institucional con Fotografía Real y Rostro Visible -->
                      <div class="pt-3 border-t border-[#0F296B]/10 flex items-center space-x-3.5">
                        <div class="w-14 h-14 rounded-sm border border-[#0F296B]/20 shadow-xs overflow-hidden bg-slate-200 shrink-0">
                          <img
                            [src]="item.fotoUrl"
                            [alt]="item.nombre"
                            class="w-full h-full object-cover object-[center_15%] pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <div class="min-w-0">
                          <div class="font-serif font-bold text-sm text-[#0F296B] truncate">{{ item.nombre }}</div>
                          <div class="text-[11px] font-sans text-[#254EB6] font-bold uppercase truncate">{{ item.profesion }}</div>
                          <div class="text-[10px] font-sans text-slate-500 uppercase font-medium truncate">{{ item.detalle }}</div>
                        </div>
                      </div>

                    </div>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Botón Siguiente Flotante Ergonómico '>' -->
          @if (totalPages() > 1) {
            <button
              type="button"
              (click)="next()"
              (mouseenter)="pauseAutoPlay()"
              (mouseleave)="resumeAutoPlay()"
              aria-label="Página siguiente de testimonios"
              class="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#0F296B] text-[#0F296B] hover:text-white border border-[#0F296B]/25 shadow-md hover:shadow-lg flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#254EB6]"
            >
              <span class="font-mono text-xl sm:text-2xl leading-none select-none">&gt;</span>
            </button>
          }

        </div>

        <!-- Indicadores de Navegación por Páginas (Dots Dinámicos) -->
        @if (totalPages() > 1) {
          <div class="flex items-center justify-center space-x-2.5 pt-2">
            @for (page of pagedTestimonials(); track $index; let idx = $index) {
              <button
                type="button"
                (click)="goToPage(idx)"
                [class]="currentPage() === idx ? 'w-8 bg-[#254EB6]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'"
                class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                [attr.aria-label]="'Ir a página de testimonios ' + (idx + 1)"
              ></button>
            }
          </div>
        }

      </div>

      <!-- MODAL CENTRADO ACCESIBLE PARA LECTURA COMPLETA -->
      @if (selectedTestimonial(); as modalItem) {
        <div
          class="fixed inset-0 z-50 bg-[#0F296B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-modalFadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-testimonio-nombre"
          (click)="closeModal()"
        >
          <div
            class="bg-white rounded-sm border border-[#0F296B]/25 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-card-elevated relative my-8"
            (click)="$event.stopPropagation()"
          >
            <!-- Cabecera del Modal -->
            <div class="flex items-start justify-between border-b border-[#0F296B]/15 pb-4">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 rounded-sm border border-[#0F296B]/20 shadow-xs overflow-hidden bg-slate-100 shrink-0">
                  <img
                    [src]="modalItem.fotoUrl"
                    [alt]="modalItem.nombre"
                    class="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
                <div>
                  <h3 id="modal-testimonio-nombre" class="font-serif text-lg font-bold text-[#0F296B]">
                    {{ modalItem.nombre }}
                  </h3>
                  <div class="font-sans text-xs font-bold text-[#254EB6] uppercase">
                    {{ modalItem.profesion }}
                  </div>
                  <div class="font-sans text-[11px] text-slate-500 uppercase font-medium">
                    {{ modalItem.detalle }}
                  </div>
                </div>
              </div>

              <button
                type="button"
                (click)="closeModal()"
                class="p-1 rounded-sm text-slate-400 hover:text-[#0F296B] transition-colors cursor-pointer"
                aria-label="Cerrar testimonio"
              >
                <app-icon name="close" size="22"></app-icon>
              </button>
            </div>

            <!-- Cita Completa -->
            <div class="space-y-3 font-sans text-slate-700 text-sm sm:text-base leading-relaxed italic border-l-2 border-[#FBB600] pl-4 py-1">
              “{{ modalItem.texto }}”
            </div>

            <!-- Pie del Modal -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
              <span class="font-semibold text-[#0F296B]">I.E.P. Dora Mayer de Zulen</span>
              <button
                type="button"
                (click)="closeModal()"
                class="px-5 py-2 bg-[#254EB6] hover:bg-[#0F296B] text-white rounded-sm font-bold uppercase text-xs transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      }

    </section>
  `
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private api = inject(PortalApiService);

  testimonials = signal<TestimonialModel[]>([]);
  selectedTestimonial = signal<TestimonialModel | null>(null);

  currentPage = signal<number>(0);
  visibleCards = signal<number>(3);

  // Agrupamiento dinámico por páginas completas
  pagedTestimonials = computed(() => {
    const list = this.testimonials();
    const size = this.visibleCards();
    if (!list || list.length === 0) return [];
    const pages: TestimonialModel[][] = [];
    for (let i = 0; i < list.length; i += size) {
      pages.push(list.slice(i, i + size));
    }
    return pages;
  });

  totalPages = computed(() => this.pagedTestimonials().length);

  private autoPlayTimer: any = null;
  private isPaused = false;

  private touchStartX = 0;
  private touchEndX = 0;

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCards();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.selectedTestimonial()) {
      this.closeModal();
    }
  }

  ngOnInit() {
    this.loadTestimonials();
    this.updateVisibleCards();
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private loadTestimonials() {
    this.api.getRandomTestimonials(6).subscribe({
      next: data => {
        if (data && data.length > 0) {
          this.testimonials.set(data);
          this.updateVisibleCards();
        }
      },
      error: () => {
        // Fallback already handled inside service
      }
    });
  }

  openModal(item: TestimonialModel) {
    this.selectedTestimonial.set(item);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.selectedTestimonial.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  private updateVisibleCards() {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width >= 1024) {
      this.visibleCards.set(3);
    } else if (width >= 640) {
      this.visibleCards.set(2);
    } else {
      this.visibleCards.set(1);
    }

    if (this.currentPage() >= this.totalPages() && this.totalPages() > 0) {
      this.currentPage.set(this.totalPages() - 1);
    }
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.autoPlayTimer = setInterval(() => {
      if (!this.isPaused && !this.selectedTestimonial() && this.totalPages() > 1) {
        this.next();
      }
    }, 7000);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  pauseAutoPlay() {
    this.isPaused = true;
  }

  resumeAutoPlay() {
    this.isPaused = false;
  }

  next() {
    const total = this.totalPages();
    if (total <= 1) return;
    this.currentPage.update(p => (p + 1) % total);
  }

  prev() {
    const total = this.totalPages();
    if (total <= 1) return;
    this.currentPage.update(p => (p <= 0 ? total - 1 : p - 1));
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }

  onTouchStart(e: TouchEvent) {
    this.pauseAutoPlay();
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchMove(e: TouchEvent) {
    this.touchEndX = e.touches[0].clientX;
  }

  onTouchEnd() {
    this.resumeAutoPlay();
    const deltaX = this.touchStartX - this.touchEndX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }
}
