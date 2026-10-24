import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="propuesta" class="py-16 bg-[#F4F6FB] border-b border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <!-- Franja Ejecutiva de Indicadores Clave (Estilo Institucional Sólido) -->
        <div class="bg-white rounded-md border border-[#0F296B]/15 shadow-elevated overflow-hidden relative">
          <!-- Línea de acento institucional superior -->
          <div class="h-1.5 bg-gradient-to-r from-[#0F296B] via-[#254EB6] to-[#FBB600]"></div>

          <div class="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <!-- Indicador 1: Años de Tradición -->
            <div class="flex items-center space-x-5 p-3.5 rounded-md hover:bg-[#F4F6FB] border border-transparent hover:border-[#0F296B]/10 transition-all duration-300 group">
              <div class="w-20 min-w-[5rem] h-18 sm:h-20 bg-[#0F296B] border border-white/20 rounded-md shadow-md flex flex-col items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-lg transition-transform duration-300">
                <span class="font-serif font-black text-2xl sm:text-3xl text-[#FBB600] leading-none">{{ yearsActive() }}</span>
                <span class="text-[10px] font-sans font-bold text-white tracking-widest uppercase mt-1">Años</span>
              </div>
              <div class="min-w-0 flex-1">
                <div class="font-serif font-bold text-base sm:text-lg text-[#0F296B] group-hover:text-[#254EB6] transition-colors">
                  Años de Tradición
                </div>
                <div class="font-sans text-xs text-slate-500 mt-1 leading-snug">
                  Fundado en el Rímac en 1957
                </div>
              </div>
            </div>

            <!-- Indicador 2: Niveles Integrados -->
            <div class="flex items-center space-x-5 p-3.5 rounded-md hover:bg-[#F4F6FB] border border-transparent hover:border-[#0F296B]/10 transition-all duration-300 group">
              <div class="w-20 min-w-[5rem] h-18 sm:h-20 bg-[#0F296B] border border-white/20 rounded-md shadow-md flex flex-col items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-lg transition-transform duration-300">
                <span class="font-serif font-black text-2xl sm:text-3xl text-[#FBB600] leading-none">3</span>
                <span class="text-[10px] font-sans font-bold text-white tracking-widest uppercase mt-1">Niveles</span>
              </div>
              <div class="min-w-0 flex-1">
                <div class="font-serif font-bold text-base sm:text-lg text-[#0F296B] group-hover:text-[#254EB6] transition-colors">
                  Niveles Integrados
                </div>
                <div class="font-sans text-xs text-slate-500 mt-1 leading-snug">
                  Inicial, Primaria y Secundaria
                </div>
              </div>
            </div>

            <!-- Indicador 3: Tareas en Aula (100% holgado sin desbordes) -->
            <div class="flex items-center space-x-5 p-3.5 rounded-md hover:bg-[#F4F6FB] border border-transparent hover:border-[#0F296B]/10 transition-all duration-300 group">
              <div class="w-20 min-w-[5rem] h-18 sm:h-20 bg-[#0F296B] border border-white/20 rounded-md shadow-md flex flex-col items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-lg transition-transform duration-300">
                <span class="font-serif font-black text-xl sm:text-2xl text-[#FBB600] leading-none tracking-tight">100%</span>
                <span class="text-[10px] font-sans font-bold text-white tracking-widest uppercase mt-1">En Aula</span>
              </div>
              <div class="min-w-0 flex-1">
                <div class="font-serif font-bold text-base sm:text-lg text-[#0F296B] group-hover:text-[#254EB6] transition-colors">
                  Tareas en Aula
                </div>
                <div class="font-sans text-xs text-slate-500 mt-1 leading-snug">
                  Desarrolladas con el profesor
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Encabezado de Sección: Estudio, Trabajo y Amistad -->
        <div class="text-center max-w-3xl mx-auto space-y-3">
          <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-[#0F296B] font-sans text-xs font-semibold uppercase tracking-wider border border-[#0F296B]/15 shadow-2xs">
            <span class="w-2 h-2 rounded-full bg-[#FBB600]"></span>
            <span>Identidad Mayerina</span>
          </div>
          <h2 class="font-serif text-2xl sm:text-4xl font-bold text-[#0F296B] tracking-tight">
            Estudio, Trabajo y Amistad
          </h2>
          <p class="font-sans text-sm sm:text-base text-slate-600 leading-relaxed">
            Nuestro lema fundacional guía una formación equilibrada donde cada estudiante aprende a esforzarse, colaborar y construir su futuro en un ambiente cercano y exigente.
          </p>
        </div>

        <!-- Los Tres Bloques Fusionados con Fotografías Reales (Sin Clipart) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          <!-- Bloque 1: Estudio -->
          <div class="bg-white rounded-sm border border-[#0F296B]/15 shadow-card-soft overflow-hidden flex flex-col justify-between">
            <div class="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
              <img
                src="/images/tareas_clase.jpg"
                alt="Alumnos realizando tareas dirigidas en aula con supervisión docente"
                class="w-full h-full object-cover object-[center_35%] hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute bottom-2 left-2 bg-[#0F296B] text-white text-[11px] font-sans font-bold uppercase px-2.5 py-0.5 rounded-xs border border-white/20">
                Pilar 01 · Estudio
              </div>
            </div>
            <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="font-serif text-lg font-bold text-[#0F296B]">
                  Tareas dirigidas en aula
                </h3>
                <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "Las tareas se hacen en el colegio. Las tardes son para la familia." Nuestros alumnos resuelven sus dudas con el maestro en clase, consolidando el hábito de estudio sin tensiones en el hogar.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs font-sans text-[#254EB6] font-semibold">
                <app-icon name="check-circle" size="15" className="text-[#254EB6] shrink-0"></app-icon>
                <span>Acompañamiento docente directo</span>
              </div>
            </div>
          </div>

          <!-- Bloque 2: Trabajo -->
          <div class="bg-white rounded-sm border border-[#0F296B]/15 shadow-card-soft overflow-hidden flex flex-col justify-between">
            <div class="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
              <img
                src="/images/banners/foto_secundaria_3.jpeg"
                alt="Laboratorios de ciencias y cómputo práctico"
                class="w-full h-full object-cover object-[center_15%] hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute bottom-2 left-2 bg-[#0F296B] text-white text-[11px] font-sans font-bold uppercase px-2.5 py-0.5 rounded-xs border border-white/20">
                Pilar 02 · Trabajo
              </div>
            </div>
            <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="font-serif text-lg font-bold text-[#0F296B]">
                  Laboratorios y método activo
                </h3>
                <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ciencia, tecnología y expresión oral aplicadas. Fomentamos la disciplina personal mediante el trabajo práctico en centros de cómputo, ciencias y proyectos de investigación escolar.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs font-sans text-[#254EB6] font-semibold">
                <app-icon name="check-circle" size="15" className="text-[#254EB6] shrink-0"></app-icon>
                <span>Cómputo, ciencias y oratoria</span>
              </div>
            </div>
          </div>

          <!-- Bloque 3: Amistad -->
          <div class="bg-white rounded-sm border border-[#0F296B]/15 shadow-card-soft overflow-hidden flex flex-col justify-between">
            <div class="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
              <img
                src="/images/atencion_psicologica.jpeg"
                alt="Orientación psicopedagógica y convivencia escolar cercana"
                class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute bottom-2 left-2 bg-[#0F296B] text-white text-[11px] font-sans font-bold uppercase px-2.5 py-0.5 rounded-xs border border-white/20">
                Pilar 03 · Amistad
              </div>
            </div>
            <div class="p-6 space-y-3 flex-1 flex flex-col justify-between">
              <div class="space-y-2">
                <h3 class="font-serif text-lg font-bold text-[#0F296B]">
                  Psicopedagogía y convivencia
                </h3>
                <p class="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Cuidamos la dimensión emocional y social de cada niño y joven. Ofrecemos seguimiento psicopedagógico continuo, escuela para padres y normas de convivencia basadas en el respeto mutuo.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center space-x-2 text-xs font-sans text-[#254EB6] font-semibold">
                <app-icon name="check-circle" size="15" className="text-[#254EB6] shrink-0"></app-icon>
                <span>Atención psicológica continua</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class CountersComponent {
  yearsActive = computed(() => new Date().getFullYear() - 1957);
}
