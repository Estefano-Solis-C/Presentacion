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
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { PortalApiService } from '../../services/portal-api.service';
import { EventModel } from '../../models/portal.models';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="eventos" class="py-20 bg-[#F4F6FB] border-b border-[#0F296B]/15 select-none">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Header de Sección -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-white text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider rounded-full border border-[#0F296B]/15 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>Boletín y circulares oficiales</span>
            </div>
            <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F296B] tracking-tight">
              Comunicados, Eventos y Noticias
            </h2>
            <p class="font-sans text-sm text-slate-600 leading-relaxed font-normal">
              Información oficial sobre el calendario escolar, fechas cívicas y circulares emitidas por la Dirección y Secretaría de la I.E.P. Dora Mayer de Zulen.
            </p>
          </div>

          <!-- Filtros de Categoría Funcionales -->
          <div class="flex flex-wrap gap-2 text-xs font-sans font-bold">
            <button
              type="button"
              (click)="setFilter('TODOS')"
              [class]="selectedFilter() === 'TODOS' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3.5 py-1.5 uppercase transition-all rounded-sm cursor-pointer"
            >
              Todos
            </button>
            <button
              type="button"
              (click)="setFilter('COMUNICADO')"
              [class]="selectedFilter() === 'COMUNICADO' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3.5 py-1.5 uppercase transition-all rounded-sm cursor-pointer"
            >
              Comunicados
            </button>
            <button
              type="button"
              (click)="setFilter('EVENTO')"
              [class]="selectedFilter() === 'EVENTO' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3.5 py-1.5 uppercase transition-all rounded-sm cursor-pointer"
            >
              Eventos
            </button>
          </div>
        </div>

        <!-- Contenedor Enmarcado con Carrusel / Cuadrícula -->
        <div class="relative px-2 sm:px-12">
          
          @if (filteredEvents().length > visibleCards()) {
            <button
              type="button"
              (click)="prev()"
              aria-label="Noticia anterior"
              class="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#254EB6] hover:bg-[#0F296B] text-white shadow-md flex items-center justify-center transition-all cursor-pointer"
            >
              <app-icon name="arrow-left" size="18"></app-icon>
            </button>
          }

          <!-- Contenedor Deslizable de Tarjetas -->
          <div
            #carouselContainer
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
            (focusin)="onMouseEnter()"
            (focusout)="onMouseLeave()"
            (touchstart)="onTouchStart($event)"
            (touchmove)="onTouchMove($event)"
            (touchend)="onTouchEnd()"
            class="flex space-x-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth"
          >
            @for (evento of filteredEvents(); track evento.id; let i = $index) {
              <div
                [attr.data-index]="i"
                class="w-[85vw] sm:w-[350px] lg:w-[364px] min-w-[260px] sm:min-w-[350px] max-w-[380px] bg-white rounded-sm border border-[#0F296B]/15 shadow-card-soft hover:shadow-card-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden shrink-0"
              >
                <!-- Banner Fotográfico Superior -->
                <div class="relative h-48 sm:h-52 overflow-hidden border-b border-[#0F296B]/10 bg-slate-100">
                  <img
                    [src]="getEventoImage(evento)"
                    [alt]="evento.titulo"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-500 pointer-events-none"
                    loading="lazy"
                  />
                  <div class="absolute top-2 left-2 bg-[#0F296B] text-white font-sans text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-xs border border-white/20">
                    {{ formatFecha(evento.fecha) }}
                  </div>
                  @if (evento.destacado) {
                    <div class="absolute top-2 right-2 bg-[#FBB600] text-slate-950 font-sans text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs shadow-xs flex items-center space-x-1">
                      <app-icon name="sparkles" size="12"></app-icon>
                      <span>Destacado</span>
                    </div>
                  }
                </div>

                <!-- Cuerpo de Noticia -->
                <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div class="space-y-2.5">
                    <span
                      [class]="getBadgeClass(evento.tipo)"
                      class="inline-block px-2.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-xs"
                    >
                      {{ evento.tipo }}
                    </span>

                    <h3 class="font-serif text-base sm:text-lg font-bold text-[#0F296B] leading-snug line-clamp-2">
                      {{ evento.titulo }}
                    </h3>

                    <p class="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3 font-normal">
                      {{ evento.resumen }}
                    </p>
                  </div>

                  <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span class="font-sans text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Circular Oficial</span>
                    <button
                      type="button"
                      (click)="openModal(evento)"
                      class="font-sans text-xs font-bold text-[#254EB6] hover:text-[#0F296B] flex items-center space-x-1 transition uppercase cursor-pointer"
                    >
                      <span>Leer más</span>
                      <app-icon name="arrow-right" size="13"></app-icon>
                    </button>
                  </div>
                </div>

              </div>
            }
          </div>

          @if (filteredEvents().length > visibleCards()) {
            <button
              type="button"
              (click)="next()"
              aria-label="Noticia siguiente"
              class="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#254EB6] hover:bg-[#0F296B] text-white shadow-md flex items-center justify-center transition-all cursor-pointer"
            >
              <app-icon name="arrow-right" size="18"></app-icon>
            </button>
          }

        </div>

        <!-- Indicadores de Navegación Dinámicos -->
        @if (dotIndexes().length > 1) {
          <div class="flex items-center justify-center space-x-2 pt-2">
            @for (idx of dotIndexes(); track idx) {
              <button
                type="button"
                (click)="scrollToIndex(idx)"
                [class]="currentIndex() === idx ? 'w-8 bg-[#254EB6]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'"
                class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                [attr.aria-label]="'Ir a evento ' + (idx + 1)"
              ></button>
            }
          </div>
        }

      </div>

      <!-- MODAL CENTRADO ACCESIBLE PARA LECTURA COMPLETA DEL EVENTO -->
      @if (selectedEvent(); as modalItem) {
        <div
          class="fixed inset-0 z-50 bg-[#0F296B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-modalFadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-event-title"
          (click)="closeModal()"
        >
          <div
            class="bg-white rounded-sm border border-[#0F296B]/25 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-card-elevated relative my-8 max-h-[88vh] overflow-y-auto"
            (click)="$event.stopPropagation()"
          >
            <!-- Cabecera del Modal -->
            <div class="flex items-start justify-between border-b border-[#0F296B]/15 pb-4">
              <div class="space-y-1 pr-4">
                <div class="flex items-center space-x-2">
                  <span
                    [class]="getBadgeClass(modalItem.tipo)"
                    class="inline-block px-2.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-xs"
                  >
                    {{ modalItem.tipo }}
                  </span>
                  <span class="text-xs text-slate-500 font-sans font-semibold">
                    {{ formatFecha(modalItem.fecha) }}
                  </span>
                </div>
                <h3 id="modal-event-title" class="font-serif text-xl sm:text-2xl font-bold text-[#0F296B] leading-snug">
                  {{ modalItem.titulo }}
                </h3>
              </div>

              <button
                type="button"
                (click)="closeModal()"
                class="p-1 rounded-sm text-slate-400 hover:text-[#0F296B] transition-colors cursor-pointer shrink-0"
                aria-label="Cerrar comunicado"
              >
                <app-icon name="close" size="22"></app-icon>
              </button>
            </div>

            <!-- Imagen del Evento si existe -->
            @if (modalItem.imagenUrl) {
              <div class="rounded-sm overflow-hidden border border-[#0F296B]/15 max-h-72 bg-slate-100">
                <img
                  [src]="getEventoImage(modalItem)"
                  [alt]="modalItem.titulo"
                  class="w-full h-full object-cover"
                />
              </div>
            }

            <!-- Resumen Destacado -->
            <div class="p-4 bg-[#F4F6FB] rounded-sm border-l-4 border-[#254EB6] text-xs sm:text-sm font-sans font-semibold text-[#0F296B]">
              {{ modalItem.resumen }}
            </div>

            <!-- Contenido Completo del Comunicado -->
            <div class="space-y-3 font-sans text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {{ modalItem.contenido }}
            </div>

            <!-- Pie del Modal -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-sans">
              <span class="font-semibold text-[#0F296B]">I.E.P. Dora Mayer de Zulen · Rímac</span>
              <button
                type="button"
                (click)="closeModal()"
                class="px-5 py-2 bg-[#254EB6] hover:bg-[#0F296B] text-white rounded-sm font-bold uppercase text-xs transition cursor-pointer"
              >
                Cerrar Comunicado
              </button>
            </div>

          </div>
        </div>
      }

    </section>
  `
})
export class EventsComponent implements OnInit, OnDestroy {
  @ViewChild('carouselContainer', { static: false })
  carouselContainer?: ElementRef<HTMLDivElement>;

  private api = inject(PortalApiService);

  events = signal<EventModel[]>([]);
  selectedFilter = signal<string>('TODOS');
  selectedEvent = signal<EventModel | null>(null);

  currentIndex = signal<number>(0);
  visibleCards = signal<number>(3);

  filteredEvents = computed(() => {
    const list = this.events();
    const filter = this.selectedFilter();
    if (filter === 'TODOS') return list;
    return list.filter(e => e.tipo === filter);
  });

  totalCards = computed(() => this.filteredEvents().length);
  maxIndex = computed(() => Math.max(0, this.totalCards() - this.visibleCards()));
  dotIndexes = computed(() => Array.from({ length: this.maxIndex() + 1 }, (_, i) => i));

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
    if (event.key === 'Escape' && this.selectedEvent()) {
      this.closeModal();
    }
  }

  ngOnInit() {
    this.loadEvents();
    this.updateVisibleCards();
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private loadEvents() {
    this.api.getEvents().subscribe({
      next: data => {
        if (data && data.length > 0) {
          this.events.set(data);
          this.updateVisibleCards();
        }
      },
      error: () => {}
    });
  }

  setFilter(filter: string) {
    this.selectedFilter.set(filter);
    this.currentIndex.set(0);
    this.scrollToIndex(0);
  }

  openModal(item: EventModel) {
    this.selectedEvent.set(item);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    this.selectedEvent.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  getEventoImage(evento: EventModel): string {
    if (evento.imagenUrl && evento.imagenUrl.trim().length > 0) {
      return evento.imagenUrl;
    }
    return '/images/posts/inicio_clases.jpg';
  }

  formatFecha(fechaStr: string): string {
    if (!fechaStr) return '';
    try {
      const parts = fechaStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const month = parts[1];
        const day = parts[2];
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
        const mIdx = parseInt(month, 10) - 1;
        return `${day} ${months[mIdx] || ''} ${year}`;
      }
    } catch (e) {}
    return fechaStr;
  }

  getBadgeClass(tipo: string): string {
    if (tipo === 'COMUNICADO') {
      return 'bg-[#0F296B]/10 text-[#0F296B] border border-[#0F296B]/20';
    }
    return 'bg-[#254EB6]/10 text-[#254EB6] border border-[#254EB6]/20';
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

    if (this.currentIndex() > this.maxIndex()) {
      this.currentIndex.set(this.maxIndex());
    }
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.autoPlayTimer = setInterval(() => {
      if (!this.isPaused && !this.selectedEvent() && this.totalCards() > this.visibleCards()) {
        this.next();
      }
    }, 6000);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  onMouseEnter() {
    this.isPaused = true;
  }

  onMouseLeave() {
    this.isPaused = false;
  }

  next() {
    const nextIdx = this.currentIndex() >= this.maxIndex() ? 0 : this.currentIndex() + 1;
    this.scrollToIndex(nextIdx);
  }

  prev() {
    const prevIdx = this.currentIndex() <= 0 ? this.maxIndex() : this.currentIndex() - 1;
    this.scrollToIndex(prevIdx);
  }

  scrollToIndex(index: number) {
    this.currentIndex.set(index);
    if (!this.carouselContainer?.nativeElement) return;
    const container = this.carouselContainer.nativeElement;
    const card = container.querySelector(`[data-index="${index}"]`) as HTMLElement;
    if (card) {
      const offset = card.offsetLeft - container.offsetLeft;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }

  onTouchStart(e: TouchEvent) {
    this.isPaused = true;
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchMove(e: TouchEvent) {
    this.touchEndX = e.touches[0].clientX;
  }

  onTouchEnd() {
    this.isPaused = false;
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
