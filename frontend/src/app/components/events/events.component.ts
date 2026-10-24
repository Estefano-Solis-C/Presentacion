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
import { EventModel } from '../../models/portal.models';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="eventos" class="py-20 bg-[#F4F6FB] border-b border-[#0F296B]/15 select-none">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <!-- Header de Sección -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-white text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider rounded-full border border-[#0F296B]/15 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>Boletín y publicaciones oficiales</span>
            </div>
            <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F296B] tracking-tight">
              Comunicados, Eventos y Noticias
            </h2>
            <p class="font-sans text-sm text-slate-600 leading-relaxed font-normal">
              Información oficial, archivo histórico anual y circulares emitidas por la Dirección y Secretaría de la I.E.P. Dora Mayer de Zulen, sincronizadas con nuestros canales oficiales.
            </p>
          </div>

          <!-- Controles de Vista: Cuadrícula vs Lista -->
          <div class="flex items-center gap-2 bg-white p-1 rounded-md border border-slate-200 shadow-2xs self-start md:self-auto">
            <button
              type="button"
              (click)="setViewMode('grid')"
              [class]="viewMode() === 'grid' ? 'bg-[#0F296B] text-white shadow-xs' : 'text-slate-600 hover:text-[#0F296B] hover:bg-slate-50'"
              class="px-3 py-1.5 rounded text-xs font-bold font-sans uppercase flex items-center gap-1.5 transition-all cursor-pointer"
              title="Vista en tarjetas y carrusel"
            >
              <app-icon name="sparkles" [size]="14"></app-icon>
              <span>Carrusel</span>
            </button>
            <button
              type="button"
              (click)="setViewMode('list')"
              [class]="viewMode() === 'list' ? 'bg-[#0F296B] text-white shadow-xs' : 'text-slate-600 hover:text-[#0F296B] hover:bg-slate-50'"
              class="px-3 py-1.5 rounded text-xs font-bold font-sans uppercase flex items-center gap-1.5 transition-all cursor-pointer"
              title="Vista en formato de lista cronológica"
            >
              <app-icon name="clipboard-list" [size]="14"></app-icon>
              <span>Lista Anual</span>
            </button>
          </div>
        </div>

        <!-- Barra de Filtros: Categorías y Años Históricos -->
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white/70 backdrop-blur-xs p-4 rounded-lg border border-slate-200">
          <!-- Filtro de Tipo / Categoría -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Tipo:</span>
            <button
              type="button"
              (click)="setFilter('TODOS')"
              [class]="selectedFilter() === 'TODOS' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3 py-1 text-xs uppercase font-bold rounded transition-all cursor-pointer"
            >
              Todos
            </button>
            <button
              type="button"
              (click)="setFilter('COMUNICADO')"
              [class]="selectedFilter() === 'COMUNICADO' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3 py-1 text-xs uppercase font-bold rounded transition-all cursor-pointer"
            >
              Comunicados
            </button>
            <button
              type="button"
              (click)="setFilter('EVENTO')"
              [class]="selectedFilter() === 'EVENTO' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3 py-1 text-xs uppercase font-bold rounded transition-all cursor-pointer"
            >
              Eventos
            </button>
          </div>

          <!-- Filtro por Años (Histórico) -->
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">Año:</span>
            <button
              type="button"
              (click)="setYear(null)"
              [class]="selectedYear() === null ? 'bg-[#0F296B] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3 py-1 text-xs font-bold rounded transition-all cursor-pointer"
            >
              Todos
            </button>
            @for (y of availableYears(); track y) {
              <button
                type="button"
                (click)="setYear(y)"
                [class]="selectedYear() === y ? 'bg-[#0F296B] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
                class="px-3 py-1 text-xs font-bold rounded transition-all cursor-pointer"
              >
                {{ y }}
              </button>
            }
          </div>
        </div>

        <!-- Contenedor con Transición Suave entre Vistas y Filtros -->
        <div
          class="transition-all duration-300 ease-in-out"
          [class.opacity-60]="isTransitioning()"
          [class.scale-[0.995]]="isTransitioning()"
        >

          <!-- ======================= VISTA CARRUSEL / CARDS ======================= -->
          @if (viewMode() === 'grid') {
            <div
              class="relative px-2 sm:px-8 animate-fade-in"
              (mouseenter)="onMouseEnter()"
              (mouseleave)="onMouseLeave()"
              (focusin)="onMouseEnter()"
              (focusout)="onMouseLeave()"
            >
              
              <!-- Botón Anterior Flotante Ergonómico '<' -->
              @if (totalPages() > 1) {
                <button
                  type="button"
                  (click)="prev()"
                  aria-label="Página anterior de comunicados"
                  class="absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#0F296B] text-[#0F296B] hover:text-white border border-[#0F296B]/25 shadow-md hover:shadow-lg flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#254EB6]"
                >
                  <span class="font-mono text-xl sm:text-2xl leading-none select-none">&lt;</span>
                </button>
              }

              <!-- Contenedor Deslizable de Páginas Completas (Zero Cortes, 100% Centrado) -->
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
                  @for (page of pagedEvents(); track $index; let pIdx = $index) {
                    <div class="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
                      @for (evento of page; track evento.id; let i = $index) {
                        <!-- TARJETA 100% CLICKEABLE -->
                        <div
                          (click)="openModal(evento)"
                          (keydown.enter)="openModal(evento)"
                          tabindex="0"
                          role="button"
                          [attr.aria-label]="'Abrir comunicado: ' + evento.titulo"
                          class="bg-white rounded-md border border-[#0F296B]/15 shadow-card-soft hover:shadow-card-elevated hover:border-[#254EB6]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#254EB6]"
                        >
                          <!-- Banner Fotográfico con Rotación Suave Multi-Imagen (Slide Horizontal + Crossfade) -->
                          <div class="relative h-48 sm:h-52 overflow-hidden border-b border-[#0F296B]/10 bg-slate-900">
                            @for (img of getEventImages(evento); track img; let imgIdx = $index) {
                              <img
                                [src]="img"
                                [alt]="evento.titulo + ' foto ' + (imgIdx + 1)"
                                (error)="onImgError($event)"
                                class="absolute inset-0 w-full h-full object-cover pointer-events-none group-hover:scale-105"
                                [class]="getCardImageClass(evento, imgIdx)"
                                loading="lazy"
                              />
                            }
                            <div class="absolute top-2 left-2 z-20 bg-[#0F296B] text-white font-sans text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-xs border border-white/20">
                              {{ formatFecha(evento.fecha) }}
                            </div>
                            @if (evento.destacado) {
                              <div class="absolute top-2 right-2 z-20 bg-[#FBB600] text-slate-950 font-sans text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs shadow-xs flex items-center space-x-1">
                                <app-icon name="sparkles" size="12"></app-icon>
                                <span>Destacado</span>
                              </div>
                            }
                            <!-- Indicador de Galería si tiene más de 1 imagen -->
                            @if (getEventImages(evento).length > 1) {
                              <div class="absolute bottom-2 right-2 z-20 flex items-center gap-1 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs">
                                <app-icon name="sparkles" [size]="10"></app-icon>
                                <span>{{ getEventImages(evento).length }} fotos</span>
                              </div>
                            }
                          </div>

                          <!-- Cuerpo de Noticia -->
                          <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div class="space-y-2.5">
                              <div class="flex items-center justify-between gap-2">
                                <span
                                  [class]="getBadgeClass(evento.tipo)"
                                  class="inline-block px-2.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-xs"
                                >
                                  {{ evento.tipo }}
                                </span>
                                @if (evento.facebookPermalink) {
                                  <a
                                    [href]="evento.facebookPermalink"
                                    (click)="$event.stopPropagation()"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1 text-[10px] text-[#254EB6] font-semibold bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded border border-blue-100 transition-colors"
                                    title="Ver en Facebook"
                                  >
                                    <app-icon name="facebook" [size]="12"></app-icon>
                                    <span>FB Oficial</span>
                                  </a>
                                }
                              </div>

                              <h3 class="font-serif text-base sm:text-lg font-bold text-[#0F296B] group-hover:text-[#254EB6] leading-snug line-clamp-2 transition-colors">
                                {{ evento.titulo }}
                              </h3>

                              <p class="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3 font-normal">
                                {{ evento.resumen }}
                              </p>
                            </div>

                            <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <span class="font-sans text-[10px] text-slate-500 uppercase font-semibold tracking-wider">
                                Año {{ evento.anio || getYearFromDate(evento.fecha) }}
                              </span>
                              <span
                                class="font-sans text-xs font-bold text-[#254EB6] group-hover:text-[#0F296B] flex items-center space-x-1 transition uppercase"
                              >
                                <span>Leer más</span>
                                <app-icon name="arrow-right" size="13" className="group-hover:translate-x-0.5 transition-transform"></app-icon>
                              </span>
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
                  aria-label="Página siguiente de comunicados"
                  class="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#0F296B] text-[#0F296B] hover:text-white border border-[#0F296B]/25 shadow-md hover:shadow-lg flex items-center justify-center font-bold text-lg cursor-pointer transition-all duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#254EB6]"
                >
                  <span class="font-mono text-xl sm:text-2xl leading-none select-none">&gt;</span>
                </button>
              }

            </div>

            <!-- Indicadores de Navegación Dinámicos (1 dot por página) -->
            @if (totalPages() > 1) {
              <div class="flex items-center justify-center space-x-2 pt-4">
                @for (p of pagedEvents(); track $index; let pIdx = $index) {
                  <button
                    type="button"
                    (click)="goToPage(pIdx)"
                    [class]="currentPage() === pIdx ? 'w-8 bg-[#254EB6]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'"
                    class="h-2 rounded-full transition-all duration-300 cursor-pointer"
                    [attr.aria-label]="'Ir a página ' + (pIdx + 1)"
                  ></button>
                }
              </div>
            }
          }

          <!-- ======================= VISTA LISTA ANUAL HISTÓRICA ======================= -->
          @if (viewMode() === 'list') {
            <div class="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden animate-fade-in">
              @for (evento of filteredEvents(); track evento.id) {
                <!-- FILA DE LISTA 100% CLICKEABLE -->
                <div
                  (click)="openModal(evento)"
                  (keydown.enter)="openModal(evento)"
                  tabindex="0"
                  role="button"
                  [attr.aria-label]="'Abrir comunicado: ' + evento.titulo"
                  class="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 hover:bg-[#F4F6FB]/80 transition-colors cursor-pointer group focus:outline-none focus:bg-[#F4F6FB]"
                >
                  
                  <!-- Bloque de Fecha y Año Destacado -->
                  <div class="flex items-center gap-4 shrink-0">
                    <div class="w-16 h-16 rounded-lg bg-[#0F296B] group-hover:bg-[#254EB6] text-white flex flex-col items-center justify-center text-center shadow-xs transition-colors">
                      <span class="text-xs uppercase tracking-wider font-semibold opacity-80">{{ getMonthFromDate(evento.fecha) }}</span>
                      <span class="font-serif text-xl font-bold leading-none">{{ getDayFromDate(evento.fecha) }}</span>
                      <span class="text-[10px] font-bold text-[#FBB600] mt-0.5">{{ evento.anio || getYearFromDate(evento.fecha) }}</span>
                    </div>

                    @if (getCardActiveImage(evento)) {
                      <img
                        [src]="getCardActiveImage(evento)"
                        [alt]="evento.titulo"
                        (error)="onImgError($event)"
                        class="w-16 h-16 rounded-md object-cover border border-slate-200 hidden md:block group-hover:scale-105 transition-transform"
                      />
                    }
                  </div>

                  <!-- Detalle y Título -->
                  <div class="flex-1 space-y-1.5 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span
                        [class]="getBadgeClass(evento.tipo)"
                        class="inline-block px-2 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-xs"
                      >
                        {{ evento.tipo }}
                      </span>
                      @if (evento.destacado) {
                        <span class="inline-flex items-center gap-1 bg-[#FBB600]/30 text-slate-900 border border-[#FBB600]/60 px-2 py-0.5 text-[10px] font-bold rounded-xs">
                          <app-icon name="sparkles" [size]="10"></app-icon>
                          <span>Destacado</span>
                        </span>
                      }
                      @if (evento.facebookPermalink) {
                        <a
                          [href]="evento.facebookPermalink"
                          (click)="$event.stopPropagation()"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1 text-[10px] text-[#254EB6] font-semibold bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded border border-blue-100 transition-colors"
                        >
                          <app-icon name="facebook" [size]="12"></app-icon>
                          <span>Facebook Oficial</span>
                        </a>
                      }
                      @if (getEventImages(evento).length > 1) {
                        <span class="text-[10px] text-slate-500 font-medium">
                          ({{ getEventImages(evento).length }} fotos)
                        </span>
                      }
                    </div>

                    <h3 class="font-serif text-base sm:text-lg font-bold text-[#0F296B] group-hover:text-[#254EB6] truncate transition-colors">
                      {{ evento.titulo }}
                    </h3>

                    <p class="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {{ evento.resumen }}
                    </p>
                  </div>

                  <!-- Botones de Acción -->
                  <div class="flex items-center gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto justify-end">
                    @if (evento.facebookPermalink) {
                      <a
                        [href]="evento.facebookPermalink"
                        (click)="$event.stopPropagation()"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="p-2 text-[#254EB6] hover:bg-blue-50 rounded border border-blue-200 transition-colors"
                        title="Ver en Facebook"
                      >
                        <app-icon name="facebook" [size]="16"></app-icon>
                      </a>
                    }
                    <span
                      class="px-4 py-2 bg-[#254EB6] group-hover:bg-[#0F296B] text-white rounded font-sans font-bold uppercase text-xs transition flex items-center gap-1.5"
                    >
                      <span>Leer completo</span>
                      <app-icon name="arrow-right" [size]="13"></app-icon>
                    </span>
                  </div>

                </div>
              } @empty {
                <div class="p-12 text-center text-slate-500">
                  <p class="font-serif text-lg text-slate-700">No se encontraron publicaciones en la base de datos para este filtro.</p>
                  <button
                    type="button"
                    (click)="resetFilters()"
                    class="mt-3 text-xs font-bold text-[#254EB6] uppercase underline cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                </div>
              }
            </div>
          }

        </div>

      </div>

      <!-- ======================= MODAL DE LECTURA COMPLETA ======================= -->
      @if (selectedEvent(); as modalItem) {
        <div
          class="fixed inset-0 z-50 bg-[#0F296B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-modalFadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-event-title"
          (click)="closeModal()"
        >
          <div
            class="bg-white rounded-lg border-2 border-[#0F296B] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 max-h-[88vh] overflow-y-auto"
            (click)="$event.stopPropagation()"
          >
            <!-- Cabecera del Modal -->
            <div class="flex items-start justify-between border-b border-[#0F296B]/15 pb-4">
              <div class="space-y-1.5 pr-4">
                <div class="flex items-center space-x-2 flex-wrap">
                  <span
                    [class]="getBadgeClass(modalItem.tipo)"
                    class="inline-block px-2.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-xs"
                  >
                    {{ modalItem.tipo }}
                  </span>
                  <span class="text-xs text-slate-600 font-sans font-bold flex items-center gap-1">
                    <app-icon name="calendar" [size]="14" className="text-[#254EB6]"></app-icon>
                    {{ formatFullDate(modalItem.fecha) }}
                  </span>
                  @if (modalItem.facebookPermalink) {
                    <span class="inline-flex items-center gap-1 text-[10px] text-[#254EB6] font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      <app-icon name="facebook" [size]="12"></app-icon>
                      Facebook Oficial
                    </span>
                  }
                </div>
                <h3 id="modal-event-title" class="font-serif text-xl sm:text-2xl font-bold text-[#0F296B] leading-snug">
                  {{ modalItem.titulo }}
                </h3>
              </div>

              <button
                type="button"
                (click)="closeModal()"
                class="p-1 rounded text-slate-400 hover:text-[#0F296B] hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                aria-label="Cerrar comunicado"
              >
                <app-icon name="close" size="22"></app-icon>
              </button>
            </div>

            <!-- Galería Multi-imagen del Modal -->
            @if (getModalImages(modalItem).length > 0) {
              <div class="relative rounded-lg overflow-hidden border border-[#0F296B]/15 bg-slate-900 group">
                <div
                  (click)="openLightbox(modalItem, modalImageIndex())"
                  class="relative h-64 sm:h-80 w-full overflow-hidden flex items-center justify-center cursor-zoom-in"
                  title="Clic para ampliar imagen"
                >
                  @for (img of getModalImages(modalItem); track img; let idx = $index) {
                    <img
                      [src]="img"
                      [alt]="modalItem.titulo + ' foto ' + (idx + 1)"
                      (error)="onImgError($event)"
                      class="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      [class.opacity-100]="modalImageIndex() === idx"
                      [class.opacity-0]="modalImageIndex() !== idx"
                    />
                  }

                  <!-- Badge flotante de indicación de zoom -->
                  <div class="absolute top-2.5 right-2.5 z-10 px-2.5 py-1 bg-black/60 hover:bg-black/80 text-white rounded-full text-[11px] font-sans font-medium backdrop-blur-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <app-icon name="sparkles" [size]="12" className="text-[#FBB600]"></app-icon>
                    <span>Clic para ampliar</span>
                  </div>
                </div>

                @if (getModalImages(modalItem).length > 1) {
                  <!-- Flechas Navegación Imagen -->
                  <button
                    type="button"
                    (click)="prevModalImage(modalItem); $event.stopPropagation()"
                    class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Foto anterior"
                  >
                    <app-icon name="arrow-left" [size]="16"></app-icon>
                  </button>
                  <button
                    type="button"
                    (click)="nextModalImage(modalItem); $event.stopPropagation()"
                    class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Foto siguiente"
                  >
                    <app-icon name="arrow-right" [size]="16"></app-icon>
                  </button>

                  <!-- Miniaturas o dots -->
                  <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    @for (img of getModalImages(modalItem); track img; let idx = $index) {
                      <button
                        type="button"
                        (click)="modalImageIndex.set(idx); $event.stopPropagation()"
                        [class]="modalImageIndex() === idx ? 'w-5 bg-[#FBB600]' : 'w-1.5 bg-white/70 hover:bg-white'"
                        class="h-1.5 rounded-full transition-all cursor-pointer"
                      ></button>
                    }
                  </div>
                }
              </div>
            }

            <!-- Resumen Destacado -->
            <div class="p-4 bg-[#F4F6FB] rounded-lg border-l-4 border-[#254EB6] text-xs sm:text-sm font-sans font-semibold text-[#0F296B]">
              {{ modalItem.resumen }}
            </div>

            <!-- Contenido Completo del Comunicado -->
            <div class="space-y-3 font-sans text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {{ modalItem.contenido }}
            </div>

            <!-- Pie del Modal con Enlace a Facebook y Botón Cerrar -->
            <div class="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-sans">
              @if (modalItem.facebookPermalink) {
                <a
                  [href]="modalItem.facebookPermalink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#254EB6] text-[#254EB6] hover:bg-blue-50 rounded font-bold text-xs transition"
                >
                  <app-icon name="facebook" [size]="14"></app-icon>
                  <span>Ver publicación original en Facebook</span>
                  <app-icon name="external-link" [size]="12"></app-icon>
                </a>
              } @else {
                <span class="font-semibold text-[#0F296B]">I.E.P. Dora Mayer de Zulen · Rímac</span>
              }

              <button
                type="button"
                (click)="closeModal()"
                class="w-full sm:w-auto px-5 py-2.5 bg-[#254EB6] hover:bg-[#0F296B] text-white rounded font-bold uppercase text-xs transition cursor-pointer"
              >
                Cerrar Comunicado
              </button>
            </div>

          </div>
        </div>
      }

      <!-- ======================= LIGHTBOX DE IMAGEN AMPLIADA (ZOOM) ======================= -->
      @if (lightboxData(); as lb) {
        <div
          class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-md animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
          (click)="closeLightbox()"
        >
          <div
            class="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            (click)="$event.stopPropagation()"
          >
            <!-- Cabecera del Lightbox con Cápsula Protectora de Alto Contraste -->
            <div class="w-full flex items-center justify-between pb-3">
              <div class="flex items-center gap-2.5 max-w-[85%] bg-slate-950/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 shadow-2xl">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FBB600] text-slate-950 text-[10px] font-bold uppercase tracking-wider shrink-0 shadow-xs">
                  <app-icon name="sparkles" [size]="10"></app-icon>
                  Foto Oficial
                </span>
                <span class="font-bold text-white text-xs sm:text-sm truncate font-serif">
                  {{ lb.title }}
                </span>
                @if (lb.images.length > 1) {
                  <span class="text-white/70 text-xs shrink-0 font-medium font-sans">· {{ lb.index + 1 }}/{{ lb.images.length }}</span>
                }
              </div>

              <button
                type="button"
                (click)="closeLightbox()"
                class="w-9 h-9 rounded-full bg-slate-950/85 hover:bg-white hover:text-slate-950 text-white transition-all cursor-pointer flex items-center justify-center border border-white/20 shadow-2xl shrink-0 ml-2"
                aria-label="Cerrar ampliación"
              >
                <app-icon name="close" [size]="20"></app-icon>
              </button>
            </div>

            <!-- Imagen Ampliada con Zoom Scale Up -->
            <div class="relative overflow-hidden rounded-xl shadow-2xl flex items-center justify-center max-h-[80vh]">
              <img
                [src]="lb.images[lb.index]"
                [alt]="lb.title"
                (error)="onImgError($event)"
                class="max-h-[80vh] max-w-full w-auto object-contain rounded-xl animate-scale-up"
              />

              <!-- Flechas de navegación en Lightbox -->
              @if (lb.images.length > 1) {
                <button
                  type="button"
                  (click)="prevLightboxImage()"
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
                  aria-label="Foto anterior"
                >
                  <app-icon name="arrow-left" [size]="20"></app-icon>
                </button>
                <button
                  type="button"
                  (click)="nextLightboxImage()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
                  aria-label="Foto siguiente"
                >
                  <app-icon name="arrow-right" [size]="20"></app-icon>
                </button>
              }
            </div>

            <!-- Miniaturas / dots en Lightbox -->
            @if (lb.images.length > 1) {
              <div class="flex items-center gap-2 pt-3">
                @for (img of lb.images; track img; let i = $index) {
                  <button
                    type="button"
                    (click)="setLightboxIndex(i)"
                    [class]="lb.index === i ? 'w-6 bg-[#FBB600]' : 'w-2 bg-white/50 hover:bg-white'"
                    class="h-2 rounded-full transition-all cursor-pointer"
                    [attr.aria-label]="'Ir a foto ' + (i + 1)"
                  ></button>
                }
              </div>
            }
          </div>
        </div>
      }

    </section>
  `,
  styles: [`
    @keyframes viewFadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleUp {
      from { transform: scale(0.92); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .animate-fade-in {
      animation: viewFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-scale-up {
      animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class EventsComponent implements OnInit, OnDestroy {
  private api = inject(PortalApiService);

  events = signal<EventModel[]>([]);
  selectedFilter = signal<string>('TODOS');
  selectedYear = signal<number | null>(null);
  availableYears = signal<number[]>([]);
  viewMode = signal<'grid' | 'list'>('grid');

  selectedEvent = signal<EventModel | null>(null);
  modalImageIndex = signal<number>(0);
  lightboxData = signal<{ title: string; images: string[]; index: number } | null>(null);

  itemsPerPage = signal<number>(3);
  currentPage = signal<number>(0);
  isTransitioning = signal<boolean>(false);

  // Tick para rotación periódica multi-imagen en tarjetas
  cardImageTick = signal<number>(0);

  filteredEvents = computed(() => {
    let list = this.events();
    const filter = this.selectedFilter();
    const year = this.selectedYear();

    if (filter !== 'TODOS') {
      list = list.filter(e => e.tipo === filter);
    }
    if (year !== null) {
      list = list.filter(e => (e.anio || this.getYearFromDate(e.fecha)) === year);
    }
    return list;
  });

  pagedEvents = computed(() => {
    const list = this.filteredEvents();
    const size = this.itemsPerPage();
    const pages: EventModel[][] = [];
    for (let i = 0; i < list.length; i += size) {
      pages.push(list.slice(i, i + size));
    }
    return pages;
  });

  totalPages = computed(() => Math.max(1, this.pagedEvents().length));

  private autoPlayTimer: any = null;
  private imageRotationTimer: any = null;
  private isPaused = false;

  private touchStartX = 0;
  private touchEndX = 0;

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCards();
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.lightboxData()) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.prevLightboxImage();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.nextLightboxImage();
      }
      return;
    }
    if (event.key === 'Escape' && this.selectedEvent()) {
      this.closeModal();
    }
  }

  ngOnInit() {
    this.loadYears();
    this.loadEvents();
    this.updateVisibleCards();
    this.startAutoPlay();
    this.startMultiImageRotation();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    this.stopMultiImageRotation();
  }

  private startMultiImageRotation() {
    this.stopMultiImageRotation();
    this.imageRotationTimer = setInterval(() => {
      if (!this.isPaused && !this.selectedEvent()) {
        this.cardImageTick.update(t => t + 1);
      }
    }, 3800);
  }

  private stopMultiImageRotation() {
    if (this.imageRotationTimer) {
      clearInterval(this.imageRotationTimer);
      this.imageRotationTimer = null;
    }
  }

  private loadYears() {
    this.api.getEventYears().subscribe({
      next: (years) => {
        if (years && years.length > 0) {
          this.availableYears.set(years);
        }
      },
      error: () => {}
    });
  }

  loadEvents() {
    this.api.getEvents(this.selectedFilter(), this.selectedYear() ?? undefined, true).subscribe({
      next: data => {
        this.events.set(data || []);
        this.updateVisibleCards();
      },
      error: () => {
        this.events.set([]);
      }
    });
  }

  setFilter(filter: string) {
    this.triggerTransition();
    this.selectedFilter.set(filter);
    this.currentPage.set(0);
    this.loadEvents();
  }

  setYear(year: number | null) {
    this.triggerTransition();
    this.selectedYear.set(year);
    this.currentPage.set(0);
    this.loadEvents();
  }

  setViewMode(mode: 'grid' | 'list') {
    this.triggerTransition();
    this.viewMode.set(mode);
    if (mode === 'grid') {
      this.currentPage.set(0);
    }
  }

  private triggerTransition() {
    this.isTransitioning.set(true);
    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 180);
  }

  resetFilters() {
    this.triggerTransition();
    this.selectedFilter.set('TODOS');
    this.selectedYear.set(null);
    this.currentPage.set(0);
    this.loadEvents();
  }

  openModal(item: EventModel) {
    this.modalImageIndex.set(0);
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

  getEventImages(evento: EventModel): string[] {
    if (evento.imagenes && evento.imagenes.length > 0) {
      return evento.imagenes;
    }
    return evento.imagenUrl ? [evento.imagenUrl] : ['/images/posts/inicio_clases.jpg'];
  }

  getCardImageClass(evento: EventModel, imgIdx: number): string {
    const images = this.getEventImages(evento);
    if (images.length <= 1) {
      return 'opacity-100 translate-x-0 z-10 transition-all duration-700 ease-in-out';
    }
    const active = this.cardImageTick() % images.length;
    if (imgIdx === active) {
      return 'opacity-100 translate-x-0 z-10 transition-all duration-700 ease-in-out';
    }
    const prev = (active - 1 + images.length) % images.length;
    if (imgIdx === prev) {
      return 'opacity-0 -translate-x-full z-0 transition-all duration-700 ease-in-out';
    }
    return 'opacity-0 translate-x-full z-0 transition-all duration-700 ease-in-out';
  }

  getCardActiveImage(evento: EventModel): string {
    const images = this.getEventImages(evento);
    if (images.length === 1) return images[0];
    const idx = this.cardImageTick() % images.length;
    return images[idx] || images[0];
  }

  getModalImages(item: EventModel): string[] {
    return this.getEventImages(item);
  }

  nextModalImage(item: EventModel) {
    const images = this.getModalImages(item);
    if (images.length > 1) {
      const next = (this.modalImageIndex() + 1) % images.length;
      this.modalImageIndex.set(next);
    }
  }

  prevModalImage(item: EventModel) {
    const images = this.getModalImages(item);
    if (images.length > 1) {
      const prev = (this.modalImageIndex() - 1 + images.length) % images.length;
      this.modalImageIndex.set(prev);
    }
  }

  openLightbox(item: EventModel, initialIndex: number = 0) {
    const images = this.getModalImages(item);
    this.lightboxData.set({
      title: item.titulo,
      images: images.length > 0 ? images : [item.imagenUrl || '/images/posts/inicio_clases.jpg'],
      index: Math.min(initialIndex, Math.max(0, images.length - 1))
    });
  }

  closeLightbox() {
    this.lightboxData.set(null);
  }

  prevLightboxImage() {
    const lb = this.lightboxData();
    if (!lb || lb.images.length <= 1) return;
    const newIndex = (lb.index - 1 + lb.images.length) % lb.images.length;
    this.lightboxData.set({ ...lb, index: newIndex });
  }

  nextLightboxImage() {
    const lb = this.lightboxData();
    if (!lb || lb.images.length <= 1) return;
    const newIndex = (lb.index + 1) % lb.images.length;
    this.lightboxData.set({ ...lb, index: newIndex });
  }

  setLightboxIndex(idx: number) {
    const lb = this.lightboxData();
    if (!lb) return;
    this.lightboxData.set({ ...lb, index: idx });
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target && !target.src.includes('banner_001.jpg')) {
      target.src = '/images/banners/banner_001.jpg';
    }
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

  formatFullDate(fechaStr: string): string {
    if (!fechaStr) return '';
    try {
      const parts = fechaStr.split('-');
      if (parts.length === 3) {
        const year = parts[0];
        const monthNum = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        const months = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        const monthName = months[monthNum - 1] || '';
        return `${day} de ${monthName} de ${year}`;
      }
    } catch (e) {}
    return fechaStr;
  }

  getDayFromDate(fechaStr: string): string {
    if (!fechaStr) return '01';
    const parts = fechaStr.split('-');
    return parts.length >= 3 ? parts[2] : '01';
  }

  getMonthFromDate(fechaStr: string): string {
    if (!fechaStr) return 'ENE';
    const parts = fechaStr.split('-');
    if (parts.length >= 2) {
      const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'];
      const mIdx = parseInt(parts[1], 10) - 1;
      return months[mIdx] || 'ENE';
    }
    return 'ENE';
  }

  getYearFromDate(fechaStr: string): number {
    if (!fechaStr) return 2026;
    const parts = fechaStr.split('-');
    return parts.length >= 1 ? parseInt(parts[0], 10) : 2026;
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
      this.itemsPerPage.set(3);
    } else if (width >= 640) {
      this.itemsPerPage.set(2);
    } else {
      this.itemsPerPage.set(1);
    }

    if (this.currentPage() >= this.totalPages()) {
      this.currentPage.set(Math.max(0, this.totalPages() - 1));
    }
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.autoPlayTimer = setInterval(() => {
      if (!this.isPaused && !this.selectedEvent() && this.totalPages() > 1 && this.viewMode() === 'grid') {
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
    if (this.totalPages() <= 1) return;
    const nextIdx = (this.currentPage() + 1) % this.totalPages();
    this.currentPage.set(nextIdx);
  }

  prev() {
    if (this.totalPages() <= 1) return;
    const prevIdx = (this.currentPage() - 1 + this.totalPages()) % this.totalPages();
    this.currentPage.set(prevIdx);
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages()) {
      this.currentPage.set(page);
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
