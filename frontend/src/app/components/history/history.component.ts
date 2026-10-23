import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="historia" class="py-20 bg-mayer-fog border-b border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- Bloque Editorial de Historia y Fundadores -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-6 space-y-6">
            <div class="inline-flex items-center space-x-2 bg-amber-50 text-amber-950 font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider border border-amber-200 rounded-full shadow-xs">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>TRAYECTORIA Y VALORES MAYERINOS</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl font-extrabold text-[#0F296B] tracking-tight">
              Más de 68 Años Forjando el Futuro del Rímac
            </h2>
            
            <p class="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              La Institución Educativa Privada <strong class="text-slate-900">"Dora Mayer de Zulen"</strong> nació en 1957 gracias a la visión educadora del recordado <strong class="text-[#0F296B]">Prof. Paulino Lapa ("El Dire")</strong> y su distinguida esposa, <strong class="text-[#0F296B]">Sra. Yolanda Salinas</strong>. 
            </p>
            
            <p class="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Inició sus actividades en el recordado local de la <strong class="text-slate-900 font-semibold">Calle Monitor Huáscar</strong>, consolidándose como referente de disciplina y calidad en el distrito bajopontino. Posteriormente, trasladó su sede central a su moderno local propio en <strong class="text-slate-900 font-semibold">Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac</strong>, donde generaciones de ilustres rimenses se han graduado con honores.
            </p>

            <div class="p-5 bg-white rounded-sm border border-[#0F296B]/15 shadow-mayer-soft flex items-center space-x-4">
              <div class="w-16 h-16 bg-[#0F296B] border border-white/20 flex flex-col items-center justify-center shrink-0 shadow-sm rounded-sm">
                <span class="text-2xl font-black text-[#FBB600] leading-none">68</span>
                <span class="text-[10px] font-extrabold text-white tracking-widest uppercase mt-0.5">AÑOS</span>
              </div>
              <div class="text-xs text-slate-700">
                <strong class="text-[#0F296B] font-bold block text-sm">Homenaje Vivo a Nuestros Fundadores</strong>
                "Estudio, Trabajo y Amistad": El legado moral del Prof. Paulino Lapa y la Sra. Yolanda Salinas que continúa guiando a cada promoción mayerina.
              </div>
            </div>
          </div>

          <!-- Línea de Tiempo Editorial -->
          <div class="lg:col-span-6 bg-white p-8 rounded-sm border border-[#0F296B]/15 shadow-mayer-soft space-y-6">
            <div class="flex items-center justify-between pb-3 border-b border-[#0F296B]/10">
              <h3 class="text-base font-bold text-[#0F296B] flex items-center space-x-2">
                <app-icon name="calendar" size="18" className="text-[#254EB6]"></app-icon>
                <span>Hitos Históricos de I.E.P. Dora Mayer de Zulen</span>
              </h3>
              <span class="font-sans text-[10px] uppercase font-bold text-slate-500">CRONOGRAMA ARCHIVO</span>
            </div>

            <div class="space-y-7 ml-2">
              
              <div class="relative pl-7 border-l-2 border-[#0F296B]/30">
                <span class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#0F296B] border-2 border-white ring-2 ring-[#0F296B]/20"></span>
                <div class="font-sans text-xs font-bold text-[#254EB6] uppercase">1957 · FUNDACIÓN HISTÓRICA</div>
                <div class="text-sm font-bold text-slate-900">Apertura en Calle Monitor Huáscar</div>
                <div class="text-xs text-slate-600 leading-relaxed mt-1">Fundado por el Prof. Paulino Lapa y Yolanda Salinas con la firme misión de ofrecer educación accesible y de rigor al Rímac.</div>
              </div>

              <div class="relative pl-7 border-l-2 border-[#0F296B]/30">
                <span class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-white ring-2 ring-amber-400/30"></span>
                <div class="font-sans text-xs font-bold text-amber-600 uppercase">SEDE CENTRAL VENTURA ROSSI</div>
                <div class="text-sm font-bold text-slate-900">Calle Ricardo Bentín 749</div>
                <div class="text-xs text-slate-600 leading-relaxed mt-1">Ampliación de infraestructura con laboratorios de cómputo, ciencias, biblioteca y salas multimedia.</div>
              </div>

              <div class="relative pl-7 border-l-2 border-[#0F296B]/30">
                <span class="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white ring-2 ring-emerald-400/30"></span>
                <div class="font-sans text-xs font-bold text-emerald-700 uppercase">PRESENTE · INNOVACIÓN PEDAGÓGICA</div>
                <div class="text-sm font-bold text-slate-900">Tradición y Excelencia Educativa</div>
                <div class="text-xs text-slate-600 leading-relaxed mt-1">Matrícula sistematizada, tareas supervisadas en aula, psicopedagogía continua y formación integral en valores.</div>
              </div>

            </div>
          </div>

        </div>

        <!-- Misión, Visión y Valores (Pabellón High-Contrast Navy Blue) -->
        <div class="bg-[#0F296B] text-white rounded-sm border border-[#0F296B]/20 p-8 sm:p-12 shadow-mayer-soft">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div class="space-y-3 p-5 bg-white/5 rounded-sm border border-white/10">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 class="text-base font-sans font-bold text-[#FBB600] uppercase tracking-wider">01 · NUESTRA MISIÓN</h4>
                <app-icon name="sparkles" size="18" className="text-[#FBB600]"></app-icon>
              </div>
              <p class="text-xs text-slate-200 leading-relaxed font-normal">
                Brindar una formación integral de excelencia en Inicial, Primaria y Secundaria, potenciando el rigor académico, el pensamiento crítico y la práctica de valores cívicos en el Rímac.
              </p>
            </div>

            <div class="space-y-3 p-5 bg-white/5 rounded-sm border border-white/10">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 class="text-base font-sans font-bold text-sky-300 uppercase tracking-wider">02 · NUESTRA VISIÓN</h4>
                <app-icon name="academic-cap" size="18" className="text-sky-300"></app-icon>
              </div>
              <p class="text-xs text-slate-200 leading-relaxed font-normal">
                Ser reconocidos como la institución educativa referente del Rímac en formación humana y académica integral, con egresados éticos y comprometidos con el progreso del Perú.
              </p>
            </div>

            <div class="space-y-3 p-5 bg-white/5 rounded-sm border border-white/10">
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 class="text-base font-sans font-bold text-rose-300 uppercase tracking-wider">03 · NUESTROS VALORES</h4>
                <app-icon name="shield-check" size="18" className="text-rose-300"></app-icon>
              </div>
              <p class="text-xs text-slate-200 leading-relaxed font-normal">
                Disciplina en el Estudio, Dignidad en el Trabajo, Solidaridad en la Amistad, Respeto, Honestidad y Compromiso Comunitario con la familia bajopontina.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  `
})
export class HistoryComponent {}
