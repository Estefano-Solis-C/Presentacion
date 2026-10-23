import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { PortalApiService } from '../../services/portal-api.service';
import { EventoResponse } from '../../models/portal.models';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="eventos" class="py-20 bg-white border-b border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Header de Sección -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-[#254EB6]/10 text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider rounded-full border border-[#254EB6]/20">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>BOLETÍN Y COMUNICADOS OFICIALES</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F296B] tracking-tight">
              Comunicados, Eventos y Noticias
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed font-normal">
              Mantente informado con los avisos, cronogramas y circulares oficiales emitidas por la Dirección y Secretaría de I.E.P. Dora Mayer de Zulen.
            </p>
          </div>

          <!-- Filtros de Categoría -->
          <div class="flex flex-wrap gap-2 text-xs font-sans font-bold">
            <button
              type="button"
              (click)="setFilter('TODOS')"
              [class]="selectedFilter() === 'TODOS' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3.5 py-1.5 uppercase transition-all rounded-sm cursor-pointer"
            >
              TODOS
            </button>
            <button
              type="button"
              (click)="setFilter('COMUNICADO')"
              [class]="selectedFilter() === 'COMUNICADO' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3.5 py-1.5 uppercase transition-all rounded-sm cursor-pointer"
            >
              COMUNICADOS
            </button>
            <button
              type="button"
              (click)="setFilter('EVENTO')"
              [class]="selectedFilter() === 'EVENTO' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'"
              class="px-3.5 py-1.5 uppercase transition-all rounded-sm cursor-pointer"
            >
              EVENTOS
            </button>
          </div>
        </div>

        <!-- Cuadrícula de Comunicados Tipo Tablón de Anuncios con Fotografías Reales -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          @for (evento of filteredEventos(); track evento.id) {
            <div class="group bg-white rounded-sm border border-[#0F296B]/15 shadow-mayer-soft hover:shadow-mayer-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              
              <!-- Banner Fotográfico Superior -->
              <div class="relative h-48 sm:h-52 overflow-hidden border-b border-[#0F296B]/10 bg-slate-100">
                <img
                  [src]="getEventoImage(evento)"
                  [alt]="evento.titulo"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="absolute top-2 left-2 bg-[#0F296B] text-white font-sans text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs border border-white/20">
                  {{ getEventoFecha(evento) }}
                </div>
                @if (evento.isPinned) {
                  <div class="absolute top-2 right-2 bg-[#FBB600] text-slate-950 font-sans text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs shadow-xs flex items-center space-x-1">
                    <app-icon name="sparkles" size="12"></app-icon>
                    <span>DESTACADO</span>
                  </div>
                }
              </div>

              <!-- Cuerpo de Noticia -->
              <div class="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2.5">
                  <span
                    [class]="getBadgeClass(evento.categoria)"
                    class="inline-block px-2.5 py-0.5 text-[10px] font-sans font-bold uppercase tracking-wider rounded-xs border border-transparent"
                  >
                    {{ evento.categoria }}
                  </span>

                  <h3 class="text-base sm:text-lg font-bold text-[#0F296B] leading-snug">
                    {{ evento.titulo }}
                  </h3>

                  <p class="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3 font-normal">
                    {{ evento.resumen }}
                  </p>
                </div>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="font-sans text-[10px] text-slate-500 uppercase font-semibold tracking-wider">CIRCULAR OFICIAL</span>
                  <a
                    href="#matricula"
                    class="font-sans text-xs font-bold text-[#254EB6] hover:text-[#0F296B] flex items-center space-x-1 transition uppercase cursor-pointer"
                  >
                    <span>LEER MÁS</span>
                    <app-icon name="arrow-right" size="13"></app-icon>
                  </a>
                </div>
              </div>

            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class EventsComponent implements OnInit {
  private api = inject(PortalApiService);

  eventos = signal<EventoResponse[]>([]);
  selectedFilter = signal<string>('TODOS');

  ngOnInit() {
    this.api.getEventos().subscribe(data => this.eventos.set(data));
  }

  setFilter(categoria: string) {
    this.selectedFilter.set(categoria);
  }

  filteredEventos() {
    if (this.selectedFilter() === 'TODOS') return this.eventos();
    return this.eventos().filter(e => e.categoria === this.selectedFilter());
  }

  getBadgeClass(cat: string): string {
    switch (cat) {
      case 'COMUNICADO':
        return 'bg-blue-50 text-[#0F296B] border-blue-200';
      case 'VACACIONES':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'EVENTO':
        return 'bg-sky-50 text-sky-900 border-sky-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  }

  getEventoImage(evento: EventoResponse): string {
    if (evento.imagenUrl) return evento.imagenUrl;
    if (evento.slug.includes('madre')) return '/images/posts/dia_madre.jpg';
    if (evento.slug.includes('patrias')) return '/images/posts/fiestas_patrias.jpg';
    return '/images/posts/inicio_clases.jpg';
  }

  getEventoFecha(evento: EventoResponse): string {
    if (evento.fechaEvento) {
      if (evento.fechaEvento.includes('03-01')) return '01 MAR 2026';
      if (evento.fechaEvento.includes('05-10')) return '10 MAY 2026';
      if (evento.fechaEvento.includes('07-28')) return '28 JUL 2026';
      return evento.fechaEvento;
    }
    return '2026';
  }
}
