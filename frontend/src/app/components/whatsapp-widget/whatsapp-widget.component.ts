import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-whatsapp-widget',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Botón Flotante de Asistente WhatsApp -->
    <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-2rem)]">
      
      <!-- Ventana Emergente de Asistencia Rápida -->
      @if (isOpen()) {
        <div class="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm bg-white rounded-sm shadow-mayer-elevated border border-[#0F296B]/20 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          <!-- Encabezado del Asistente -->
          <div class="bg-[#0F296B] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#0F296B]/20">
            <div class="flex items-center space-x-2.5 sm:space-x-3">
              <div class="relative">
                <div class="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-600 rounded-sm flex items-center justify-center text-white">
                  <app-icon name="whatsapp" size="20"></app-icon>
                </div>
                <span class="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0F296B]"></span>
              </div>
              <div>
                <div class="font-bold text-xs sm:text-sm tracking-wide">Admisión Mayerina</div>
                <div class="text-[10px] sm:text-[11px] text-white/80">En línea · +51 966 057 981</div>
              </div>
            </div>
            <button
              type="button"
              (click)="toggleOpen()"
              class="text-white/80 hover:text-white p-1 rounded-sm cursor-pointer"
              aria-label="Cerrar chat"
            >
              <app-icon name="close" size="18"></app-icon>
            </button>
          </div>

          <!-- Cuerpo del Chat: Mensaje de Bienvenida y Preguntas Frecuentes -->
          <div class="p-3.5 sm:p-4 space-y-2.5 sm:space-y-3 bg-slate-50 text-xs">
            <div class="bg-white p-3 rounded-sm border border-[#0F296B]/10 shadow-xs text-slate-800 leading-relaxed text-[11px] sm:text-xs">
              ¡Hola! Bienvenido a la <strong>I.E.P. Dora Mayer de Zulen</strong> en el Rímac. ¿En qué podemos orientarte hoy?
            </div>

            <div class="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider pt-1">
              CONSULTAS FRECUENTES DIRECTAS:
            </div>

            <!-- Preguntas Rápidas -->
            <button
              type="button"
              (click)="sendWhatsapp('Hola, deseo información sobre la Matrícula 2026 para Alumno Nuevo.')"
              class="w-full text-left p-2.5 bg-white hover:bg-slate-50 rounded-sm border border-[#0F296B]/15 shadow-xs text-slate-800 transition-all flex items-center justify-between group text-[11px] sm:text-xs cursor-pointer"
            >
              <span class="font-bold flex items-center gap-1.5">
                <app-icon name="clipboard-list" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                <span>Matrícula 2026 (Nuevo)</span>
              </span>
              <app-icon name="arrow-right" size="13" className="text-slate-400 group-hover:text-[#254EB6]"></app-icon>
            </button>

            <button
              type="button"
              (click)="sendWhatsapp('Buenas tardes, quisiera consultar los costos de pensión y vacantes disponibles.')"
              class="w-full text-left p-2.5 bg-white hover:bg-slate-50 rounded-sm border border-[#0F296B]/15 shadow-xs text-slate-800 transition-all flex items-center justify-between group text-[11px] sm:text-xs cursor-pointer"
            >
              <span class="font-bold flex items-center gap-1.5">
                <app-icon name="currency" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                <span>Pensiones y Vacantes</span>
              </span>
              <app-icon name="arrow-right" size="13" className="text-slate-400 group-hover:text-[#254EB6]"></app-icon>
            </button>

            <button
              type="button"
              (click)="sendWhatsapp('Hola, deseo información sobre los talleres de Vacaciones Útiles.')"
              class="w-full text-left p-2.5 bg-white hover:bg-slate-50 rounded-sm border border-[#0F296B]/15 shadow-xs text-slate-800 transition-all flex items-center justify-between group text-[11px] sm:text-xs cursor-pointer"
            >
              <span class="font-bold flex items-center gap-1.5">
                <app-icon name="sun" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                <span>Vacaciones Útiles 2026</span>
              </span>
              <app-icon name="arrow-right" size="13" className="text-slate-400 group-hover:text-[#254EB6]"></app-icon>
            </button>

            <button
              type="button"
              (click)="sendWhatsapp('Buenos días, ¿cuál es el horario de atención en Secretaría y la dirección exacta en el Rímac?')"
              class="w-full text-left p-2.5 bg-white hover:bg-slate-50 rounded-sm border border-[#0F296B]/15 shadow-xs text-slate-800 transition-all flex items-center justify-between group text-[11px] sm:text-xs cursor-pointer"
            >
              <span class="font-bold flex items-center gap-1.5">
                <app-icon name="map-pin" size="14" className="text-[#254EB6] shrink-0"></app-icon>
                <span>Horarios y Ubicación</span>
              </span>
              <app-icon name="arrow-right" size="13" className="text-slate-400 group-hover:text-[#254EB6]"></app-icon>
            </button>
          </div>

          <!-- Footer del Widget -->
          <div class="p-2.5 bg-slate-100 border-t border-[#0F296B]/10 text-center">
            <span class="text-[10px] font-sans text-slate-500 font-bold uppercase">Secretaría I.E.P. Dora Mayer</span>
          </div>

        </div>
      }

      <!-- Botón Flotante Principal -->
      <button
        type="button"
        (click)="toggleOpen()"
        class="h-12 px-4 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center space-x-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all font-sans text-xs uppercase font-bold tracking-wider cursor-pointer"
        aria-label="Abrir asistente de WhatsApp"
      >
        <app-icon [name]="isOpen() ? 'close' : 'whatsapp'" size="20"></app-icon>
        <span class="hidden sm:inline">{{ isOpen() ? 'Cerrar' : '¿Consultas? Escríbenos' }}</span>
        <span class="sm:hidden">{{ isOpen() ? 'Cerrar' : 'WhatsApp' }}</span>
      </button>

    </div>
  `
})
export class WhatsappWidgetComponent {
  isOpen = signal<boolean>(false);
  private readonly cleanPhone = '51966057981';

  toggleOpen() {
    this.isOpen.update(v => !v);
  }

  sendWhatsapp(message: string) {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${this.cleanPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
