import { ChangeDetectionStrategy, Component, ElementRef, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-counters',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="py-16 bg-white border-b border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- Indicadores Numéricos de Confianza -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          
          <div class="bg-white p-4 sm:p-6 rounded-sm border border-[#0F296B]/15 shadow-mayer-soft text-center space-y-1">
            <div class="text-[10px] sm:text-xs font-sans text-slate-500 font-bold uppercase tracking-wider truncate">HISTORIA RIMENSE</div>
            <div class="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F296B] font-heading">
              +{{ yearsCount() }}
            </div>
            <div class="text-xs sm:text-sm font-bold text-slate-800 truncate">Años al Servicio</div>
            <div class="text-[10px] sm:text-[11px] font-sans text-slate-500 truncate">De la niñez y juventud rimense</div>
          </div>

          <div class="bg-white p-4 sm:p-6 rounded-sm border border-[#0F296B]/15 shadow-mayer-soft text-center space-y-1">
            <div class="text-[10px] sm:text-xs font-sans text-slate-500 font-bold uppercase tracking-wider truncate">CICLOS INTEGRADOS</div>
            <div class="text-2xl sm:text-4xl lg:text-5xl font-black text-[#254EB6] font-heading">
              {{ levelsCount() }}
            </div>
            <div class="text-xs sm:text-sm font-bold text-slate-800 truncate">Niveles Educativos</div>
            <div class="text-[10px] sm:text-[11px] font-sans text-slate-500 truncate">Inicial · Primaria · Sec.</div>
          </div>

          <div class="bg-white p-4 sm:p-6 rounded-sm border border-[#0F296B]/15 shadow-mayer-soft text-center space-y-1">
            <div class="text-[10px] sm:text-xs font-sans text-slate-500 font-bold uppercase tracking-wider truncate">MÉTODO MAYERINO</div>
            <div class="text-2xl sm:text-4xl lg:text-5xl font-black text-amber-500 font-heading">
              {{ homeworkCount() }}%
            </div>
            <div class="text-xs sm:text-sm font-bold text-slate-800 truncate">Tareas en Clase</div>
            <div class="text-[10px] sm:text-[11px] font-sans text-slate-500 truncate">Desarrolladas con el profesor</div>
          </div>

          <div class="bg-white p-4 sm:p-6 rounded-sm border border-[#0F296B]/15 shadow-mayer-soft text-center space-y-1">
            <div class="text-[10px] sm:text-xs font-sans text-slate-500 font-bold uppercase tracking-wider truncate">FUNDACIÓN</div>
            <div class="text-2xl sm:text-4xl lg:text-5xl font-black text-rose-600 font-heading">
              {{ foundationYear() }}
            </div>
            <div class="text-xs sm:text-sm font-bold text-slate-800 truncate">Año de Fundación</div>
            <div class="text-[10px] sm:text-[11px] font-sans text-slate-500 truncate">Tradición en el Rímac</div>
          </div>

        </div>

        <!-- Los 3 Pilares Históricos Institucionales: Estudio, Trabajo, Amistad -->
        <div id="propuesta" class="pt-6">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0F296B]/15 mb-12">
            <div class="space-y-2 max-w-2xl">
              <div class="inline-flex items-center space-x-2 bg-[#254EB6]/10 text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider rounded-full border border-[#254EB6]/20">
                <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
                <span>TRINOMIO DE FORMACIÓN MAYERINA</span>
              </div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F296B] tracking-tight">
                El Trinomio de Formación Mayerina
              </h2>
              <p class="text-sm text-slate-600 leading-relaxed font-normal">
                Inculcado por nuestros fundadores Prof. Paulino Lapa ("El Dire") y la Sra. Yolanda Salinas, este lema rector guía el desarrollo intelectual, técnico y humano de cada estudiante.
              </p>
            </div>
            <div class="hidden md:flex items-center space-x-2 text-xs font-sans text-slate-500 font-medium">
              <span>LEMA INSTITUCIONAL DESDE 1957</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <!-- Pilar 1: ESTUDIO -->
            <div class="group bg-white rounded-sm border border-[#0F296B]/15 shadow-mayer-soft hover:shadow-mayer-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div class="p-6 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div class="bg-[#0F296B] text-white font-sans text-xs uppercase font-extrabold px-2.5 py-1 tracking-wider rounded-xs">
                    01 · ESTUDIO
                  </div>
                  <span class="font-sans text-xs text-slate-500 font-bold uppercase">CONOCIMIENTO ACTIVO</span>
                </div>
                
                <div class="h-36 flex items-center justify-center p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <img
                    src="/images/estudio.png"
                    alt="Pilar Histórico: Estudio"
                    class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <h3 class="text-xl font-bold text-[#0F296B]">1. Estudio</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic">
                  "Proceso que realiza el estudiante para aprender y adquirir conocimientos."
                </p>
              </div>

              <div class="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 font-medium">
                <div class="flex items-center space-x-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#0F296B] inline-block"></span>
                  <span>Tareas supervisadas y desarrolladas en aula</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#0F296B] inline-block"></span>
                  <span>Formación académica sólida y continua</span>
                </div>
              </div>
            </div>

            <!-- Pilar 2: TRABAJO -->
            <div class="group bg-white rounded-sm border border-[#0F296B]/15 shadow-mayer-soft hover:shadow-mayer-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div class="p-6 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div class="bg-amber-500 text-slate-900 font-sans text-xs uppercase font-extrabold px-2.5 py-1 tracking-wider rounded-xs">
                    02 · TRABAJO
                  </div>
                  <span class="font-sans text-xs text-slate-500 font-bold uppercase">DISCIPLINA PRÁCTICA</span>
                </div>

                <div class="h-36 flex items-center justify-center p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <img
                    src="/images/trabajo.png"
                    alt="Pilar Histórico: Trabajo"
                    class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <h3 class="text-xl font-bold text-[#0F296B]">2. Trabajo</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic">
                  "Actividad física, moral e intelectual para obtener un bien o un servicio."
                </p>
              </div>

              <div class="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 font-medium">
                <div class="flex items-center space-x-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                  <span>Laboratorios equipados de cómputo e informática</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
                  <span>Hábitos de perseverancia, disciplina y superación</span>
                </div>
              </div>
            </div>

            <!-- Pilar 3: AMISTAD -->
            <div class="group bg-white rounded-sm border border-[#0F296B]/15 shadow-mayer-soft hover:shadow-mayer-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div class="p-6 space-y-4">
                <div class="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div class="bg-rose-600 text-white font-sans text-xs uppercase font-extrabold px-2.5 py-1 tracking-wider rounded-xs">
                    03 · AMISTAD
                  </div>
                  <span class="font-sans text-xs text-slate-500 font-bold uppercase">VALORES HUMANOS</span>
                </div>

                <div class="h-36 flex items-center justify-center p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <img
                    src="/images/amistad.png"
                    alt="Pilar Histórico: Amistad"
                    class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <h3 class="text-xl font-bold text-[#0F296B]">3. Amistad</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal italic">
                  "Relación afectiva entre personas asociadas a valores como amor, lealtad y compromiso."
                </p>
              </div>

              <div class="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-700 space-y-1.5 font-medium">
                <div class="flex items-center space-x-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block"></span>
                  <span>Atención psicológica personalizada continua</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-600 inline-block"></span>
                  <span>Danzas folklóricas peruanas e integración</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class CountersComponent implements OnInit {
  yearsCount = signal<number>(65);
  levelsCount = signal<number>(3);
  homeworkCount = signal<number>(100);
  foundationYear = signal<number>(1957);

  private el = inject(ElementRef);

  ngOnInit() {
    this.startCounters();
  }

  private startCounters() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      this.yearsCount.set(Math.min(65, Math.round((progress / 35) * 65)));
      this.levelsCount.set(Math.min(3, Math.round((progress / 35) * 3)));
      this.homeworkCount.set(Math.min(100, Math.round((progress / 35) * 100)));
      this.foundationYear.set(Math.min(1957, Math.round(1900 + (progress / 35) * 57)));

      if (progress >= 35) {
        this.yearsCount.set(65);
        this.levelsCount.set(3);
        this.homeworkCount.set(100);
        this.foundationYear.set(1957);
        clearInterval(interval);
      }
    }, 25);
  }
}
