import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { PortalApiService } from '../../services/portal-api.service';

@Component({
  selector: 'app-contact-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contacto" class="py-20 bg-white border-t border-[#0F296B]/15">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-amber-50 text-amber-950 font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider border border-amber-200 rounded-full shadow-xs">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>ATENCIÓN DIRECTA Y SEDE CENTRAL</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F296B] tracking-tight">
              Contáctanos o Visítanos en el Rímac
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed font-normal">
              Nuestra secretaría y equipo directivo están a tu disposición para orientarte sobre vacantes 2026 / 2027, pensiones y visitas guiadas a las instalaciones.
            </p>
          </div>
          <div class="hidden md:flex items-center space-x-2 font-sans text-xs text-slate-500 font-medium">
            <span>ATENCIÓN: LUN - VIE 8:00 AM - 3:00 PM</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Información y Mapa -->
          <div class="lg:col-span-5 space-y-8">
            <div class="p-6 bg-slate-50 rounded-sm border border-[#0F296B]/15 shadow-mayer-soft space-y-4">
              <h3 class="text-base font-bold text-[#0F296B] uppercase tracking-wider font-sans border-b border-[#0F296B]/10 pb-2">
                SEDE CENTRAL · VENTURA ROSSI
              </h3>
              
              <div class="flex items-start space-x-3 text-xs text-slate-700">
                <app-icon name="map-pin" size="18" className="text-[#254EB6] shrink-0 mt-0.5"></app-icon>
                <div>
                  <strong class="text-slate-900 block font-bold">Dirección:</strong>
                  Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac, Lima - Perú
                </div>
              </div>

              <div class="flex items-center space-x-3 text-xs text-slate-700">
                <app-icon name="phone" size="18" className="text-[#254EB6] shrink-0"></app-icon>
                <div>
                  <strong class="text-slate-900 font-bold">Teléfono Fijo:</strong> (01) 4815770
                </div>
              </div>

              <div class="flex items-center space-x-3 text-xs text-slate-700">
                <app-icon name="whatsapp" size="18" className="text-emerald-600 shrink-0"></app-icon>
                <div>
                  <strong class="text-slate-900 font-bold">WhatsApp Admisión:</strong> +51 966 057 981
                </div>
              </div>

              <div class="flex items-start space-x-3 text-xs text-slate-700">
                <app-icon name="mail" size="18" className="text-[#254EB6] shrink-0 mt-0.5"></app-icon>
                <div class="space-y-1.5">
                  <strong class="text-slate-900 block font-bold">Correos Oficiales:</strong>
                  <a href="mailto:secretaria@doramayerdezulen.edu.pe" class="text-[#254EB6] hover:text-[#0F296B] font-semibold hover:underline transition-colors flex items-center gap-1.5">
                    <app-icon name="mail" size="13" className="text-[#254EB6] shrink-0"></app-icon>
                    <span>secretaria&#64;doramayerdezulen.edu.pe</span>
                  </a>
                  <a href="mailto:doramayer1957@gmail.com" class="text-[#254EB6] hover:text-[#0F296B] font-semibold hover:underline transition-colors flex items-center gap-1.5">
                    <app-icon name="mail" size="13" className="text-[#254EB6] shrink-0"></app-icon>
                    <span>doramayer1957&#64;gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Mapa Embebido Seguro con Marco Arquitectónico -->
            <div class="rounded-sm border border-[#0F296B]/15 shadow-mayer-soft aspect-video bg-slate-100 overflow-hidden">
              <iframe
                title="Ubicación I.E.P. Dora Mayer de Zulen Rímac"
                src="https://maps.google.com/maps?q=Calle%20Ricardo%20Bentin%20749,%20Rimac,%20Lima&t=&z=16&ie=UTF8&iwloc=&output=embed"
                class="w-full h-full border-0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <!-- Formulario de Contacto Rápido -->
          <div class="lg:col-span-7 bg-white p-5 sm:p-8 rounded-sm border border-[#0F296B]/15 shadow-mayer-soft">
            <div class="border-b border-[#0F296B]/10 pb-3 mb-6">
              <h3 class="text-lg font-bold text-[#0F296B]">Envíanos un Mensaje Directo</h3>
              <p class="text-xs text-slate-500 font-sans">Respuesta garantizada por secretaría en menos de 24 horas.</p>
            </div>

            @if (contactSent()) {
              <div class="p-6 bg-emerald-50 rounded-sm border border-emerald-300 text-center space-y-2 shadow-xs">
                <app-icon name="check-circle" size="32" className="text-emerald-600 mx-auto"></app-icon>
                <div class="font-bold text-sm text-emerald-900">¡Mensaje Enviado con Éxito!</div>
                <div class="text-xs text-emerald-700">Muchas gracias por comunicarte. Nuestro personal de secretaría te contactará a la brevedad.</div>
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onContactSubmit()" class="space-y-4">
                
                <input type="text" formControlName="website" class="hidden" tabindex="-1">

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      formControlName="nombreCompleto"
                      placeholder="Tu nombre y apellido"
                      class="w-full text-xs px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Celular *</label>
                    <input
                      type="tel"
                      formControlName="telefono"
                      placeholder="9XXXXXXXX"
                      class="w-full text-xs px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      formControlName="correoElectronico"
                      placeholder="tu-correo@gmail.com"
                      class="w-full text-xs px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Asunto *</label>
                    <input
                      type="text"
                      formControlName="asunto"
                      placeholder="Consulta de pensión, visita, etc."
                      class="w-full text-xs px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Mensaje *</label>
                  <textarea
                    rows="4"
                    formControlName="mensaje"
                    placeholder="Escribe tu consulta aquí..."
                    class="w-full text-xs p-3.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  [disabled]="contactForm.invalid"
                  class="w-full py-3.5 rounded-sm bg-[#254EB6] hover:bg-[#0F296B] disabled:opacity-50 text-white uppercase font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  Enviar Mensaje a Secretaría
                </button>
              </form>
            }
          </div>

        </div>

        <!-- Barra Inferior Legal & Libro de Reclamaciones -->
        <div class="pt-8 border-t border-[#0F296B]/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-600 text-center md:text-left">
          <div>
            &copy; {{ currentYear }} <strong class="text-[#0F296B]">I.E.P. Dora Mayer de Zulen</strong> · Rímac, Lima, Perú. Todos los derechos reservados.
          </div>

          <div class="flex items-center space-x-6">
            <button
              type="button"
              (click)="openReclamacionesModal.set(true)"
              class="flex items-center space-x-1.5 text-[#254EB6] hover:text-[#0F296B] font-bold transition underline cursor-pointer"
            >
              <span>LIBRO DE RECLAMACIONES VIRTUAL</span>
            </button>
            <span class="text-slate-300">|</span>
            <span>CUMPLIMIENTO LEY N° 29733</span>
          </div>
        </div>

      </div>

      <!-- MODAL LIBRO DE RECLAMACIONES (INDECOPI COMPLIANCE D.S. 011-2011-PCM) -->
      @if (openReclamacionesModal()) {
        <div class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div class="bg-white rounded-sm border border-[#0F296B]/20 max-w-2xl w-[calc(100vw-1.5rem)] sm:w-full p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-mayer-elevated relative my-4 sm:my-8 max-h-[88vh] overflow-y-auto">
            
            <div class="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <h3 class="text-lg font-bold text-[#0F296B]">Libro de Reclamaciones Virtual</h3>
                <p class="text-xs text-slate-500 font-sans">I.E.P. Dora Mayer de Zulen · D.S. N° 011-2011-PCM (Indecopi)</p>
              </div>
              <button
                type="button"
                (click)="openReclamacionesModal.set(false)"
                class="p-1 rounded-sm text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <app-icon name="close" size="20"></app-icon>
              </button>
            </div>

            @if (reclamacionSuccessMsg()) {
              <div class="p-6 bg-emerald-50 rounded-sm border border-emerald-300 space-y-3 text-center shadow-xs">
                <app-icon name="check-circle" size="36" className="text-emerald-600 mx-auto"></app-icon>
                <div class="font-bold text-sm text-emerald-900 uppercase">Hoja de Reclamación Registrada</div>
                <div class="text-xs text-emerald-800 leading-relaxed">{{ reclamacionSuccessMsg() }}</div>
                <button
                  type="button"
                  (click)="openReclamacionesModal.set(false); reclamacionSuccessMsg.set(null)"
                  class="mt-4 px-6 py-2 rounded-sm bg-emerald-700 text-white uppercase font-bold text-xs shadow-xs cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            } @else {
              <form [formGroup]="reclamacionesForm" (ngSubmit)="onReclamacionSubmit()" class="space-y-4">
                
                <input type="text" formControlName="website" class="hidden" tabindex="-1">

                <div class="text-xs font-bold text-[#0F296B] uppercase tracking-wider border-b border-[#0F296B]/15 pb-1">
                  1. Identificación del Consumidor Reclamante
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Nombres *</label>
                    <input type="text" formControlName="reclamanteNombres" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Apellidos *</label>
                    <input type="text" formControlName="reclamanteApellidos" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">DNI / CE *</label>
                    <input type="text" formControlName="reclamanteNumeroDoc" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Celular *</label>
                    <input type="tel" formControlName="reclamanteTelefono" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Correo Electrónico (Donde se enviará la respuesta) *</label>
                  <input type="email" formControlName="reclamanteCorreo" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Domicilio Legal *</label>
                  <input type="text" formControlName="reclamanteDomicilio" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                </div>

                <div class="text-xs font-bold text-[#0F296B] uppercase tracking-wider border-b border-[#0F296B]/15 pb-1 pt-2">
                  2. Detalle de la Reclamación
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                  <label class="p-3 rounded-sm border border-[#0F296B]/20 flex items-center space-x-2 text-xs font-bold uppercase cursor-pointer" [class]="reclamacionesForm.get('tipoAccion')?.value === 'RECLAMO' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-slate-50 text-slate-700'">
                    <input type="radio" value="RECLAMO" formControlName="tipoAccion">
                    <span>Reclamo (Disconformidad)</span>
                  </label>
                  <label class="p-3 rounded-sm border border-[#0F296B]/20 flex items-center space-x-2 text-xs font-bold uppercase cursor-pointer" [class]="reclamacionesForm.get('tipoAccion')?.value === 'QUEJA' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-slate-50 text-slate-700'">
                    <input type="radio" value="QUEJA" formControlName="tipoAccion">
                    <span>Queja (Malestar con atención)</span>
                  </label>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Detalle del Reclamo o Queja *</label>
                  <textarea rows="3" formControlName="detalleReclamacion" class="w-full text-xs p-3 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none"></textarea>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Pedido Concreto del Consumidor *</label>
                  <textarea rows="2" formControlName="pedidoConsumidor" class="w-full text-xs p-3 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none"></textarea>
                </div>

                <label class="flex items-start space-x-2 text-[11px] font-sans text-slate-600">
                  <input type="checkbox" formControlName="aceptaPoliticaDatos" class="mt-0.5 rounded-xs border-slate-400 text-[#254EB6]">
                  <span>Declaro ser el titular del reclamo y autorizo el uso de estos datos exclusivamente para la atención del presente expediente conforme a la Ley N° 29733.</span>
                </label>

                <button
                  type="submit"
                  [disabled]="reclamacionesForm.invalid"
                  class="w-full py-3.5 rounded-sm bg-[#254EB6] hover:bg-[#0F296B] disabled:opacity-50 text-white uppercase font-bold text-xs shadow-sm transition cursor-pointer"
                >
                  Registrar Hoja de Reclamación Formal
                </button>
              </form>
            }

          </div>
        </div>
      }
    </section>
  `
})
export class ContactFooterComponent {
  private fb = inject(FormBuilder);
  private api = inject(PortalApiService);

  currentYear = new Date().getFullYear();
  contactSent = signal<boolean>(false);
  openReclamacionesModal = signal<boolean>(false);
  reclamacionSuccessMsg = signal<string | null>(null);

  contactForm: FormGroup;
  reclamacionesForm: FormGroup;

  constructor() {
    this.contactForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      asunto: ['', [Validators.required, Validators.minLength(3)]],
      mensaje: ['', [Validators.required, Validators.minLength(5)]],
      website: ['']
    });

    this.reclamacionesForm = this.fb.group({
      reclamanteTipoDoc: ['DNI'],
      reclamanteNumeroDoc: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      reclamanteNombres: ['', [Validators.required, Validators.minLength(2)]],
      reclamanteApellidos: ['', [Validators.required, Validators.minLength(2)]],
      reclamanteDomicilio: ['', [Validators.required, Validators.minLength(5)]],
      reclamanteTelefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      reclamanteCorreo: ['', [Validators.required, Validators.email]],
      esMenorEdad: [false],
      tipoBienServicio: ['SERVICIO'],
      descripcionBienServicio: ['Servicio Educativo Escolar'],
      tipoAccion: ['RECLAMO', Validators.required],
      detalleReclamacion: ['', [Validators.required, Validators.minLength(10)]],
      pedidoConsumidor: ['', [Validators.required, Validators.minLength(5)]],
      aceptaPoliticaDatos: [false, Validators.requiredTrue],
      website: ['']
    });
  }

  onContactSubmit() {
    if (this.contactForm.invalid) return;
    this.api.enviarMensajeContacto(this.contactForm.value).subscribe(() => {
      this.contactSent.set(true);
      this.contactForm.reset();
    });
  }

  onReclamacionSubmit() {
    if (this.reclamacionesForm.invalid) return;
    this.api.registrarLibroReclamaciones(this.reclamacionesForm.value).subscribe(res => {
      this.reclamacionSuccessMsg.set(res.message);
      this.reclamacionesForm.reset({
        reclamanteTipoDoc: 'DNI',
        tipoBienServicio: 'SERVICIO',
        tipoAccion: 'RECLAMO',
        esMenorEdad: false,
        descripcionBienServicio: 'Servicio Educativo Escolar',
        aceptaPoliticaDatos: false
      });
    });
  }
}
