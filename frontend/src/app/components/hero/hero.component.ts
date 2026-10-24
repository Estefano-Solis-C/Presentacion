import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { PortalApiService } from '../../services/portal-api.service';

export const DICCIONARIO_GRADOS: Record<string, string[]> = {
  INICIAL: ['Inicial - 3 años', 'Inicial - 4 años', 'Inicial - 5 años'],
  PRIMARIA: [
    '1° de Primaria',
    '2° de Primaria',
    '3° de Primaria',
    '4° de Primaria',
    '5° de Primaria',
    '6° de Primaria'
  ],
  SECUNDARIA: [
    '1° de Secundaria',
    '2° de Secundaria',
    '3° de Secundaria',
    '4° de Secundaria',
    '5° de Secundaria'
  ]
};

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="matricula" class="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#0F296B]/15 bg-[#0F296B]">
      
      <!-- Fondo Fotográfico Institucional Nítido y Solemne (Sin Mascarillas) -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/images/banners/banner_001.jpg"
          alt="Fachada Institucional I.E.P. Dora Mayer de Zulen"
          class="w-full h-full object-cover object-center"
        />
        <!-- Overlay Azul Marino Más Ligero para Dejar Respirar la Fotografía Real -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#0F296B]/90 via-[#0F296B]/80 to-[#0F296B]/65 pointer-events-none"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <!-- COLUMNA IZQUIERDA: Titular, Frase y Dos Botones de Acción -->
          <div class="lg:col-span-7 space-y-6 text-white">
            
            <!-- Etiqueta Conmemorativa Sutil -->
            <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#FBB600] text-xs font-sans font-semibold tracking-wider uppercase">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>Fundado en 1957 · Rímac</span>
            </div>

            <!-- UN Titular Editorial en Serif -->
            <h1 class="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.18] drop-shadow-xs">
              Formación con valores, rigor y calidez en el corazón del Rímac
            </h1>

            <!-- UNA Frase Sobria y Cercana para la Familia -->
            <p class="text-base sm:text-lg text-white/90 leading-relaxed font-sans max-w-2xl font-normal">
              Acompañamos a su hijo desde Inicial hasta Secundaria con tareas realizadas en el colegio, psicopedagogía continua y un entorno seguro donde aprender es crecer en familia.
            </p>

            <!-- DOS Botones de Acción Directa -->
            <div class="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                (click)="scrollToForm()"
                class="px-6 py-3 rounded-sm bg-[#254EB6] hover:bg-[#1D3FA2] text-white text-sm font-sans font-bold tracking-wider uppercase shadow-md transition-all flex items-center space-x-2 cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white/40"
              >
                <span>Solicitar información</span>
                <app-icon name="arrow-right" size="15" className="text-[#FBB600]"></app-icon>
              </button>

              <a
                href="https://wa.me/51966057981?text=Hola%2C%20deseo%20agendar%20una%20visita%20guiada%20a%20la%20sede%20del%20colegio%20Dora%20Mayer%20de%20Zulen."
                target="_blank"
                rel="noopener"
                class="px-6 py-3 rounded-sm bg-white/15 hover:bg-white/25 text-white text-sm font-sans font-semibold tracking-wider uppercase border border-white/30 backdrop-blur-sm transition-all flex items-center space-x-2 focus:outline-hidden"
              >
                <app-icon name="calendar" size="15" className="text-[#FBB600]"></app-icon>
                <span>Agendar visita</span>
              </a>
            </div>

            <!-- Enlaces Secundarios hacia WhatsApp con Mensaje Prellenado Específico -->
            <div class="pt-3 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs font-sans text-white/80">
              <span class="text-white/60">Accesos directos:</span>
              <a
                href="https://wa.me/51966057981?text=Hola%2C%20soy%20familia%20mayerina%20y%20deseo%20informaci%C3%B3n%20para%20la%20ratificaci%C3%B3n%20de%20matr%C3%ADcula%20de%20mi%20hijo."
                target="_blank"
                rel="noopener"
                class="hover:text-[#FBB600] underline underline-offset-4 decoration-white/30 transition-colors"
              >
                Familia Mayerina (Ratificación)
              </a>
              <span class="text-white/30">•</span>
              <a
                href="https://wa.me/51966057981?text=Hola%2C%20deseo%20informaci%C3%B3n%20sobre%20talleres%20y%20horarios%20de%20Vacaciones%20%C3%9Atiles."
                target="_blank"
                rel="noopener"
                class="hover:text-[#FBB600] underline underline-offset-4 decoration-white/30 transition-colors"
              >
                Vacaciones Útiles
              </a>
            </div>

          </div>

          <!-- COLUMNA DERECHA: Formulario Corto y Esencial de Admisión -->
          <div id="formulario-admision" class="lg:col-span-5">
            <div class="bg-white rounded-sm border border-[#0F296B]/15 p-6 sm:p-7 shadow-elevated">
              
              <!-- Encabezado del Formulario -->
              <div class="border-b border-slate-100 pb-4 mb-5">
                <div class="text-[11px] font-sans text-[#254EB6] font-bold uppercase tracking-wider">
                  Proceso de Admisión {{ currentAdmissionCycle() }}
                </div>
                <h2 class="font-serif text-xl sm:text-2xl font-bold text-[#0F296B] leading-tight mt-1">
                  Solicite su vacante escolar
                </h2>
                <p class="text-xs text-slate-500 font-sans mt-1">
                  Complete los datos básicos y continuaremos su atención personalizada por WhatsApp.
                </p>
              </div>

              <!-- Formulario Reactivo Angular -->
              <form [formGroup]="leadForm" (ngSubmit)="onSubmit()" class="space-y-3.5">
                
                <!-- Campo Honeypot Oculto (Anti-bot) -->
                <div class="hidden" aria-hidden="true">
                  <input type="text" formControlName="website" tabindex="-1" autocomplete="off" />
                </div>

                <!-- Nombre del Apoderado -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-sans text-xs font-semibold text-slate-700 mb-1">
                      Nombres del apoderado *
                    </label>
                    <input
                      type="text"
                      formControlName="apoderadoNombres"
                      placeholder="Ej. María Elena"
                      class="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] outline-hidden transition"
                    />
                  </div>
                  <div>
                    <label class="block font-sans text-xs font-semibold text-slate-700 mb-1">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      formControlName="apoderadoApellidos"
                      placeholder="Ej. Flores Ríos"
                      class="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] outline-hidden transition"
                    />
                  </div>
                </div>

                <!-- Celular y Correo -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-sans text-xs font-semibold text-slate-700 mb-1">
                      Celular WhatsApp *
                    </label>
                    <input
                      type="tel"
                      formControlName="celular"
                      placeholder="987 654 321"
                      maxlength="12"
                      class="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] outline-hidden transition"
                    />
                  </div>
                  <div>
                    <label class="block font-sans text-xs font-semibold text-slate-700 mb-1">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      formControlName="correo"
                      placeholder="correo@ejemplo.com"
                      class="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] outline-hidden transition"
                    />
                  </div>
                </div>

                <!-- Nombre del Alumno -->
                <div>
                  <label class="block font-sans text-xs font-semibold text-slate-700 mb-1">
                    Nombres y apellidos del alumno *
                  </label>
                  <input
                    type="text"
                    formControlName="alumnoNombre"
                    placeholder="Ej. Mateo Flores"
                    class="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] outline-hidden transition"
                  />
                </div>

                <!-- Nivel y Grado -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-sans text-xs font-semibold text-slate-700 mb-1">
                      Nivel educativo *
                    </label>
                    <select
                      formControlName="nivel"
                      (change)="onNivelChange()"
                      class="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] outline-hidden transition"
                    >
                      <option value="INICIAL">Inicial (3 a 5 años)</option>
                      <option value="PRIMARIA">Primaria (1° a 6°)</option>
                      <option value="SECUNDARIA">Secundaria (1° a 5°)</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-sans text-xs font-semibold text-slate-700 mb-1">
                      Grado de postulación *
                    </label>
                    <select
                      formControlName="grado"
                      class="w-full px-3 py-2 text-sm border border-slate-300 rounded-sm bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] outline-hidden transition"
                    >
                      @for (g of gradosDisponibles(); track g) {
                        <option [value]="g">{{ g }}</option>
                      }
                    </select>
                  </div>
                </div>

                <!-- Mensajes de Estado Amables -->
                @if (submitSuccess()) {
                  <div class="p-3 bg-[#F4F6FB] border border-[#254EB6]/30 rounded-sm text-xs text-[#0F296B] leading-relaxed">
                    <div class="font-bold">¡Solicitud recibida con éxito!</div>
                    <div>Abriendo WhatsApp para continuar su atención personalizada...</div>
                  </div>
                }

                @if (submitError()) {
                  <div class="p-3 bg-slate-50 border border-slate-300 rounded-sm text-xs text-slate-700 leading-relaxed">
                    {{ submitError() }}
                  </div>
                }

                <!-- Botón de Envío -->
                <button
                  type="submit"
                  [disabled]="leadForm.invalid || isSubmitting()"
                  class="w-full py-3 px-4 rounded-sm bg-[#254EB6] hover:bg-[#1D3FA2] disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-sans font-bold uppercase tracking-wider shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer focus:outline-hidden"
                >
                  @if (isSubmitting()) {
                    <span class="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Procesando solicitud...</span>
                  } @else {
                    <span>Enviar y continuar por WhatsApp</span>
                    <app-icon name="whatsapp" size="16" className="text-[#FBB600]"></app-icon>
                  }
                </button>

                <p class="text-[11px] text-slate-500 text-center font-sans">
                  Sus datos están protegidos conforme a la Ley N° 29733 de Protección de Datos Personales.
                </p>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  private fb = inject(FormBuilder);
  private api = inject(PortalApiService);

  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  submitError = signal<string | null>(null);

  leadForm: FormGroup = this.fb.group({
    apoderadoNombres: ['', [Validators.required, Validators.minLength(2)]],
    apoderadoApellidos: ['', [Validators.required, Validators.minLength(2)]],
    documento: [''], // Opcional
    celular: ['', [Validators.required, Validators.pattern(/^[0-9+ ]{9,15}$/)]],
    correo: ['', [Validators.required, Validators.email]],
    alumnoNombre: ['', [Validators.required, Validators.minLength(2)]],
    nivel: ['PRIMARIA', Validators.required],
    grado: ['1° de Primaria', Validators.required],
    website: [''] // Honeypot
  });

  gradosDisponibles = computed(() => {
    const nivel = this.leadForm?.get('nivel')?.value || 'PRIMARIA';
    return DICCIONARIO_GRADOS[nivel] || [];
  });

  currentAdmissionCycle = computed(() => {
    const now = new Date();
    const year = now.getFullYear();
    return now.getMonth() >= 6 ? year + 1 : year;
  });

  onNivelChange() {
    const nivel = this.leadForm.get('nivel')?.value;
    const grados = DICCIONARIO_GRADOS[nivel] || [];
    if (grados.length > 0) {
      this.leadForm.get('grado')?.setValue(grados[0]);
    }
  }

  scrollToForm() {
    const formElement = document.getElementById('formulario-admision');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const firstInput = formElement.querySelector('input') as HTMLInputElement;
      if (firstInput) {
        firstInput.focus();
      }
    }
  }

  setNivelFromExternal(nivel: 'INICIAL' | 'PRIMARIA' | 'SECUNDARIA') {
    this.leadForm.get('nivel')?.setValue(nivel);
    this.onNivelChange();
    this.scrollToForm();
  }

  onSubmit() {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.submitError.set(null);
    this.submitSuccess.set(false);

    const formValue = this.leadForm.value;

    this.api.submitLead({
      apoderadoNombres: formValue.apoderadoNombres,
      apoderadoApellidos: formValue.apoderadoApellidos,
      documento: formValue.documento || undefined,
      celular: formValue.celular,
      correo: formValue.correo,
      alumnoNombre: formValue.alumnoNombre,
      nivel: formValue.nivel,
      grado: formValue.grado,
      website: formValue.website
    }).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.submitSuccess.set(true);

        // Abrir WhatsApp con el payload prellenado
        if (response.whatsappRedirectUrl) {
          setTimeout(() => {
            window.open(response.whatsappRedirectUrl, '_blank');
          }, 800);
        }

        this.leadForm.reset({
          nivel: 'PRIMARIA',
          grado: '1° de Primaria',
          website: ''
        });
      },
      error: () => {
        this.isSubmitting.set(false);
        this.submitError.set('Ocurrió un error al enviar el formulario. Por favor comuníquese directamente a nuestro WhatsApp: 966 057 981.');
      }
    });
  }
}
