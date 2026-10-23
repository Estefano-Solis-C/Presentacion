import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { PortalApiService } from '../../services/portal-api.service';
import { I18nService } from '../../services/i18n.service';

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

export interface HeroSlide {
  banner: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="matricula" class="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#0F296B]/15">
      
      <!-- Fondo Fotográfico con Carrusel Rotacional Nítido -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        @for (slide of heroSlides; track slide.banner; let idx = $index) {
          <img
            [src]="slide.banner"
            alt=""
            aria-hidden="true"
            class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out"
            [class.opacity-100]="currentBgIndex() === idx"
            [class.opacity-0]="currentBgIndex() !== idx"
          />
        }
        <!-- Overlay Institucional Dual-Blue de Alto Contraste -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#0F296B]/60 via-[#0F296B]/75 to-[#0F296B]/95 pointer-events-none"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <!-- COLUMNA IZQUIERDA: Propuesta de Valor & Mascota Oficial -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Badge de Prestigio Institucional con Fondo Translúcido -->
            <div class="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider shadow-sm max-w-full">
              <span class="w-2.5 h-2.5 rounded-full bg-[#FBB600] animate-pulse shrink-0"></span>
              <span class="sm:hidden font-sans font-extrabold text-[11px]">65 AÑOS DE EXCELENCIA · RÍMAC</span>
              <span class="hidden sm:inline font-sans font-bold">+65 AÑOS DE EXCELENCIA EN EL RÍMAC · FUNDADO EN 1957</span>
            </div>

            <!-- Titular Dinámico de Alto Impacto Nítido (Zero CLS con min-height) -->
            <div class="min-h-[58px] sm:min-h-[88px] flex items-center">
              <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] drop-shadow-sm transition-opacity duration-300">
                {{ currentSlide().title }}
              </h1>
            </div>

            <div class="min-h-[38px] sm:min-h-[48px] flex items-center">
              <p class="text-sm sm:text-base lg:text-lg text-[#FBB600] font-bold leading-snug transition-opacity duration-300">
                {{ currentSlide().subtitle }}
              </p>
            </div>

            <!-- Descripción Institucional Verbatim Oficial -->
            <p class="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed font-normal">
              Ofrecemos un servicio educativo, que propicia la búsqueda de la eficiencia académica, desarrollando sus competencias, capacidades, habilidades y destrezas que les permita responder al mundo globalizado y construir una sociedad solidaria y justa.
            </p>

            <!-- 3 Beneficios Reales en Tarjetas Blancas Refinadas (Zero Truncamiento) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
              <div class="p-3 bg-white/95 backdrop-blur-sm rounded-sm border border-[#0F296B]/15 shadow-mayer-soft flex items-start sm:items-center space-x-2.5 min-h-[72px]">
                <div class="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-50 rounded-sm flex items-center justify-center text-emerald-700 shrink-0">
                  <app-icon name="heart" size="18"></app-icon>
                </div>
                <div class="min-w-0">
                  <div class="font-extrabold text-[#0F296B] uppercase tracking-tight text-[11px] sm:text-xs leading-tight">Atención Psicológica</div>
                  <div class="text-slate-600 font-medium text-[10px] sm:text-[11px] leading-snug mt-0.5">Talleres y charlas continuas</div>
                </div>
              </div>

              <div class="p-3 bg-white/95 backdrop-blur-sm rounded-sm border border-[#0F296B]/15 shadow-mayer-soft flex items-start sm:items-center space-x-2.5 min-h-[72px]">
                <div class="w-8 h-8 sm:w-9 sm:h-9 bg-amber-50 rounded-sm flex items-center justify-center text-amber-700 shrink-0">
                  <app-icon name="palette" size="18"></app-icon>
                </div>
                <div class="min-w-0">
                  <div class="font-extrabold text-[#0F296B] uppercase tracking-tight text-[11px] sm:text-xs leading-tight">Herramientas Lúdicas</div>
                  <div class="text-slate-600 font-medium text-[10px] sm:text-[11px] leading-snug mt-0.5">Clases dinámicas y activas</div>
                </div>
              </div>

              <div class="p-3 bg-white/95 backdrop-blur-sm rounded-sm border border-[#0F296B]/15 shadow-mayer-soft flex items-start sm:items-center space-x-2.5 min-h-[72px]">
                <div class="w-8 h-8 sm:w-9 sm:h-9 bg-[#254EB6]/10 rounded-sm flex items-center justify-center text-[#254EB6] shrink-0">
                  <app-icon name="book" size="18"></app-icon>
                </div>
                <div class="min-w-0">
                  <div class="font-extrabold text-[#0F296B] uppercase tracking-tight text-[11px] sm:text-xs leading-tight">Tareas en Clase</div>
                  <div class="text-slate-600 font-medium text-[10px] sm:text-[11px] leading-snug mt-0.5">Desarrolladas con el profesor</div>
                </div>
              </div>
            </div>

            <!-- Marco Vectorial del Patrimonio Institucional -->
            <div class="pt-1 flex items-center space-x-3 sm:space-x-4 bg-white/95 backdrop-blur-sm p-4 rounded-sm border border-[#0F296B]/15 shadow-mayer-soft">
              <img
                src="/images/insignia.png"
                alt="Insignia Mayerina"
                class="w-10 h-10 sm:w-14 sm:h-14 object-contain filter drop-shadow shrink-0"
              />
              <div class="text-xs text-slate-700 min-w-0">
                <strong class="text-[#0F296B] font-black block text-xs sm:text-sm tracking-tight truncate">I.E.P. Dora Mayer de Zulen</strong>
                <span class="line-clamp-2 sm:line-clamp-none text-[11px] sm:text-xs leading-snug text-slate-600">Fundado en 1957 por el Prof. Paulino Lapa y la Sra. Yolanda Salinas. Lema histórico: Estudio, Trabajo y Amistad.</span>
              </div>
            </div>

            <!-- Indicadores Discretos del Carrusel de Fondo -->
            <div class="flex items-center space-x-2 pt-1" role="tablist" aria-label="Controles del carrusel">
              @for (slide of heroSlides; track slide.banner; let bIdx = $index) {
                <button
                  type="button"
                  (click)="setBgIndex(bIdx)"
                  [class]="currentBgIndex() === bIdx ? 'w-6 bg-[#FBB600]' : 'w-2 bg-white/40 hover:bg-white/70'"
                  class="h-1.5 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer"
                  [attr.aria-label]="'Slide ' + (bIdx + 1)"
                ></button>
              }
            </div>

          </div>

          <!-- COLUMNA DERECHA: Pasarela Interactiva de Admisión (Zero CLS Card) -->
          <div class="lg:col-span-5">
            <div class="bg-white rounded-sm shadow-mayer-elevated border border-[#0F296B]/15 overflow-hidden">
              
              <!-- Pestañas Interactivas (3 Modos Suaves) -->
              <div class="grid grid-cols-3 bg-slate-100/80 p-1.5 text-xs font-bold border-b border-[#0F296B]/10 gap-1.5">
                <button
                  type="button"
                  (click)="setTab('NUEVO')"
                  [class]="activeTab() === 'NUEVO'
                    ? 'bg-[#254EB6] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white hover:text-[#0F296B]'"
                  class="py-2.5 px-2 rounded-xs font-sans font-bold transition-all uppercase tracking-tight text-[11px] sm:text-xs text-center cursor-pointer"
                >
                  <span class="sm:hidden">NUEVO</span>
                  <span class="hidden sm:inline">{{ i18n.t('admission.tabNuevo') }}</span>
                </button>
                <button
                  type="button"
                  (click)="setTab('MAYERINO')"
                  [class]="activeTab() === 'MAYERINO'
                    ? 'bg-[#254EB6] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white hover:text-[#0F296B]'"
                  class="py-2.5 px-2 rounded-xs font-sans font-bold transition-all uppercase tracking-tight text-[11px] sm:text-xs text-center cursor-pointer"
                >
                  <span class="sm:hidden">MAYERINO</span>
                  <span class="hidden sm:inline">{{ i18n.t('admission.tabMayerino') }}</span>
                </button>
                <button
                  type="button"
                  (click)="setTab('VACACIONES')"
                  [class]="activeTab() === 'VACACIONES'
                    ? 'bg-[#254EB6] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white hover:text-[#0F296B]'"
                  class="py-2.5 px-2 rounded-xs font-sans font-bold transition-all uppercase tracking-tight text-[11px] sm:text-xs text-center cursor-pointer"
                >
                  <span class="sm:hidden">VACACIONES</span>
                  <span class="hidden sm:inline">{{ i18n.t('admission.tabVacaciones') }}</span>
                </button>
              </div>

              <!-- Contenido del Formulario (Contenedor con Altura Fija y Cero Saltos) -->
              <div class="p-5 sm:p-7 min-h-[520px] flex flex-col justify-between">
                
                @if (submittedSuccess()) {
                  <div class="text-center py-8 space-y-4 my-auto">
                    <div class="w-16 h-16 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                      <app-icon name="check-circle" size="36"></app-icon>
                    </div>
                    <h3 class="text-xl font-black text-[#0F296B] tracking-tight">{{ i18n.t('admission.successTitle') }}</h3>
                    <p class="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto font-medium">
                      {{ i18n.t('admission.successDesc') }}
                    </p>
                    @if (whatsappLink()) {
                      <a
                        [href]="whatsappLink()"
                        target="_blank"
                        rel="noopener"
                        class="inline-flex items-center space-x-2 px-6 py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all"
                      >
                        <app-icon name="whatsapp" size="20"></app-icon>
                        <span>{{ i18n.t('admission.whatsappAction') }}</span>
                      </a>
                    }
                    <button
                      type="button"
                      (click)="resetForm()"
                      class="block mx-auto text-xs text-[#254EB6] hover:underline pt-2 font-bold tracking-tight uppercase cursor-pointer"
                    >
                      {{ i18n.t('admission.anotherAction') }}
                    </button>
                  </div>
                } @else {
                  
                  <!-- Cabecera de Altura Fija (52px) para Evitar Saltos al Cambiar Pestañas -->
                  <div class="border-b border-slate-100 pb-2 h-[52px] flex flex-col justify-center">
                    <h2 class="text-sm sm:text-[15px] font-black text-[#0F296B] uppercase tracking-tight leading-none whitespace-nowrap truncate">
                      @if (activeTab() === 'NUEVO') { POSTULACIÓN PARA ALUMNO NUEVO 2026 / 2027 }
                      @if (activeTab() === 'MAYERINO') { RATIFICACIÓN DE MATRÍCULA 2026 }
                      @if (activeTab() === 'VACACIONES') { TALLERES DE VACACIONES ÚTILES 2026 }
                    </h2>
                    <p class="text-xs text-slate-600 font-medium mt-1 truncate">{{ i18n.t('admission.subtitle') }}</p>
                  </div>

                  <form [formGroup]="leadForm" (ngSubmit)="onSubmit()" class="space-y-2 pt-2" novalidate>
                    
                    <input type="text" formControlName="website" class="hidden" tabindex="-1" autocomplete="off">

                    <!-- Fila 1: Datos del Apoderado -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">NOMBRES APODERADO *</label>
                        <input
                          type="text"
                          formControlName="apoderadoNombres"
                          placeholder="Ej: Carmen Rosa"
                          [class]="getInputClasses('apoderadoNombres')"
                        />
                        <div class="h-4 mt-0.5 flex items-center">
                          @if (isFieldInvalid('apoderadoNombres')) {
                            <span class="text-[10px] leading-none text-red-600 font-semibold truncate">Ingrese al menos 2 caracteres</span>
                          }
                        </div>
                      </div>
                      <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">APELLIDOS APODERADO *</label>
                        <input
                          type="text"
                          formControlName="apoderadoApellidos"
                          placeholder="Ej: Lapa Salinas"
                          [class]="getInputClasses('apoderadoApellidos')"
                        />
                        <div class="h-4 mt-0.5 flex items-center">
                          @if (isFieldInvalid('apoderadoApellidos')) {
                            <span class="text-[10px] leading-none text-red-600 font-semibold truncate">Ingrese al menos 2 caracteres</span>
                          }
                        </div>
                      </div>
                    </div>

                    <!-- Fila 2: Documento y Celular con Filtro Numérico Estricto -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">DNI / CE APODERADO *</label>
                        <input
                          type="text"
                          inputmode="numeric"
                          maxlength="8"
                          formControlName="numeroDocumento"
                          (input)="onNumericInput($event, 'numeroDocumento', 8)"
                          (keypress)="allowDigitsOnly($event)"
                          placeholder="8 dígitos (DNI)"
                          [class]="getInputClasses('numeroDocumento')"
                        />
                        <div class="h-4 mt-0.5 flex items-center">
                          @if (isFieldInvalid('numeroDocumento')) {
                            <span class="text-[10px] leading-none text-red-600 font-semibold truncate">Ingrese un DNI válido de 8 dígitos</span>
                          }
                        </div>
                      </div>
                      <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">CELULAR WHATSAPP *</label>
                        <input
                          type="tel"
                          inputmode="numeric"
                          maxlength="9"
                          formControlName="telefonoContacto"
                          (input)="onNumericInput($event, 'telefonoContacto', 9)"
                          (keypress)="allowDigitsOnly($event)"
                          placeholder="9XXXXXXXX"
                          [class]="getInputClasses('telefonoContacto')"
                        />
                        <div class="h-4 mt-0.5 flex items-center">
                          @if (isFieldInvalid('telefonoContacto')) {
                            <span class="text-[10px] leading-none text-red-600 font-semibold truncate">Ingrese 9 dígitos iniciando con 9</span>
                          }
                        </div>
                      </div>
                    </div>

                    <!-- Fila 3: Correo Electrónico -->
                    <div>
                      <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">CORREO ELECTRÓNICO *</label>
                      <input
                        type="email"
                        formControlName="correoElectronico"
                        placeholder="apoderado@gmail.com"
                        [class]="getInputClasses('correoElectronico')"
                      />
                      <div class="h-4 mt-0.5 flex items-center">
                        @if (isFieldInvalid('correoElectronico')) {
                          <span class="text-[10px] leading-none text-red-600 font-semibold truncate">Ingrese un correo electrónico válido</span>
                        }
                      </div>
                    </div>

                    <!-- Fila 4: Alumno y Nivel (100% Alineados Horizontalmente) -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label class="whitespace-nowrap truncate block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">NOMBRE DEL ALUMNO *</label>
                        <input
                          type="text"
                          formControlName="alumnoNombres"
                          placeholder="Nombres completos"
                          [class]="getInputClasses('alumnoNombres')"
                        />
                        <div class="h-4 mt-0.5 flex items-center">
                          @if (isFieldInvalid('alumnoNombres')) {
                            <span class="text-[10px] leading-none text-red-600 font-semibold truncate">Ingrese el nombre del alumno</span>
                          }
                        </div>
                      </div>

                      @if (activeTab() !== 'VACACIONES') {
                        <div>
                          <label class="whitespace-nowrap truncate block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">NIVEL EDUCATIVO *</label>
                          <select
                            formControlName="nivelAcademico"
                            (change)="onNivelChange()"
                            [class]="getInputClasses('nivelAcademico')"
                          >
                            <option value="INICIAL">Inicial (3, 4 y 5 años)</option>
                            <option value="PRIMARIA">Primaria (1° a 6°)</option>
                            <option value="SECUNDARIA">Secundaria (1° a 5°)</option>
                          </select>
                          <div class="h-4 mt-0.5 flex items-center"></div>
                        </div>
                      } @else {
                        <div>
                          <label class="whitespace-nowrap truncate block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">TALLER DE VERANO *</label>
                          <select
                            formControlName="tallerSeleccionado"
                            [class]="getInputClasses('tallerSeleccionado')"
                          >
                            <option value="Danzas Folklóricas">Danzas Folklóricas</option>
                            <option value="Refuerzo Académico">Refuerzo Académico</option>
                            <option value="Cómputo e Informática">Cómputo e Informática</option>
                            <option value="Deportes y Fútbol">Deportes y Fútbol</option>
                            <option value="Dibujo y Pintura">Dibujo y Pintura</option>
                          </select>
                          <div class="h-4 mt-0.5 flex items-center"></div>
                        </div>
                      }
                    </div>

                    <!-- Fila 5: Grado de Ingreso o Turno Preferido -->
                    @if (activeTab() !== 'VACACIONES') {
                      <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">GRADO AL QUE POSTULA *</label>
                        <select
                          formControlName="gradoIngreso"
                          [class]="getInputClasses('gradoIngreso')"
                        >
                          @for (grado of gradosDisponibles(); track grado) {
                            <option [value]="grado">{{ grado }}</option>
                          }
                        </select>
                        <div class="h-4 mt-0.5 flex items-center"></div>
                      </div>
                    } @else {
                      <div>
                        <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">TURNO DE VERANO *</label>
                        <select
                          formControlName="turnoPreferido"
                          [class]="getInputClasses('turnoPreferido')"
                        >
                          <option value="Turno Mañana (8:30 am - 12:30 pm)">Turno Mañana (8:30 am - 12:30 pm)</option>
                          <option value="Turno Tarde (2:00 pm - 5:30 pm)">Turno Tarde (2:00 pm - 5:30 pm)</option>
                        </select>
                        <div class="h-4 mt-0.5 flex items-center"></div>
                      </div>
                    }

                    <!-- Casillas Ley N° 29733 (Protección de Datos Personales) con Pre-reserva Zero CLS -->
                    <div class="pt-0.5 space-y-1">
                      <div>
                        <label class="flex items-start space-x-2.5 text-xs text-slate-700 cursor-pointer font-medium leading-snug">
                          <input
                            type="checkbox"
                            formControlName="aceptaPoliticaDatos"
                            class="mt-0.5 rounded-xs border-slate-400 text-[#254EB6] focus:ring-0"
                          />
                          <span>{{ i18n.t('admission.ley29733Checkbox') }}</span>
                        </label>
                        <div class="h-4 mt-0.5 flex items-center pl-6">
                          @if (isFieldInvalid('aceptaPoliticaDatos')) {
                            <span class="text-[10px] leading-none text-red-600 font-semibold truncate">Debe aceptar la política de protección de datos</span>
                          }
                        </div>
                      </div>

                      <div>
                        <label class="flex items-start space-x-2.5 text-xs text-slate-700 cursor-pointer font-medium leading-snug">
                          <input
                            type="checkbox"
                            formControlName="aceptaTerminos"
                            class="mt-0.5 rounded-xs border-slate-400 text-[#254EB6] focus:ring-0"
                          />
                          <span>Acepto los términos de postulación y el reglamento del proceso de admisión 2026 / 2027.</span>
                        </label>
                        <div class="h-4 mt-0.5 flex items-center pl-6">
                          @if (isFieldInvalid('aceptaTerminos')) {
                            <span class="text-[10px] leading-none text-red-600 font-semibold truncate">Debe aceptar los términos del proceso</span>
                          }
                        </div>
                      </div>
                    </div>

                    <!-- Botón de Envío con Handoff a WhatsApp -->
                    <button
                      type="submit"
                      [disabled]="isSubmitting()"
                      class="w-full py-3.5 px-4 rounded-sm bg-[#254EB6] hover:bg-[#0F296B] active:bg-[#091A43] disabled:opacity-50 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      @if (isSubmitting()) {
                        <span>{{ i18n.t('admission.submitting') }}</span>
                      } @else {
                        <span>{{ i18n.t('admission.submitBtn') }}</span>
                        <app-icon name="arrow-right" size="18" className="text-[#FBB600]"></app-icon>
                      }
                    </button>

                    <!-- Pie de Seguridad con Icono Lock Vectorial (Cero Emojis) -->
                    <div class="text-[10px] text-center text-slate-500 font-medium tracking-wide flex items-center justify-center space-x-1.5 pt-0.5">
                      <app-icon name="lock" size="13" className="text-[#254EB6] shrink-0"></app-icon>
                      <span>Sus datos están protegidos conforme a la Ley N° 29733. Cero spam.</span>
                    </div>

                  </form>
                }
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  private fb = inject(FormBuilder);
  private api = inject(PortalApiService);

  activeTab = signal<'NUEVO' | 'MAYERINO' | 'VACACIONES'>('NUEVO');
  isSubmitting = signal<boolean>(false);
  submittedSuccess = signal<boolean>(false);
  whatsappLink = signal<string | null>(null);

  // Carrusel Rotacional Auténtico de Fondo con 6 Slides Verbatim
  readonly heroSlides: HeroSlide[] = [
    {
      banner: '/images/banners/banner_001.jpg',
      title: '¡Bienvenidos Alumnos Mayerinos!',
      subtitle: 'Contamos con 65 años al servicio de la niñez y juventud Rimense.'
    },
    {
      banner: '/images/banners/banner_002.jpg',
      title: 'I.E.P. Dora Mayer de Zulen',
      subtitle: 'Les damos la bienvenida y les abrimos las puertas a los estudiantes de los niveles Inicial, Primaria y Secundaria.'
    },
    {
      banner: '/images/banners/banner_003.jpg',
      title: '¡Rumbo a la Calidad Educativa!',
      subtitle: 'Fomentamos la práctica de valores y normas de convivencia para forjar un futuro mejor.'
    },
    {
      banner: '/images/banners/foto_inicial_1.jpeg',
      title: '¡Bienvenidos Alumnos Mayerinos!',
      subtitle: 'Contamos con 65 años al servicio de la niñez y juventud Rimense.'
    },
    {
      banner: '/images/banners/foto_primaria_1.jpeg',
      title: 'I.E.P. Dora Mayer de Zulen',
      subtitle: 'Les damos la bienvenida y les abrimos las puertas a los estudiantes de los niveles Inicial, Primaria y Secundaria.'
    },
    {
      banner: '/images/banners/foto_secundaria_1.jpeg',
      title: '¡Rumbo a la Calidad Educativa!',
      subtitle: 'Fomentamos la práctica de valores y normas de convivencia para forjar un futuro mejor.'
    }
  ];

  readonly heroBanners = this.heroSlides.map(s => s.banner);
  currentBgIndex = signal<number>(0);
  currentSlide = computed(() => this.heroSlides[this.currentBgIndex() % this.heroSlides.length]);
  private bgTimer: any = null;

  // Estado reactivo del nivel educativo para sincronización estricta de grados
  nivelSeleccionado = signal<'INICIAL' | 'PRIMARIA' | 'SECUNDARIA'>('PRIMARIA');

  gradosDisponibles = computed(() => {
    return DICCIONARIO_GRADOS[this.nivelSeleccionado()] || DICCIONARIO_GRADOS['PRIMARIA'];
  });

  leadForm: FormGroup;

  constructor() {
    this.leadForm = this.fb.group({
      apoderadoNombres: ['', [Validators.required, Validators.minLength(2)]],
      apoderadoApellidos: ['', [Validators.required, Validators.minLength(2)]],
      numeroDocumento: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      telefonoContacto: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
      correoElectronico: ['', [Validators.required, Validators.email]],
      alumnoNombres: ['', [Validators.required, Validators.minLength(2)]],
      nivelAcademico: ['PRIMARIA', Validators.required],
      gradoIngreso: ['1° de Primaria', Validators.required],
      tallerSeleccionado: ['Danzas Folklóricas'],
      turnoPreferido: ['Turno Mañana (8:30 am - 12:30 pm)'],
      aceptaPoliticaDatos: [false, Validators.requiredTrue],
      aceptaTerminos: [false, Validators.requiredTrue],
      website: [''] // Honeypot
    });

    // Suscripción reactiva para asegurar sincronización inmediata si se cambia programáticamente
    this.leadForm.get('nivelAcademico')?.valueChanges.subscribe((nivel) => {
      if (nivel && DICCIONARIO_GRADOS[nivel] && this.nivelSeleccionado() !== nivel) {
        this.nivelSeleccionado.set(nivel as 'INICIAL' | 'PRIMARIA' | 'SECUNDARIA');
        const nuevosGrados = DICCIONARIO_GRADOS[nivel];
        this.leadForm.patchValue({ gradoIngreso: nuevosGrados[0] }, { emitEvent: false });
      }
    });
  }

  ngOnInit() {
    this.startBgCarousel();
  }

  ngOnDestroy() {
    this.stopBgCarousel();
  }

  private startBgCarousel() {
    this.stopBgCarousel();
    this.bgTimer = setInterval(() => {
      this.currentBgIndex.update(idx => (idx + 1) % this.heroBanners.length);
    }, 5000);
  }

  private stopBgCarousel() {
    if (this.bgTimer) {
      clearInterval(this.bgTimer);
      this.bgTimer = null;
    }
  }

  setBgIndex(index: number) {
    this.currentBgIndex.set(index);
    this.startBgCarousel(); // Reinicia el timer para no saltar inmediatamente
  }

  isFieldInvalid(name: string): boolean {
    const control = this.leadForm.get(name);
    return !!(control && control.touched && control.invalid);
  }

  isFieldValid(name: string): boolean {
    const control = this.leadForm.get(name);
    return !!(control && control.touched && control.valid);
  }

  getInputClasses(name: string): string {
    const base = 'w-full text-xs px-3 py-2.5 rounded-sm transition-all bg-white';
    if (this.isFieldInvalid(name)) {
      return `${base} border border-red-600 ring-1 ring-red-600 bg-red-50/30 text-slate-900`;
    }
    if (this.isFieldValid(name)) {
      return `${base} border border-[#254EB6]/40 focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] text-slate-900`;
    }
    return `${base} border border-slate-300 focus:border-[#254EB6] focus:ring-1 focus:ring-[#254EB6] text-slate-900`;
  }

  onNumericInput(event: Event, controlName: string, maxLength: number) {
    const input = event.target as HTMLInputElement;
    const cleanValue = input.value.replace(/[^0-9]/g, '').slice(0, maxLength);
    input.value = cleanValue;
    this.leadForm.get(controlName)?.setValue(cleanValue, { emitEvent: true });
  }

  allowDigitsOnly(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'].includes(event.key)) {
      event.preventDefault();
    }
  }

  setTab(tab: 'NUEVO' | 'MAYERINO' | 'VACACIONES') {
    this.activeTab.set(tab);
    if (tab === 'VACACIONES') {
      this.leadForm.get('tallerSeleccionado')?.setValue('Danzas Folklóricas');
    }
  }

  onNivelChange() {
    const nivel = this.leadForm.get('nivelAcademico')?.value as 'INICIAL' | 'PRIMARIA' | 'SECUNDARIA';
    if (nivel && DICCIONARIO_GRADOS[nivel]) {
      this.nivelSeleccionado.set(nivel);
      const nuevosGrados = DICCIONARIO_GRADOS[nivel];
      this.leadForm.patchValue({ gradoIngreso: nuevosGrados[0] });
    }
  }

  onSubmit() {
    if (this.leadForm.invalid) {
      this.leadForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const formVal = this.leadForm.value;
    const currentTab = this.activeTab();

    if (currentTab === 'VACACIONES') {
      this.api.registrarVacaciones({
        apoderadoNombres: formVal.apoderadoNombres,
        apoderadoApellidos: formVal.apoderadoApellidos,
        numeroDocumento: formVal.numeroDocumento,
        telefonoContacto: formVal.telefonoContacto,
        correoElectronico: formVal.correoElectronico,
        alumnoNombres: formVal.alumnoNombres,
        alumnoEdad: 8,
        tallerSeleccionado: formVal.tallerSeleccionado,
        turnoPreferido: 'MANANA',
        aceptaTerminos: formVal.aceptaTerminos,
        aceptaPoliticaDatos: formVal.aceptaPoliticaDatos,
        website: formVal.website
      }).subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.submittedSuccess.set(true);
          if (res.whatsappRedirectUrl) {
            this.whatsappLink.set(res.whatsappRedirectUrl);
          }
        },
        error: () => {
          this.isSubmitting.set(false);
        }
      });
    } else {
      this.api.registrarLead({
        tipoProceso: currentTab,
        apoderadoNombres: formVal.apoderadoNombres,
        apoderadoApellidos: formVal.apoderadoApellidos,
        tipoDocumento: 'DNI',
        numeroDocumento: formVal.numeroDocumento,
        telefonoContacto: formVal.telefonoContacto,
        correoElectronico: formVal.correoElectronico,
        alumnoNombres: formVal.alumnoNombres,
        alumnoApellidos: formVal.apoderadoApellidos,
        nivelAcademico: formVal.nivelAcademico,
        gradoIngreso: formVal.gradoIngreso,
        canalContactoPreferido: 'WHATSAPP',
        aceptaTerminos: formVal.aceptaTerminos,
        aceptaPoliticaDatos: formVal.aceptaPoliticaDatos,
        website: formVal.website
      }).subscribe({
        next: (res) => {
          this.isSubmitting.set(false);
          this.submittedSuccess.set(true);
          if (res.whatsappRedirectUrl) {
            this.whatsappLink.set(res.whatsappRedirectUrl);
          }
        },
        error: () => {
          this.isSubmitting.set(false);
        }
      });
    }
  }

  resetForm() {
    this.submittedSuccess.set(false);
    this.whatsappLink.set(null);
    this.leadForm.reset({
      nivelAcademico: 'PRIMARIA',
      gradoIngreso: '1° de Primaria',
      tallerSeleccionado: 'Danzas Folklóricas',
      turnoPreferido: 'Turno Mañana (8:30 am - 12:30 pm)',
      aceptaPoliticaDatos: false,
      aceptaTerminos: false
    });
    this.nivelSeleccionado.set('PRIMARIA');
  }
}
