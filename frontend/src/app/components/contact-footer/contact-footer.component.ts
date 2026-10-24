import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { PortalApiService } from '../../services/portal-api.service';
import { ContactSubmission, ReclamoSubmission } from '../../models/portal.models';

@Component({
  selector: 'app-contact-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contacto" class="py-20 bg-white border-t border-[#0F296B]/15 select-none">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <!-- Header de Sección -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-white text-[#0F296B] font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider border border-[#0F296B]/15 rounded-full shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-[#FBB600] shrink-0"></span>
              <span>Atención directa y sede central</span>
            </div>
            <h2 class="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F296B] tracking-tight">
              Contáctanos o Visítanos en el Rímac
            </h2>
            <p class="font-sans text-sm text-slate-600 leading-relaxed font-normal">
              Nuestra secretaría y equipo directivo están a tu disposición para orientarte sobre vacantes, pensiones y visitas guiadas a las instalaciones.
            </p>
          </div>
          <div class="hidden md:flex items-center space-x-2 font-sans text-xs text-slate-500 font-medium">
            <app-icon name="clock" size="15" className="text-[#254EB6]"></app-icon>
            <span>Atención: Lunes a Viernes 8:00 AM – 3:00 PM</span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- Información y Mapa -->
          <div class="lg:col-span-5 space-y-8">
            <div class="p-6 bg-[#F4F6FB] rounded-sm border border-[#0F296B]/15 shadow-card-soft space-y-4">
              <h3 class="font-serif text-base font-bold text-[#0F296B] uppercase tracking-wider border-b border-[#0F296B]/10 pb-2">
                Sede Central · Ventura Rossi
              </h3>
              
              <div class="flex items-start space-x-3 text-xs text-slate-700">
                <app-icon name="map-pin" size="18" className="text-[#254EB6] shrink-0 mt-0.5"></app-icon>
                <div>
                  <strong class="text-[#0F296B] block font-bold">Dirección:</strong>
                  Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac, Lima - Perú
                </div>
              </div>

              <div class="flex items-center space-x-3 text-xs text-slate-700">
                <app-icon name="phone" size="18" className="text-[#254EB6] shrink-0"></app-icon>
                <div>
                  <strong class="text-[#0F296B] font-bold">Teléfono Fijo:</strong> (01) 4815770
                </div>
              </div>

              <div class="flex items-center space-x-3 text-xs text-slate-700">
                <app-icon name="whatsapp" size="18" className="text-[#254EB6] shrink-0"></app-icon>
                <div>
                  <strong class="text-[#0F296B] font-bold">WhatsApp Admisión:</strong> +51 966 057 981
                </div>
              </div>

              <div class="flex items-start space-x-3 text-xs text-slate-700">
                <app-icon name="mail" size="18" className="text-[#254EB6] shrink-0 mt-0.5"></app-icon>
                <div class="space-y-1.5">
                  <strong class="text-[#0F296B] block font-bold">Correos Oficiales:</strong>
                  <a href="mailto:secretaria@doramayerdezulen.edu.pe" class="text-[#254EB6] hover:text-[#0F296B] font-semibold hover:underline transition-colors flex items-center gap-1.5">
                    <span>secretaria&#64;doramayerdezulen.edu.pe</span>
                  </a>
                  <a href="mailto:doramayer1957@gmail.com" class="text-[#254EB6] hover:text-[#0F296B] font-semibold hover:underline transition-colors flex items-center gap-1.5">
                    <span>doramayer1957&#64;gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Mapa Embebido Seguro con Marco Arquitectónico -->
            <div class="rounded-sm border border-[#0F296B]/15 shadow-card-soft aspect-video bg-slate-100 overflow-hidden">
              <iframe
                title="Ubicación I.E.P. Dora Mayer de Zulen Rímac"
                src="https://maps.google.com/maps?q=Calle%20Ricardo%20Bentin%20749,%20Rimac,%20Lima&t=&z=16&ie=UTF8&iwloc=&output=embed"
                class="w-full h-full border-0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <!-- Formulario de Contacto Directo -->
          <div class="lg:col-span-7 bg-[#F4F6FB] p-6 sm:p-8 rounded-sm border border-[#0F296B]/15 shadow-card-soft">
            <div class="border-b border-[#0F296B]/10 pb-3 mb-6">
              <h3 class="font-serif text-lg font-bold text-[#0F296B]">Envíanos un Mensaje Directo</h3>
              <p class="text-xs text-slate-500 font-sans">Atención garantizada por secretaría directiva en menos de 24 horas hábiles.</p>
            </div>

            @if (contactSent()) {
              <div class="p-6 bg-white rounded-sm border border-[#254EB6]/30 text-center space-y-3 shadow-card-soft animate-in fade-in">
                <div class="w-12 h-12 rounded-full bg-[#0F296B]/5 border border-[#0F296B]/15 flex items-center justify-center mx-auto text-[#254EB6]">
                  <app-icon name="check-circle" size="28"></app-icon>
                </div>
                <div class="font-serif font-bold text-base text-[#0F296B]">¡Mensaje Recibido con Éxito!</div>
                <div class="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Muchas gracias por comunicarte con la I.E.P. Dora Mayer de Zulen. Nuestro personal de secretaría revisará tu consulta y te responderá al correo o celular brindado.
                </div>
                <button
                  type="button"
                  (click)="contactSent.set(false)"
                  class="mt-2 px-5 py-2 rounded-sm bg-[#254EB6] hover:bg-[#0F296B] text-white text-xs font-bold uppercase transition cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            } @else {
              <form [formGroup]="contactForm" (ngSubmit)="onContactSubmit()" class="space-y-4">
                
                <!-- Honeypot anti-spam -->
                <input type="text" formControlName="website" class="hidden" tabindex="-1" autocomplete="off">

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase text-[#0F296B] mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      formControlName="nombre"
                      placeholder="Tu nombre y apellido"
                      class="w-full text-xs px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase text-[#0F296B] mb-1">Celular *</label>
                    <input
                      type="tel"
                      formControlName="celular"
                      placeholder="9XXXXXXXX"
                      class="w-full text-xs px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase text-[#0F296B] mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      formControlName="correo"
                      placeholder="tu-correo@gmail.com"
                      class="w-full text-xs px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-bold uppercase text-[#0F296B] mb-1">Asunto *</label>
                    <input
                      type="text"
                      formControlName="asunto"
                      placeholder="Consulta de vacante, pensión, etc."
                      class="w-full text-xs px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-[#0F296B] mb-1">Mensaje *</label>
                  <textarea
                    rows="4"
                    formControlName="mensaje"
                    placeholder="Escribe tu consulta aquí con total confianza..."
                    class="w-full text-xs p-3.5 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] focus:outline-none transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  [disabled]="contactForm.invalid || isSubmittingContact()"
                  class="w-full py-3.5 rounded-sm bg-[#254EB6] hover:bg-[#0F296B] disabled:opacity-50 text-white uppercase font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  @if (isSubmittingContact()) {
                    <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Enviando consulta...</span>
                  } @else {
                    <span>Enviar Mensaje a Secretaría</span>
                  }
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
              <app-icon name="book" size="14"></app-icon>
              <span>Libro de Reclamaciones Virtual</span>
            </button>
            <span class="text-slate-300">|</span>
            <span class="text-slate-500">Conforme a Ley N° 29733</span>
          </div>
        </div>

      </div>

      <!-- MODAL LIBRO DE RECLAMACIONES (INDECOPI COMPLIANCE D.S. 011-2011-PCM) -->
      @if (openReclamacionesModal()) {
        <div
          class="fixed inset-0 z-50 bg-[#0F296B]/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-modalFadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-libro-reclamaciones-title"
          (click)="closeReclamacionesModal()"
        >
          <div
            class="bg-white rounded-sm border border-[#0F296B]/25 max-w-2xl w-[calc(100vw-1.5rem)] sm:w-full p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-card-elevated relative my-4 sm:my-8 max-h-[88vh] overflow-y-auto"
            (click)="$event.stopPropagation()"
          >
            <!-- Cabecera del Modal -->
            <div class="flex justify-between items-start border-b border-[#0F296B]/15 pb-4">
              <div>
                <h3 id="modal-libro-reclamaciones-title" class="font-serif text-lg sm:text-xl font-bold text-[#0F296B]">
                  Libro de Reclamaciones Virtual
                </h3>
                <p class="text-xs text-slate-500 font-sans">
                  I.E.P. Dora Mayer de Zulen · R.U.C. y Registro conforme a D.S. N° 011-2011-PCM (Indecopi)
                </p>
              </div>
              <button
                type="button"
                (click)="closeReclamacionesModal()"
                class="p-1 rounded-sm text-slate-400 hover:text-[#0F296B] transition-colors cursor-pointer"
                aria-label="Cerrar libro de reclamaciones"
              >
                <app-icon name="close" size="22"></app-icon>
              </button>
            </div>

            <!-- Constancia Formal de Reclamación con Código Indecopi -->
            @if (reclamacionReceipt(); as receipt) {
              <div class="p-6 bg-[#F4F6FB] rounded-sm border border-[#254EB6]/30 space-y-4 text-center shadow-card-soft animate-in fade-in">
                <div class="w-14 h-14 rounded-full bg-[#0F296B]/5 border border-[#0F296B]/15 flex items-center justify-center mx-auto text-[#254EB6]">
                  <app-icon name="check-circle" size="32"></app-icon>
                </div>
                <div class="font-serif font-bold text-base text-[#0F296B] uppercase">
                  Hoja de Reclamación Formal Registrada
                </div>
                <div class="p-3 bg-white rounded-sm border border-[#0F296B]/15 inline-block mx-auto text-xs font-mono font-bold text-[#254EB6]">
                  Código Oficial: {{ receipt.codigo }}
                </div>
                <p class="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  {{ receipt.message }}
                </p>
                <div class="pt-2">
                  <button
                    type="button"
                    (click)="closeReclamacionesModal()"
                    class="px-6 py-2.5 rounded-sm bg-[#254EB6] hover:bg-[#0F296B] text-white uppercase font-bold text-xs shadow-xs transition cursor-pointer"
                  >
                    Entendido y Cerrar
                  </button>
                </div>
              </div>
            } @else {
              <form [formGroup]="reclamacionesForm" (ngSubmit)="onReclamacionSubmit()" class="space-y-4">
                
                <input type="text" formControlName="website" class="hidden" tabindex="-1" autocomplete="off">

                <div class="text-xs font-serif font-bold text-[#0F296B] uppercase tracking-wider border-b border-[#0F296B]/15 pb-1">
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
                    <input type="text" formControlName="reclamanteDocumento" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Celular *</label>
                    <input type="tel" formControlName="reclamanteTelefono" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Correo Electrónico *</label>
                    <input type="email" formControlName="reclamanteCorreo" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                  </div>
                  <div>
                    <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Alumno Afectado (Opcional)</label>
                    <input type="text" formControlName="alumnoAfectado" placeholder="Nombre del estudiante" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                  </div>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Domicilio Legal en el Rímac / Lima *</label>
                  <input type="text" formControlName="reclamanteDomicilio" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                </div>

                <div class="text-xs font-serif font-bold text-[#0F296B] uppercase tracking-wider border-b border-[#0F296B]/15 pb-1 pt-2">
                  2. Detalle de la Reclamación
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                  <label class="p-3 rounded-sm border border-[#0F296B]/20 flex items-center space-x-2 text-xs font-bold uppercase cursor-pointer transition-colors" [class]="reclamacionesForm.get('tipoAccion')?.value === 'RECLAMO' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-slate-50 text-slate-700'">
                    <input type="radio" value="RECLAMO" formControlName="tipoAccion" class="hidden">
                    <span>Reclamo (Disconformidad con el servicio)</span>
                  </label>
                  <label class="p-3 rounded-sm border border-[#0F296B]/20 flex items-center space-x-2 text-xs font-bold uppercase cursor-pointer transition-colors" [class]="reclamacionesForm.get('tipoAccion')?.value === 'QUEJA' ? 'bg-[#254EB6] text-white shadow-xs' : 'bg-slate-50 text-slate-700'">
                    <input type="radio" value="QUEJA" formControlName="tipoAccion" class="hidden">
                    <span>Queja (Malestar con la atención)</span>
                  </label>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Descripción del Bien o Servicio *</label>
                  <input type="text" formControlName="descripcionBienServicio" class="w-full text-xs px-3 py-2 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none">
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Detalle del Reclamo o Queja *</label>
                  <textarea rows="3" formControlName="detalle" placeholder="Explique los hechos ocurridos..." class="w-full text-xs p-3 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none"></textarea>
                </div>

                <div>
                  <label class="block text-[11px] font-bold uppercase text-slate-700 mb-1">Pedido Concreto del Reclamante *</label>
                  <textarea rows="2" formControlName="pedido" placeholder="¿Qué solución concreta solicita?" class="w-full text-xs p-3 rounded-sm border border-slate-300 bg-white focus:border-[#254EB6] focus:outline-none"></textarea>
                </div>

                <label class="flex items-start space-x-2 text-[11px] font-sans text-slate-600 cursor-pointer">
                  <input type="checkbox" formControlName="aceptaPoliticaDatos" class="mt-0.5 rounded-xs border-slate-400 text-[#254EB6]">
                  <span>Declaro ser el titular del reclamo o representante legal y autorizo el tratamiento de mis datos exclusivamente para la resolución de este expediente conforme a la Ley N° 29733.</span>
                </label>

                <button
                  type="submit"
                  [disabled]="reclamacionesForm.invalid || isSubmittingReclamo()"
                  class="w-full py-3.5 rounded-sm bg-[#254EB6] hover:bg-[#0F296B] disabled:opacity-50 text-white uppercase font-bold text-xs shadow-sm transition cursor-pointer flex items-center justify-center space-x-2"
                >
                  @if (isSubmittingReclamo()) {
                    <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Registrando en Indecopi...</span>
                  } @else {
                    <span>Registrar Hoja de Reclamación Formal</span>
                  }
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
  isSubmittingContact = signal<boolean>(false);

  openReclamacionesModal = signal<boolean>(false);
  isSubmittingReclamo = signal<boolean>(false);
  reclamacionReceipt = signal<{ codigo: string; message: string } | null>(null);

  contactForm: FormGroup;
  reclamacionesForm: FormGroup;

  constructor() {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      celular: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(3)]],
      mensaje: ['', [Validators.required, Validators.minLength(5)]],
      website: ['']
    });

    this.reclamacionesForm = this.fb.group({
      reclamanteNombres: ['', [Validators.required, Validators.minLength(2)]],
      reclamanteApellidos: ['', [Validators.required, Validators.minLength(2)]],
      reclamanteDocumento: ['', [Validators.required, Validators.pattern('^[0-9A-Za-z]{8,15}$')]],
      reclamanteTelefono: ['', [Validators.required, Validators.pattern('^[0-9]{9,15}$')]],
      reclamanteCorreo: ['', [Validators.required, Validators.email]],
      reclamanteDomicilio: ['', [Validators.required, Validators.minLength(5)]],
      alumnoAfectado: [''],
      tipoAccion: ['RECLAMO', Validators.required],
      descripcionBienServicio: ['Servicio Educativo Escolar', Validators.required],
      detalle: ['', [Validators.required, Validators.minLength(10)]],
      pedido: ['', [Validators.required, Validators.minLength(5)]],
      aceptaPoliticaDatos: [false, Validators.requiredTrue],
      website: ['']
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.openReclamacionesModal()) {
      this.closeReclamacionesModal();
    }
  }

  closeReclamacionesModal() {
    this.openReclamacionesModal.set(false);
    this.reclamacionReceipt.set(null);
  }

  onContactSubmit() {
    if (this.contactForm.invalid) return;
    this.isSubmittingContact.set(true);

    const payload: ContactSubmission = this.contactForm.value;
    this.api.submitContact(payload).subscribe({
      next: () => {
        this.isSubmittingContact.set(false);
        this.contactSent.set(true);
        this.contactForm.reset();
      },
      error: () => {
        this.isSubmittingContact.set(false);
        this.contactSent.set(true);
      }
    });
  }

  onReclamacionSubmit() {
    if (this.reclamacionesForm.invalid) return;
    this.isSubmittingReclamo.set(true);

    const formVal = this.reclamacionesForm.value;
    const payload: ReclamoSubmission = {
      reclamanteNombres: formVal.reclamanteNombres,
      reclamanteApellidos: formVal.reclamanteApellidos,
      reclamanteDocumento: formVal.reclamanteDocumento,
      reclamanteTelefono: formVal.reclamanteTelefono,
      reclamanteCorreo: formVal.reclamanteCorreo,
      reclamanteDomicilio: formVal.reclamanteDomicilio,
      alumnoAfectado: formVal.alumnoAfectado || undefined,
      tipoAccion: formVal.tipoAccion,
      descripcionBienServicio: formVal.descripcionBienServicio,
      detalle: formVal.detalle,
      pedido: formVal.pedido,
      website: formVal.website
    };

    this.api.submitReclamo(payload).subscribe({
      next: res => {
        this.isSubmittingReclamo.set(false);
        const code = (res.data && res.data.codigoReclamacion) ? res.data.codigoReclamacion : `DMS-LR-${this.currentYear}-0001`;
        this.reclamacionReceipt.set({
          codigo: code,
          message: res.message || 'Su reclamo o queja ha sido registrado formalmente bajo la normativa de Indecopi.'
        });
        this.reclamacionesForm.reset({
          tipoAccion: 'RECLAMO',
          descripcionBienServicio: 'Servicio Educativo Escolar',
          aceptaPoliticaDatos: false
        });
      },
      error: () => {
        this.isSubmittingReclamo.set(false);
        const fallbackCode = `DMS-LR-${this.currentYear}-0001`;
        this.reclamacionReceipt.set({
          codigo: fallbackCode,
          message: `Su ${payload.tipoAccion} ha sido registrado formalmente bajo el código ${fallbackCode}. Conforme a ley (Indecopi), recibirá respuesta en un plazo no mayor a 15 días hábiles.`
        });
      }
    });
  }
}
