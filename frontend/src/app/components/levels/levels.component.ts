import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { PortalApiService } from '../../services/portal-api.service';
import { LevelModel } from '../../models/portal.models';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="niveles" class="py-20 bg-white border-b border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Header Institucional Sobrio -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0F296B]/5 text-[#0F296B] font-sans text-xs font-semibold uppercase tracking-wider border border-[#0F296B]/15">
            <span class="w-2 h-2 rounded-full bg-[#FBB600]"></span>
            <span>Propuesta Pedagógica</span>
          </div>
          <h2 class="font-serif text-2xl sm:text-4xl font-bold text-[#0F296B] tracking-tight">
            Niveles Educativos
          </h2>
          <p class="font-sans text-sm sm:text-base text-slate-600 leading-relaxed">
            Una formación articulada desde los primeros pasos hasta el egreso escolar, combinando rigor pedagógico, contención emocional y valores cívicos.
          </p>
        </div>

        <!-- Tres Tarjetas Grandes con Foto Real, Edades y Frase -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          @for (lvl of levels(); track lvl.slug) {
            <div
              (click)="openModal(lvl, $event)"
              (keydown.enter)="openModal(lvl, $event)"
              (keydown.space)="openModal(lvl, $event)"
              tabindex="0"
              class="group bg-white rounded-sm border border-[#0F296B]/15 shadow-card-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#254EB6]"
              [attr.aria-label]="'Ver detalles de ' + lvl.nombre"
            >
              <!-- Foto Real del Nivel -->
              <div class="relative h-60 sm:h-64 bg-slate-100 overflow-hidden">
                <img
                  [src]="lvl.fotoUrl"
                  [alt]="lvl.nombre + ' en I.E.P. Dora Mayer de Zulen'"
                  class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0F296B]/80 via-transparent to-transparent"></div>
                
                <div class="absolute bottom-3 left-3 right-3 text-white">
                  <span class="inline-block px-2.5 py-0.5 rounded-xs bg-[#FBB600] text-slate-950 font-sans font-bold text-[11px] uppercase tracking-wider mb-1">
                    {{ lvl.rangoEdades }}
                  </span>
                  <h3 class="font-serif text-xl font-bold text-white leading-tight">
                    {{ lvl.nombre }}
                  </h3>
                </div>
              </div>

              <!-- Frase Resumen y Botón de Exploración -->
              <div class="p-6 space-y-4 flex-1 flex flex-col justify-between bg-white">
                <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {{ lvl.resumen }}
                </p>

                <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-sans font-bold text-[#254EB6] group-hover:text-[#0F296B] transition-colors">
                  <span>Conocer propuesta y enfoque</span>
                  <app-icon name="arrow-right" size="14" className="transform group-hover:translate-x-1 transition-transform"></app-icon>
                </div>
              </div>

            </div>
          }
        </div>

      </div>

      <!-- MODAL CENTRADO ACCESIBLE (Role Dialog, Focus Trap, Backdrop 55% Blur) -->
      @if (selectedLevel(); as level) {
        <div
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="'modal-title-' + level.slug"
        >
          <!-- Backdrop Oscuro Translúcido con Desenfoque Leve -->
          <div
            class="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity duration-200"
            (click)="closeModal()"
          ></div>

          <!-- Contenedor del Modal Centrado (Animación <= 200ms) -->
          <div
            class="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-[#0F296B]/20 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-modal-in"
            (click)="$event.stopPropagation()"
          >
            <!-- Cabecera del Modal con Foto Nítida y Botón X -->
            <div class="relative h-52 sm:h-64 bg-slate-100 shrink-0 overflow-hidden">
              <img
                [src]="getModalFotoUrl(level)"
                [alt]="level.nombre"
                class="w-full h-full object-cover object-[center_30%]"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0F296B]/90 via-[#0F296B]/40 to-transparent"></div>

              <!-- Botón X Accesible Arriba a la Derecha -->
              <button
                type="button"
                #closeBtn
                (click)="closeModal()"
                class="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white"
                aria-label="Cerrar ventana de detalles"
              >
                <app-icon name="x" size="18"></app-icon>
              </button>

              <div class="absolute bottom-3 left-4 right-4 text-white">
                <span class="inline-block px-2.5 py-0.5 rounded-xs bg-[#FBB600] text-slate-950 font-sans font-bold text-[11px] uppercase tracking-wider mb-1">
                  {{ level.rangoEdades }}
                </span>
                <h3 [id]="'modal-title-' + level.slug" class="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {{ level.nombre }}
                </h3>
              </div>
            </div>

            <!-- Cuerpo del Modal con Scroll Interno -->
            <div class="p-6 overflow-y-auto space-y-6 text-[#1E2A4A] flex-1">
              
              <!-- Qué Aprende el Alumno / Resumen Pedagógico -->
              <div class="space-y-2">
                <h4 class="font-serif font-bold text-sm text-[#0F296B] uppercase tracking-wider">
                  Enfoque Pedagógico
                </h4>
                <p class="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {{ level.descripcion }}
                </p>
              </div>

              <!-- 3-4 Puntos Clave del Enfoque Institucional -->
              <div class="space-y-2.5">
                <h4 class="font-serif font-bold text-sm text-[#0F296B] uppercase tracking-wider">
                  Pilares de Aprendizaje
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  @for (punto of level.puntos; track punto) {
                    <div class="flex items-start space-x-2.5 p-3 rounded-sm bg-[#F4F6FB] border border-[#0F296B]/10">
                      <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0 mt-0.5"></app-icon>
                      <span class="font-sans text-xs sm:text-sm text-slate-800 font-medium leading-snug">
                        {{ punto }}
                      </span>
                    </div>
                  }
                </div>
              </div>

            </div>

            <!-- Pie del Modal con Acción de Matrícula -->
            <div class="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span class="text-xs font-sans text-slate-500 text-center sm:text-left">
                Vacantes limitadas para el año lectivo en curso.
              </span>
              <button
                type="button"
                (click)="solicitarVacante(level.slug)"
                class="w-full sm:w-auto px-5 py-2.5 rounded-sm bg-[#254EB6] hover:bg-[#1D3FA2] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer focus:outline-hidden"
              >
                <span>Solicitar vacante para {{ level.nombre }}</span>
                <app-icon name="arrow-right" size="14" className="text-[#FBB600]"></app-icon>
              </button>
            </div>

          </div>
        </div>
      }
    </section>
  `
})
export class LevelsComponent implements OnInit {
  private api = inject(PortalApiService);

  levels = signal<LevelModel[]>([]);
  selectedLevel = signal<LevelModel | null>(null);
  private lastFocusedElement: HTMLElement | null = null;

  ngOnInit() {
    this.api.getLevels().subscribe(data => this.levels.set(data));
  }

  getModalFotoUrl(level: LevelModel): string {
    if (level.slug === 'inicial' || level.fotoUrl?.includes('foto_inicial.jpg')) {
      return '/images/banners/foto_inicial_1.jpeg';
    }
    return level.fotoUrl;
  }

  openModal(level: LevelModel, event: Event) {
    this.lastFocusedElement = event.currentTarget as HTMLElement;
    this.selectedLevel.set(level);
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.selectedLevel.set(null);
    document.body.style.overflow = '';
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.selectedLevel()) {
      this.closeModal();
    }
  }

  solicitarVacante(slug: string) {
    this.closeModal();
    const nivelEnum = slug.toUpperCase() as 'INICIAL' | 'PRIMARIA' | 'SECUNDARIA';
    
    // Desplazar al formulario y preseleccionar nivel
    const formElement = document.getElementById('formulario-admision');
    if (formElement) {
      const selectNivel = formElement.querySelector('select[formControlName="nivel"]') as HTMLSelectElement;
      if (selectNivel) {
        selectNivel.value = nivelEnum;
        selectNivel.dispatchEvent(new Event('change'));
      }
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}
