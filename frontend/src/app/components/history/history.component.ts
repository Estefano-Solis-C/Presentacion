import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="historia" class="py-20 bg-[#F4F6FB] border-b border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- Bloque Editorial de Historia y Fundadores -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex items-center space-x-2 bg-white text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider border border-[#0F296B]/15 rounded-full shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>Trayectoria y valores mayerinos</span>
            </div>
            
            <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0F296B] tracking-tight">
              Más de {{ yearsActive() }} años forjando el futuro del Rímac
            </h2>
            
            <p class="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal text-justify hyphens-auto">
              La Institución Educativa Privada <strong class="text-[#0F296B] font-semibold">"Dora Mayer de Zulen"</strong> nació en 1957 gracias a la visión educadora y vocación de servicio del recordado educador <strong class="text-[#0F296B] font-semibold">Paulino Lapa</strong> y su distinguida esposa, la <strong class="text-[#0F296B] font-semibold">Sra. Yolanda Salinas</strong>.
            </p>
            
            <p class="font-sans text-sm sm:text-base text-slate-700 leading-relaxed font-normal text-justify hyphens-auto">
              Inició sus actividades en el emblemático local de la <strong class="text-slate-900 font-semibold">Calle Monitor Huáscar</strong>, consolidándose como un referente bajopontino de disciplina, valores cívicos y rigor escolar. Con los años, la institución trasladó su sede central a su local propio en <strong class="text-slate-900 font-semibold">Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac</strong>, donde generaciones de familias han confiado la formación humana y académica de sus hijos.
            </p>

            <!-- Medallón Histórico de Homenaje a los Fundadores (Diseño Editorial + Micro-movimiento) -->
            <div class="relative bg-gradient-to-br from-white via-white to-[#F4F6FB] p-5 sm:p-6 rounded-md border border-[#0F296B]/15 border-l-4 border-l-[#FBB600] shadow-card-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
              
              <!-- Marca de agua editorial comilla decorativa -->
              <span class="absolute top-1 right-4 font-serif text-5xl text-[#0F296B]/5 select-none pointer-events-none transition-transform duration-500 group-hover:scale-110">
                “
              </span>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 relative z-10">
                
                <!-- Medallón Sólido Navy con Brillo Interactivo -->
                <div class="w-20 min-w-[5rem] h-20 bg-[#0F296B] border border-white/20 rounded-md shadow-md flex flex-col items-center justify-center shrink-0 group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#FBB600]/40 transition-all duration-300">
                  <span class="text-3xl font-serif font-black text-[#FBB600] leading-none">{{ yearsActive() }}</span>
                  <span class="text-[10px] font-sans font-bold text-white tracking-widest uppercase mt-1">Años</span>
                </div>

                <!-- Contenido Editorial de Homenaje -->
                <div class="space-y-1.5 flex-1 min-w-0">
                  
                  <div class="flex items-center space-x-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#FBB600] shrink-0"></span>
                    <span class="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-500">
                      Homenaje Vivo a Nuestros Fundadores
                    </span>
                  </div>

                  <h3 class="font-serif text-[#0F296B] font-bold text-sm sm:text-base leading-snug">
                    Paulino Lapa & Sra. Yolanda Salinas
                  </h3>

                  <div class="pt-0.5">
                    <span class="inline-block font-serif italic text-xs font-bold text-[#0F296B] bg-[#FBB600]/15 px-2.5 py-0.5 rounded-xs border border-[#FBB600]/30 shadow-2xs">
                      «Estudio, Trabajo y Amistad»
                    </span>
                  </div>

                  <p class="font-sans text-xs text-slate-600 leading-relaxed pt-0.5">
                    El compromiso moral y pedagógico de nuestros fundadores que continúa forjando el carácter y el futuro de cada promoción mayerina desde 1957.
                  </p>
                </div>

              </div>

              <!-- Línea de acento expansible interactiva inferior -->
              <div class="absolute bottom-0 left-0 h-[2.5px] w-0 group-hover:w-full bg-gradient-to-r from-[#FBB600] via-[#254EB6] to-[#0F296B] transition-all duration-500 ease-out pointer-events-none"></div>
            </div>
          </div>

          <!-- Línea de Tiempo Editorial Sobria -->
          <div class="lg:col-span-6 bg-white p-7 sm:p-8 rounded-sm border border-[#0F296B]/15 shadow-card-soft space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-[#0F296B]/10">
              <h3 class="font-serif text-base font-bold text-[#0F296B] flex items-center space-x-2">
                <app-icon name="calendar" size="18" className="text-[#254EB6]"></app-icon>
                <span>Hitos históricos institucionales</span>
              </h3>
              <span class="font-sans text-[10px] uppercase font-bold text-slate-500 tracking-wider">1957 — Presente</span>
            </div>

            <div class="space-y-6 ml-1">
              
              <div class="relative pl-7 border-l-2 border-[#0F296B]/25">
                <span class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#0F296B] border-2 border-white ring-2 ring-[#0F296B]/20"></span>
                <div class="font-sans text-[11px] font-bold text-[#254EB6] uppercase tracking-wider">1957 · Fundación histórica</div>
                <div class="font-serif text-sm font-bold text-slate-900 mt-0.5">Apertura en Calle Monitor Huáscar</div>
                <div class="font-sans text-xs text-slate-600 leading-relaxed mt-1">
                  Fundado por Paulino Lapa y Sra. Yolanda Salinas con la convicción de ofrecer educación accesible, formativa y exigente para la niñez del Rímac.
                </div>
              </div>

              <div class="relative pl-7 border-l-2 border-[#0F296B]/25">
                <span class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FBB600] border-2 border-white ring-2 ring-[#FBB600]/30"></span>
                <div class="font-sans text-[11px] font-bold text-[#0F296B] uppercase tracking-wider">Sede central Ventura Rossi</div>
                <div class="font-serif text-sm font-bold text-slate-900 mt-0.5">Calle Ricardo Bentín 749</div>
                <div class="font-sans text-xs text-slate-600 leading-relaxed mt-1">
                  Consolidación de infraestructura propia con aulas adaptadas por nivel, laboratorios de cómputo y ciencias, biblioteca y patio deportivo.
                </div>
              </div>

              <div class="relative pl-7 border-l-2 border-[#0F296B]/25">
                <span class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#254EB6] border-2 border-white ring-2 ring-[#254EB6]/30"></span>
                <div class="font-sans text-[11px] font-bold text-[#254EB6] uppercase tracking-wider">Actualidad · Tradición y cercanía</div>
                <div class="font-serif text-sm font-bold text-slate-900 mt-0.5">Formación integral con valores</div>
                <div class="font-sans text-xs text-slate-600 leading-relaxed mt-1">
                  Tareas supervisadas en aula, acompañamiento psicopedagógico continuo y comunicación directa y cercana con cada familia.
                </div>
              </div>

            </div>
          </div>

        </div>

        <!-- Misión, Visión y Valores (Pabellón Institucional Navy) -->
        <div class="bg-[#0F296B] text-white rounded-sm border border-[#0F296B]/20 p-8 sm:p-10 shadow-card-soft">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <div class="space-y-3 p-5 bg-white/5 rounded-sm border border-white/10">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 class="font-serif text-sm font-bold text-[#FBB600] uppercase tracking-wider">01 · Misión</h4>
                <app-icon name="sparkles" size="18" className="text-[#FBB600]"></app-icon>
              </div>
              <p class="font-sans text-xs text-slate-200 leading-relaxed font-normal">
                Brindar una formación integral de calidad en los niveles Inicial, Primaria y Secundaria, fortaleciendo el rigor escolar, la autonomía intelectual y la práctica cotidiana de valores cívicos y éticos.
              </p>
            </div>

            <div class="space-y-3 p-5 bg-white/5 rounded-sm border border-white/10">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 class="font-serif text-sm font-bold text-white uppercase tracking-wider">02 · Visión</h4>
                <app-icon name="academic-cap" size="18" className="text-white"></app-icon>
              </div>
              <p class="font-sans text-xs text-slate-200 leading-relaxed font-normal">
                Ser la comunidad educativa referente del Rímac en formación escolar con valores, reconocida por el acompañamiento cercano a cada alumno y la sólida preparación para sus metas de vida.
              </p>
            </div>

            <div class="space-y-3 p-5 bg-white/5 rounded-sm border border-white/10">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 class="font-serif text-sm font-bold text-[#FBB600] uppercase tracking-wider">03 · Valores</h4>
                <app-icon name="shield-check" size="18" className="text-[#FBB600]"></app-icon>
              </div>
              <p class="font-sans text-xs text-slate-200 leading-relaxed font-normal">
                Estudio como hábito de crecimiento, Trabajo con esfuerzo y dignidad, Amistad fundamentada en respeto, solidaridad y compañerismo sincero en toda la comunidad educativa.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class HistoryComponent {
  yearsActive = computed(() => new Date().getFullYear() - 1957);
}
