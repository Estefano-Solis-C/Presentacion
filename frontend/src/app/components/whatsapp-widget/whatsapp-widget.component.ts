import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-whatsapp-widget',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Backdrop Difuminado en Móvil para Cierre Intuitivo -->
    @if (isOpen()) {
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-2xs z-40 sm:hidden animate-fade-in"
        (click)="closeWidget()"
        aria-hidden="true"
      ></div>
    }

    <!-- Contenedor del Asistente Flotante -->
    <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      
      <!-- Ventana Emergente: Bottom Sheet en Móvil / Tarjeta Flotante en Desktop -->
      @if (isOpen()) {
        <div
          class="fixed inset-x-0 bottom-0 sm:static sm:inset-auto mb-0 sm:mb-3 w-full sm:w-96 max-h-[85vh] sm:max-h-none bg-white rounded-t-2xl sm:rounded-lg shadow-2xl sm:shadow-mayer-elevated border-t sm:border border-[#0F296B]/20 overflow-hidden flex flex-col animate-modalFadeIn z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Asistente de WhatsApp Escolar"
        >
          <!-- Pestaña / Drag Handle Superior en Móvil -->
          <div class="sm:hidden pt-2.5 pb-1 flex justify-center bg-[#0F296B]">
            <div class="w-12 h-1 bg-white/30 rounded-full"></div>
          </div>

          <!-- Encabezado del Asistente con Estado en Vivo -->
          <div class="bg-[#0F296B] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#0F296B]/20">
            <div class="flex items-center space-x-2.5 sm:space-x-3">
              <div class="relative shrink-0">
                <div class="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xs">
                  <app-icon name="whatsapp" size="20"></app-icon>
                </div>
                <!-- Indicador de En Línea vs Fuera de Horario -->
                <span
                  class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0F296B]"
                  [class.bg-emerald-400]="isOnline()"
                  [class.animate-pulse]="isOnline()"
                  [class.bg-amber-400]="!isOnline()"
                  [attr.title]="isOnline() ? 'En línea en secretaría' : 'Fuera del horario de atención'"
                ></span>
              </div>
              <div class="min-w-0">
                <div class="font-bold text-xs sm:text-sm tracking-wide truncate">
                  Admisión Mayerina
                </div>
                <div class="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/90">
                  <span
                    class="inline-block w-1.5 h-1.5 rounded-full"
                    [class.bg-emerald-400]="isOnline()"
                    [class.bg-amber-400]="!isOnline()"
                  ></span>
                  <span class="truncate">{{ statusLabel() }}</span>
                </div>
              </div>
            </div>

            <!-- Botón Cerrar -->
            <button
              type="button"
              (click)="closeWidget()"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
              aria-label="Cerrar ventana de WhatsApp"
            >
              <app-icon name="close" size="18"></app-icon>
            </button>
          </div>

          <!-- Píldora Informativa de Horario de Secretaría -->
          <div
            class="px-3.5 py-1.5 text-[10px] font-sans font-medium flex items-center justify-between border-b"
            [class.bg-emerald-50]="isOnline()"
            [class.text-emerald-800]="isOnline()"
            [class.border-emerald-100]="isOnline()"
            [class.bg-amber-50]="!isOnline()"
            [class.text-amber-900]="!isOnline()"
            [class.border-amber-100]="!isOnline()"
          >
            <span class="flex items-center gap-1">
              <app-icon name="clock" [size]="12"></app-icon>
              <span>{{ isOnline() ? 'Secretaría disponible ahora' : 'Horario: Lun-Vie 8:00 a 17:00, Sáb 8:30 a 13:00' }}</span>
            </span>
            <span class="font-bold uppercase tracking-wider text-[9px]">
              {{ isOnline() ? 'En Vivo' : 'Offline' }}
            </span>
          </div>

          <!-- Cuerpo del Chat: Mensaje de Bienvenida y Preguntas Frecuentes -->
          <div class="p-3 sm:p-4 space-y-2.5 sm:space-y-3 bg-slate-50 text-xs overflow-y-auto max-h-[60vh] sm:max-h-96">
            <div class="bg-white p-3 rounded-md border border-[#0F296B]/10 shadow-xs text-slate-800 leading-relaxed text-[11px] sm:text-xs">
              {{ welcomeMessage() }}
            </div>

            <div class="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider pt-0.5">
              CONSULTAS FRECUENTES DIRECTAS:
            </div>

            <!-- Botones de Acción Rápida -->
            <div class="space-y-1.5">
              <button
                type="button"
                (click)="sendWhatsapp('Hola, deseo información sobre la Matrícula 2026 para Alumno Nuevo.')"
                class="w-full text-left p-2.5 bg-white hover:bg-slate-50 active:bg-blue-50 rounded-md border border-[#0F296B]/15 shadow-2xs text-slate-800 transition-all flex items-center justify-between group text-[11px] sm:text-xs cursor-pointer"
              >
                <span class="font-semibold flex items-center gap-2">
                  <app-icon name="clipboard-list" [size]="14" className="text-[#254EB6] shrink-0"></app-icon>
                  <span>Matrícula 2026 (Nuevo)</span>
                </span>
                <app-icon name="arrow-right" [size]="13" className="text-slate-400 group-hover:text-[#254EB6] shrink-0"></app-icon>
              </button>

              <button
                type="button"
                (click)="sendWhatsapp('Buenas tardes, quisiera consultar los costos de pensión y vacantes disponibles.')"
                class="w-full text-left p-2.5 bg-white hover:bg-slate-50 active:bg-blue-50 rounded-md border border-[#0F296B]/15 shadow-2xs text-slate-800 transition-all flex items-center justify-between group text-[11px] sm:text-xs cursor-pointer"
              >
                <span class="font-semibold flex items-center gap-2">
                  <app-icon name="currency" [size]="14" className="text-[#254EB6] shrink-0"></app-icon>
                  <span>Pensiones y Vacantes</span>
                </span>
                <app-icon name="arrow-right" [size]="13" className="text-slate-400 group-hover:text-[#254EB6] shrink-0"></app-icon>
              </button>

              <button
                type="button"
                (click)="sendWhatsapp('Hola, deseo información sobre los talleres de Vacaciones Útiles.')"
                class="w-full text-left p-2.5 bg-white hover:bg-slate-50 active:bg-blue-50 rounded-md border border-[#0F296B]/15 shadow-2xs text-slate-800 transition-all flex items-center justify-between group text-[11px] sm:text-xs cursor-pointer"
              >
                <span class="font-semibold flex items-center gap-2">
                  <app-icon name="sun" [size]="14" className="text-[#254EB6] shrink-0"></app-icon>
                  <span>Vacaciones Útiles 2026</span>
                </span>
                <app-icon name="arrow-right" [size]="13" className="text-slate-400 group-hover:text-[#254EB6] shrink-0"></app-icon>
              </button>

              <button
                type="button"
                (click)="sendWhatsapp('Buenos días, ¿cuál es el horario de atención en Secretaría y la dirección exacta en el Rímac?')"
                class="w-full text-left p-2.5 bg-white hover:bg-slate-50 active:bg-blue-50 rounded-md border border-[#0F296B]/15 shadow-2xs text-slate-800 transition-all flex items-center justify-between group text-[11px] sm:text-xs cursor-pointer"
              >
                <span class="font-semibold flex items-center gap-2">
                  <app-icon name="map-pin" [size]="14" className="text-[#254EB6] shrink-0"></app-icon>
                  <span>Horarios y Ubicación</span>
                </span>
                <app-icon name="arrow-right" [size]="13" className="text-slate-400 group-hover:text-[#254EB6] shrink-0"></app-icon>
              </button>
            </div>

            <!-- Botón Directo al Chat Abierto -->
            <button
              type="button"
              (click)="sendWhatsapp('Hola Secretaría I.E.P. Dora Mayer de Zulen, deseo realizar una consulta general.')"
              class="w-full mt-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <app-icon name="whatsapp" [size]="14"></app-icon>
              <span>Abrir WhatsApp con mensaje libre</span>
            </button>
          </div>

          <!-- Footer del Widget -->
          <div class="p-2 sm:p-2.5 bg-slate-100 border-t border-[#0F296B]/10 text-center">
            <span class="text-[10px] font-sans text-slate-500 font-bold uppercase tracking-wider">
              Secretaría I.E.P. Dora Mayer · Rímac
            </span>
          </div>

        </div>
      }

      <!-- Botón Flotante Principal: Circular Compacto en Celular (FAB), Extendido en Desktop -->
      <button
        type="button"
        (click)="toggleOpen()"
        class="group relative bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all font-sans font-bold cursor-pointer flex items-center justify-center
               w-12 h-12 rounded-full sm:w-auto sm:h-12 sm:px-4"
        [attr.aria-label]="isOpen() ? 'Cerrar asistente de WhatsApp' : 'Abrir asistente de WhatsApp'"
      >
        <!-- Icono con Indicador de Estado -->
        <div class="relative flex items-center justify-center">
          <app-icon [name]="isOpen() ? 'close' : 'whatsapp'" [size]="22"></app-icon>
          @if (!isOpen()) {
            <span
              class="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
              [class.bg-emerald-400]="isOnline()"
              [class.animate-pulse]="isOnline()"
              [class.bg-amber-400]="!isOnline()"
            ></span>
          }
        </div>

        <!-- Texto solo visible en Pantallas Mayores a Móvil -->
        <span class="hidden sm:inline-block ml-2 text-xs uppercase tracking-wider">
          {{ isOpen() ? 'Cerrar' : (isOnline() ? '¿Consultas? Escríbenos' : 'Dejar Mensaje WhatsApp') }}
        </span>
      </button>

    </div>
  `
})
export class WhatsappWidgetComponent implements OnInit, OnDestroy {
  isOpen = signal<boolean>(false);
  currentTime = signal<Date>(new Date());
  private clockTimer: any = null;
  private readonly cleanPhone = '51966057981';

  // Evaluación en tiempo real del horario escolar de secretaría en Lima, Perú (UTC-5)
  isOnline = computed(() => {
    const now = this.currentTime();
    try {
      const peruStr = now.toLocaleString('en-US', { timeZone: 'America/Lima' });
      const pDate = new Date(peruStr);
      const day = pDate.getDay(); // 0: Domingo, 1: Lunes ... 6: Sábado
      const hour = pDate.getHours();
      const minute = pDate.getMinutes();
      const time = hour + minute / 60;

      // Lunes a Viernes: 8:00 a 17:00
      if (day >= 1 && day <= 5) {
        return time >= 8.0 && time < 17.0;
      }
      // Sábados: 8:30 a 13:00
      if (day === 6) {
        return time >= 8.5 && time < 13.0;
      }
    } catch (e) {
      // Fallback
      const hour = now.getHours();
      return hour >= 8 && hour < 17;
    }
    return false;
  });

  statusLabel = computed(() => {
    return this.isOnline()
      ? 'En línea · +51 966 057 981'
      : 'Fuera de horario · +51 966 057 981';
  });

  welcomeMessage = computed(() => {
    if (this.isOnline()) {
      return '¡Hola! Bienvenido a la I.E.P. Dora Mayer de Zulen. La secretaría está atendiendo en vivo. ¿En qué podemos orientarte hoy?';
    }
    return '¡Hola! Nuestro horario de secretaría es de Lunes a Viernes de 8:00 am a 5:00 pm. Puedes dejarnos tu consulta por WhatsApp y te responderemos a primera hora laboral.';
  });

  ngOnInit() {
    // Actualizar reloj cada 60 segundos para vigilar el cambio de turno en tiempo real
    this.clockTimer = setInterval(() => {
      this.currentTime.set(new Date());
    }, 60000);
  }

  ngOnDestroy() {
    if (this.clockTimer) {
      clearInterval(this.clockTimer);
      this.clockTimer = null;
    }
  }

  toggleOpen() {
    this.isOpen.update(v => !v);
  }

  closeWidget() {
    this.isOpen.set(false);
  }

  sendWhatsapp(message: string) {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${this.cleanPhone}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
