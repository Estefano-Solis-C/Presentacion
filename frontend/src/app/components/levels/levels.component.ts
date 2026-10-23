import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="niveles" class="py-20 bg-white border-b border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Header Institucional -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-[#254EB6]/10 text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider rounded-full border border-[#254EB6]/20">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>NIVELES EDUCATIVOS INTEGRADOS</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F296B] tracking-tight">
              Niveles Educativos Integrados
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              La Institución Educativa Privada “Dora Mayer de Zulen” brinda a sus estudiantes una formación integral y humanística, promoviendo el desarrollo de sus competencias, capacidades y valores éticos, fortaleciendo las relaciones de cooperación y corresponsabilidad entre la escuela y la familia, que enriquece el proceso educativo en sus tres niveles.
            </p>
          </div>
          
          <!-- Selector de Nivel Interactivo (Estilo Refinado) -->
          <div class="grid grid-cols-3 w-full sm:w-auto sm:inline-flex p-1 bg-slate-100 rounded-sm border border-[#0F296B]/15 shadow-xs">
            <button
              type="button"
              (click)="selectedLevel.set('INICIAL')"
              [class]="selectedLevel() === 'INICIAL' ? 'bg-[#254EB6] text-white shadow-xs' : 'text-slate-700 hover:text-[#0F296B] hover:bg-white/80'"
              class="px-3 sm:px-5 py-2.5 rounded-xs font-sans text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>INICIAL</span>
              <span class="hidden sm:inline text-[10px] opacity-80">(3-5 Años)</span>
            </button>

            <button
              type="button"
              (click)="selectedLevel.set('PRIMARIA')"
              [class]="selectedLevel() === 'PRIMARIA' ? 'bg-[#254EB6] text-white shadow-xs' : 'text-slate-700 hover:text-[#0F296B] hover:bg-white/80'"
              class="px-3 sm:px-5 py-2.5 rounded-xs font-sans text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>PRIMARIA</span>
              <span class="hidden sm:inline text-[10px] opacity-80">(1°-6°)</span>
            </button>

            <button
              type="button"
              (click)="selectedLevel.set('SECUNDARIA')"
              [class]="selectedLevel() === 'SECUNDARIA' ? 'bg-[#254EB6] text-white shadow-xs' : 'text-slate-700 hover:text-[#0F296B] hover:bg-white/80'"
              class="px-3 sm:px-5 py-2.5 rounded-xs font-sans text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>SECUNDARIA</span>
              <span class="hidden sm:inline text-[10px] opacity-80">(1°-5°)</span>
            </button>
          </div>
        </div>

        <!-- Ficha Editorial Detallada del Nivel Seleccionado (Zero CLS: Altura Fija lg:h-[460px]) -->
        <div class="bg-white rounded-sm border border-[#0F296B]/15 p-5 sm:p-10 shadow-mayer-soft lg:h-[460px] flex flex-col justify-center overflow-hidden">
          
          @if (selectedLevel() === 'INICIAL') {
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-7 space-y-4">
                <div class="inline-flex items-center space-x-2 bg-[#254EB6]/10 text-[#254EB6] font-sans text-xs uppercase px-3 py-1 font-bold border border-[#254EB6]/25 rounded-sm">
                  <span>CICLOS I & II · 3, 4 Y 5 AÑOS DE EDAD</span>
                </div>
                <h3 class="text-2xl sm:text-3xl font-extrabold text-[#0F296B] leading-snug min-h-[64px] flex items-center">
                  Aprestamiento, desarrollo de la creatividad y valores
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed font-normal min-h-[72px] flex items-center">
                  Estimulamos la autonomía, la socialización y el desarrollo integral a través del juego dirigido, la psicomotricidad, el laboratorio de cómputo e inmersión temprana en inglés.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-700">
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Aprestamiento y Lecto Escritura</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Desarrollo de Creatividad</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Laboratorio de Cómputo e Inglés</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Psicomotricidad y Valores</span>
                  </div>
                </div>
              </div>

              <!-- Dossier Fotográfico con Foto Real -->
              <div class="lg:col-span-5 space-y-4">
                <div class="relative overflow-hidden rounded-sm border border-[#0F296B]/15 shadow-mayer-card bg-slate-100">
                  <img
                    src="/images/foto_inicial.jpg"
                    alt="Estudiantes de Nivel Inicial en clase Dora Mayer"
                    class="w-full h-56 sm:h-60 object-cover object-top"
                    loading="lazy"
                  />
                  <div class="absolute bottom-2 left-2 bg-[#0F296B] text-white font-sans text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-xs border border-white/20">
                    INICIAL · 3 A 5 AÑOS
                  </div>
                </div>
                
                <div class="bg-slate-50 p-3.5 rounded-sm border border-[#0F296B]/10 space-y-2">
                  <div class="font-sans text-xs font-bold text-[#0F296B] uppercase tracking-wider">TALLERES FORMATIVOS:</div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-bold text-slate-700">
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="sparkles" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Psicomotricidad</span>
                    </span>
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="palette" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Creatividad</span>
                    </span>
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="heart" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Psicología</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          }

          @if (selectedLevel() === 'PRIMARIA') {
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-7 space-y-4">
                <div class="inline-flex items-center space-x-2 bg-[#254EB6]/10 text-[#254EB6] font-sans text-xs uppercase px-3 py-1 font-bold border border-[#254EB6]/25 rounded-sm">
                  <span>CICLOS III, IV & V · 1° A 6° DE PRIMARIA</span>
                </div>
                <h3 class="text-2xl sm:text-3xl font-extrabold text-[#0F296B] leading-snug min-h-[64px] flex items-center">
                  Hábitos de estudio sólidos y tareas dirigidas en aula
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed font-normal min-h-[72px] flex items-center">
                  Consolidamos las competencias matemáticas y de comunicación integral. Los estudiantes aplican lo aprendido en clase y resuelven sus dudas con el docente, aliviando a la familia de tareas nocturnas.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-700">
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Tareas supervisadas en aula</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Laboratorio de Cómputo e Inglés</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Atención psicológica continua</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Talleres formativos y danzas</span>
                  </div>
                </div>
              </div>

              <!-- Dossier Fotográfico con Foto Real -->
              <div class="lg:col-span-5 space-y-4">
                <div class="relative overflow-hidden rounded-sm border border-[#0F296B]/15 shadow-mayer-card bg-slate-100">
                  <img
                    src="/images/foto_primaria.jpeg"
                    alt="Alumnos de Primaria en formación Dora Mayer"
                    class="w-full h-56 sm:h-60 object-cover"
                    loading="lazy"
                  />
                  <div class="absolute bottom-2 left-2 bg-[#0F296B] text-white font-sans text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-xs border border-white/20">
                    PRIMARIA · 1° A 6° GRADO
                  </div>
                </div>
                
                <div class="bg-slate-50 p-3.5 rounded-sm border border-[#0F296B]/10 space-y-2">
                  <div class="font-sans text-xs font-bold text-[#0F296B] uppercase tracking-wider">ÁREAS FORMATIVAS CLAVE:</div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-bold text-slate-700">
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="music" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Danzas Típicas</span>
                    </span>
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="beaker" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Ciencias</span>
                    </span>
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="users" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Escuela Padres</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          }

          @if (selectedLevel() === 'SECUNDARIA') {
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-7 space-y-4">
                <div class="inline-flex items-center space-x-2 bg-[#254EB6]/10 text-[#254EB6] font-sans text-xs uppercase px-3 py-1 font-bold border border-[#254EB6]/25 rounded-sm">
                  <span>CICLOS VI & VII · 1° A 5° DE SECUNDARIA</span>
                </div>
                <h3 class="text-2xl sm:text-3xl font-extrabold text-[#0F296B] leading-snug min-h-[64px] flex items-center">
                  Formación integral, científica y humanística
                </h3>
                <p class="text-sm text-slate-600 leading-relaxed font-normal min-h-[72px] flex items-center">
                  Brindamos una sólida preparación académica, científica y valórica, con laboratorios de cómputo, ciencias y seminarios multimedia para responder con éxito a un mundo globalizado.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-slate-700">
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Aplicación de la Nueva Currícula</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Laboratorio de Biología y Química</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Laboratorio de Cómputo e Inglés</span>
                  </div>
                  <div class="flex items-center space-x-2.5 bg-slate-50 p-3 rounded-sm border border-[#0F296B]/10 shadow-xs">
                    <app-icon name="check-circle" size="16" className="text-[#254EB6] shrink-0"></app-icon>
                    <span class="font-bold">Seminarios Audiovisuales Multimedia</span>
                  </div>
                </div>
              </div>

              <!-- Dossier Fotográfico con Foto Real -->
              <div class="lg:col-span-5 space-y-4">
                <div class="relative overflow-hidden rounded-sm border border-[#0F296B]/15 shadow-mayer-card bg-slate-100">
                  <img
                    src="/images/foto_secundaria.jpeg"
                    alt="Promoción de Secundaria en actividades escolares"
                    class="w-full h-56 sm:h-60 object-cover"
                    loading="lazy"
                  />
                  <div class="absolute bottom-2 left-2 bg-[#0F296B] text-white font-sans text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-xs border border-white/20">
                    SECUNDARIA · 1° A 5° AÑO
                  </div>
                </div>
                
                <div class="bg-slate-50 p-3.5 rounded-sm border border-[#0F296B]/10 space-y-2">
                  <div class="font-sans text-xs font-bold text-[#0F296B] uppercase tracking-wider">COMPETENCIAS CLAVE:</div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-bold text-slate-700">
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="target" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Seminarios</span>
                    </span>
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="laptop" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Cómputo</span>
                    </span>
                    <span class="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 bg-white border border-[#0F296B]/15 rounded-sm shadow-xs truncate text-[11px]">
                      <app-icon name="mic" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                      <span class="truncate">Oratoria</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          }

        </div>

      </div>
    </section>
  `
})
export class LevelsComponent {
  selectedLevel = signal<'INICIAL' | 'PRIMARIA' | 'SECUNDARIA'>('PRIMARIA');
}
