import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="beneficios" class="py-20 bg-mayer-fog border-b border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        <!-- Header de Sección -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-[#254EB6]/10 text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider rounded-full border border-[#254EB6]/20">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>PROPUESTA EDUCATIVA MAYERINA</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F296B] tracking-tight">
              ¿Por qué las Familias del Rímac nos Eligen?
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed font-normal">
              Un modelo educativo probado por más de 68 años: alta exigencia pedagógica, acompañamiento psicológico continuo y bienestar familiar sin sobrecarga de tareas nocturnas.
            </p>
          </div>
          <div class="hidden md:flex items-center space-x-2 text-xs font-sans text-slate-500 font-medium">
            <span class="w-2.5 h-2.5 rounded-full bg-[#FBB600] inline-block"></span>
            <span>METODOLOGÍA DE RENDIMIENTO DIRECTO</span>
          </div>
        </div>

        <!-- Grilla de Tarjetas con Fotografías Reales y Bordes Suaves (Exactamente 3 Tarjetas Oficiales) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Diferenciador 1: Atención Psicológica -->
          <div class="group bg-white rounded-sm border border-[#0F296B]/15 shadow-mayer-soft hover:shadow-mayer-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
            <div class="relative h-48 overflow-hidden border-b border-[#0F296B]/10 bg-slate-100">
              <img
                src="/images/atencion_psicologica.jpeg"
                alt="Atención Psicológica y Talleres en Dora Mayer"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute top-2 left-2 bg-[#0F296B] text-white font-sans text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider rounded-xs border border-white/20">
                01 · SOPORTE EMOCIONAL
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div class="space-y-2">
                <div class="flex items-center space-x-2 text-[#254EB6]">
                  <app-icon name="heart" size="18"></app-icon>
                  <span class="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500">DEPARTAMENTO DE PSICOLOGÍA</span>
                </div>
                <h3 class="text-lg font-bold text-[#0F296B] leading-snug">Atención Psicológica</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Todos nuestros alumnos recibirán talleres o charlas con un psicólogo(a) para aprender a convivir en estos tiempos difíciles.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans text-slate-500 font-medium">
                <span>SESIONES Y TALLERES</span>
                <span class="text-[#254EB6] font-bold">ACOMPAÑAMIENTO REAL</span>
              </div>
            </div>
          </div>

          <!-- Diferenciador 2: Herramientas Lúdicas -->
          <div class="group bg-white rounded-sm border border-[#0F296B]/15 shadow-mayer-soft hover:shadow-mayer-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
            <div class="relative h-48 overflow-hidden border-b border-[#0F296B]/10 bg-slate-100">
              <img
                src="/images/herramientas_ludicas.jpg"
                alt="Herramientas Lúdicas y Dinámicas de Clase"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute top-2 left-2 bg-[#0F296B] text-white font-sans text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider rounded-xs border border-white/20">
                02 · METODOLOGÍA ACTIVA
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div class="space-y-2">
                <div class="flex items-center space-x-2 text-[#254EB6]">
                  <app-icon name="palette" size="18"></app-icon>
                  <span class="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500">DIDÁCTICA PARTICIPATIVA</span>
                </div>
                <h3 class="text-lg font-bold text-[#0F296B] leading-snug">Herramientas Lúdicas</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Nuestros profesores están capacitados para realizar clases dinámicas y nuestros alumnos puedan disfrutar de su aprendizaje.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans text-slate-500 font-medium">
                <span>DOCENTES CAPACITADOS</span>
                <span class="text-amber-600 font-bold">CLASES ACTIVAS</span>
              </div>
            </div>
          </div>

          <!-- Diferenciador 3: Tareas Realizadas en Clase -->
          <div class="group bg-white rounded-sm border border-[#0F296B]/15 shadow-mayer-soft hover:shadow-mayer-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
            <div class="relative h-48 overflow-hidden border-b border-[#0F296B]/10 bg-slate-100">
              <img
                src="/images/tareas_clase.jpg"
                alt="Tareas realizadas en clase con docentes"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute top-2 left-2 bg-[#0F296B] text-white font-sans text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider rounded-xs border border-white/20">
                03 · EN HORARIO ESCOLAR
              </div>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div class="space-y-2">
                <div class="flex items-center space-x-2 text-[#254EB6]">
                  <app-icon name="book" size="18"></app-icon>
                  <span class="font-sans text-[11px] font-bold uppercase tracking-wider text-slate-500">ACOMPAÑAMIENTO EN AULA</span>
                </div>
                <h3 class="text-lg font-bold text-[#0F296B] leading-snug">Tareas Realizadas en Clase</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Sabemos que los padres de familia no cuentan con tiempo suficiente por eso la mayoría de las tareas serán desarrolladas con el profesor en clase.
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans text-slate-500 font-medium">
                <span>0% TAREAS NOCTURNAS</span>
                <span class="text-emerald-600 font-bold">100% EFICACIA</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `
})
export class BenefitsComponent {}
