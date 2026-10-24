import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Topbar Institucional Sobrio -->
    <div class="bg-[#0F296B] text-white/90 text-xs py-2 px-3 sm:px-4 border-b border-[#0F296B]/30 relative z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center text-[11px] sm:text-xs">
        
        <!-- Contacto Rápido -->
        <div class="flex items-center space-x-3 sm:space-x-4 text-white/95">
          <a
            href="tel:014815770"
            class="hover:text-[#FBB600] transition-colors flex items-center space-x-1.5 focus:outline-hidden focus:ring-1 focus:ring-[#FBB600]"
          >
            <app-icon name="phone" size="13" className="text-[#FBB600] shrink-0"></app-icon>
            <span class="hidden sm:inline font-medium">(01) 481 5770</span>
            <span class="sm:hidden font-mono text-[11px]">481 5770</span>
          </a>

          <span class="text-white/20 hidden xs:inline">|</span>

          <a
            href="https://wa.me/51966057981"
            target="_blank"
            rel="noopener"
            class="hover:text-[#FBB600] transition-colors flex items-center space-x-1.5 font-medium focus:outline-hidden focus:ring-1 focus:ring-[#FBB600]"
          >
            <app-icon name="whatsapp" size="13" className="text-[#FBB600] shrink-0"></app-icon>
            <span>966 057 981</span>
          </a>

          <span class="text-white/20 hidden lg:inline">|</span>

          <span class="hidden lg:inline-flex items-center text-white/80 space-x-1.5 font-normal">
            <app-icon name="map-pin" size="13" className="text-[#FBB600] shrink-0"></app-icon>
            <span class="truncate">Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac</span>
          </span>
        </div>

        <!-- Lado Derecho: Emblema Histórico Dinámico y Redes -->
        <div class="flex items-center space-x-3 text-[10px] sm:text-xs">
          <div class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 text-[#FBB600] font-bold text-[10px] tracking-wider uppercase border border-white/15">
            FUNDADO EN 1957 · {{ yearsActive() }} AÑOS EN EL RÍMAC
          </div>
          <a
            href="https://www.facebook.com/iepdoramayerdezulen/"
            target="_blank"
            rel="noopener"
            class="text-white/80 hover:text-white transition-colors flex items-center space-x-1 focus:outline-hidden"
            title="Facebook Oficial"
          >
            <app-icon name="facebook" size="14" className="text-[#FBB600] shrink-0"></app-icon>
            <span class="hidden md:inline font-medium">&#64;iepdoramayerdezulen</span>
          </a>
        </div>

      </div>
    </div>

    <!-- Navegación Principal Pegajosa (Sticky) -->
    <header
      class="sticky top-0 z-40 transition-all duration-300 ease-in-out"
      [class]="isScrolled()
        ? 'bg-white/95 backdrop-blur-md shadow-card-soft border-b border-[#0F296B]/15 py-1.5'
        : 'bg-white border-b border-[#0F296B]/10 py-3'"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 transition-all duration-300"
        [class]="isScrolled() ? 'h-16 sm:h-18' : 'h-20 sm:h-24'"
      >
        
        <!-- Logotipo Institucional y Escudo Ampliado -->
        <a href="#" class="flex items-center space-x-3.5 group min-w-0 focus:outline-hidden">
          <img
            src="/images/insignia.png"
            alt="Insignia Oficial I.E.P. Dora Mayer de Zulen"
            class="object-contain drop-shadow-sm group-hover:scale-105 transition-all duration-300 shrink-0"
            [class]="isScrolled() ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18'"
          />
          <div class="min-w-0">
            <div class="font-serif font-bold text-base sm:text-xl lg:text-2xl text-[#0F296B] tracking-tight leading-tight truncate">
              I.E.P. Dora Mayer de Zulen
            </div>
            <div class="text-xs sm:text-sm text-slate-500 font-sans tracking-wide truncate mt-0.5">
              Estudio, Trabajo y Amistad · Rímac
            </div>
          </div>
        </a>

        <!-- Menú de Navegación Desktop con Scrollspy -->
        <nav class="hidden lg:flex items-center space-x-8 text-[15px] lg:text-base font-sans font-semibold text-slate-700">
          <a
            href="#propuesta"
            (click)="scrollTo('#propuesta', $event)"
            [class.text-[#254EB6]]="activeSection() === 'propuesta'"
            [class.border-[#254EB6]]="activeSection() === 'propuesta'"
            class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent"
          >
            Propuesta
          </a>
          <a
            href="#niveles"
            (click)="scrollTo('#niveles', $event)"
            [class.text-[#254EB6]]="activeSection() === 'niveles'"
            [class.border-[#254EB6]]="activeSection() === 'niveles'"
            class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent"
          >
            Niveles
          </a>
          <a
            href="#historia"
            (click)="scrollTo('#historia', $event)"
            [class.text-[#254EB6]]="activeSection() === 'historia'"
            [class.border-[#254EB6]]="activeSection() === 'historia'"
            class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent"
          >
            Historia
          </a>
          <a
            href="#testimonios"
            (click)="scrollTo('#testimonios', $event)"
            [class.text-[#254EB6]]="activeSection() === 'testimonios'"
            [class.border-[#254EB6]]="activeSection() === 'testimonios'"
            class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent"
          >
            Voces
          </a>
          <a
            href="#eventos"
            (click)="scrollTo('#eventos', $event)"
            [class.text-[#254EB6]]="activeSection() === 'eventos'"
            [class.border-[#254EB6]]="activeSection() === 'eventos'"
            class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent"
          >
            Noticias
          </a>
          <a
            href="#contacto"
            (click)="scrollTo('#contacto', $event)"
            [class.text-[#254EB6]]="activeSection() === 'contacto'"
            [class.border-[#254EB6]]="activeSection() === 'contacto'"
            class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent"
          >
            Contacto
          </a>
        </nav>

        <!-- CTAs y Botón Hamburguesa -->
        <div class="flex items-center space-x-3 shrink-0">
          <a
            href="#matricula"
            (click)="scrollTo('#matricula', $event)"
            class="hidden sm:inline-flex px-5 py-2.5 sm:px-6 sm:py-3 rounded-sm bg-[#254EB6] hover:bg-[#1D3FA2] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider shadow-xs hover:shadow-card-soft transition-all items-center space-x-2 focus:outline-hidden focus:ring-2 focus:ring-[#254EB6]/40"
          >
            <span>Admisión {{ currentAdmissionCycle() }}</span>
            <app-icon name="arrow-right" size="14" className="text-[#FBB600]"></app-icon>
          </a>

          <a
            href="#matricula"
            (click)="scrollTo('#matricula', $event)"
            class="sm:hidden px-2.5 py-1.5 rounded-sm bg-[#254EB6] text-white font-sans text-xs font-bold uppercase tracking-wider shadow-xs"
          >
            Admisión
          </a>

          <!-- Botón Menú Móvil Accesible (Min 40x40px) -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="lg:hidden w-10 h-10 flex items-center justify-center rounded-sm border border-[#0F296B]/20 bg-slate-50 text-[#0F296B] hover:bg-slate-100 active:bg-slate-200 transition focus:outline-hidden"
            [attr.aria-expanded]="isMobileMenuOpen()"
            aria-label="Abrir menú de navegación"
          >
            <app-icon [name]="isMobileMenuOpen() ? 'close' : 'menu'" size="20"></app-icon>
          </button>
        </div>
      </div>

      <!-- Menú Desplegable Móvil con Transición Suave -->
      @if (isMobileMenuOpen()) {
        <div class="lg:hidden bg-white border-b border-[#0F296B]/15 px-4 py-4 space-y-2 shadow-lg animate-modal-in">
          <a
            (click)="navigateAndClose('#propuesta', $event)"
            href="#propuesta"
            class="p-3 rounded-sm border border-slate-200 font-sans text-sm font-semibold text-[#1E2A4A] hover:bg-[#F4F6FB] flex items-center justify-between"
          >
            <span>Propuesta Educativa</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a
            (click)="navigateAndClose('#niveles', $event)"
            href="#niveles"
            class="p-3 rounded-sm border border-slate-200 font-sans text-sm font-semibold text-[#1E2A4A] hover:bg-[#F4F6FB] flex items-center justify-between"
          >
            <span>Niveles Educativos</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a
            (click)="navigateAndClose('#historia', $event)"
            href="#historia"
            class="p-3 rounded-sm border border-slate-200 font-sans text-sm font-semibold text-[#1E2A4A] hover:bg-[#F4F6FB] flex items-center justify-between"
          >
            <span>Historia y Legado</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a
            (click)="navigateAndClose('#testimonios', $event)"
            href="#testimonios"
            class="p-3 rounded-sm border border-slate-200 font-sans text-sm font-semibold text-[#1E2A4A] hover:bg-[#F4F6FB] flex items-center justify-between"
          >
            <span>Voces de Egresados</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a
            (click)="navigateAndClose('#eventos', $event)"
            href="#eventos"
            class="p-3 rounded-sm border border-slate-200 font-sans text-sm font-semibold text-[#1E2A4A] hover:bg-[#F4F6FB] flex items-center justify-between"
          >
            <span>Noticias y Comunicados</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a
            (click)="navigateAndClose('#contacto', $event)"
            href="#contacto"
            class="p-3 rounded-sm border border-slate-200 font-sans text-sm font-semibold text-[#1E2A4A] hover:bg-[#F4F6FB] flex items-center justify-between"
          >
            <span>Contacto y Visitas</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  isMobileMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);
  activeSection = signal<string>('matricula');

  // Cálculo dinámico de años desde 1957
  yearsActive = computed(() => {
    return new Date().getFullYear() - 1957;
  });

  // Ciclo escolar correspondiente
  currentAdmissionCycle = computed(() => {
    const now = new Date();
    const year = now.getFullYear();
    // Si estamos a mitad de año hacia adelante, ofrecer el año siguiente
    return now.getMonth() >= 6 ? year + 1 : year;
  });

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 25);
    this.detectActiveSection();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }

  scrollTo(targetId: string, event: Event) {
    event.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  navigateAndClose(targetId: string, event: Event) {
    this.closeMenu();
    this.scrollTo(targetId, event);
  }

  private detectActiveSection() {
    const sections = ['matricula', 'propuesta', 'niveles', 'historia', 'testimonios', 'eventos', 'contacto'];
    const scrollPosition = window.scrollY + 120;

    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection.set(sectionId);
          break;
        }
      }
    }
  }
}
