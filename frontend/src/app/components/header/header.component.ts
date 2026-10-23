import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Topbar Institucional Ejecutivo Unificado -->
    <div class="bg-[#0F296B] text-white/90 text-xs py-2 px-3 sm:px-4 border-b border-[#0F296B]/30 relative z-50">
      <div class="max-w-7xl mx-auto flex justify-between items-center text-[11px] sm:text-xs">
        
        <!-- Contacto Rápido con Iconos Dorados Unificados -->
        <div class="flex items-center space-x-2.5 sm:space-x-3 text-white/95">
          <a href="tel:014815770" class="hover:text-amber-300 transition-colors flex items-center space-x-1.5">
            <app-icon name="phone" size="13" className="text-[#FBB600] shrink-0"></app-icon>
            <span class="hidden sm:inline font-medium">(01) 4815770</span>
            <span class="sm:hidden font-mono text-[11px]">4815770</span>
          </a>

          <span class="text-white/30 hidden xs:inline">|</span>

          <a href="https://wa.me/51966057981" target="_blank" rel="noopener" class="hover:text-amber-300 transition-colors flex items-center space-x-1.5 font-medium">
            <app-icon name="whatsapp" size="13" className="text-[#FBB600] shrink-0"></app-icon>
            <span>966 057 981</span>
          </a>

          <span class="text-white/30 hidden lg:inline">|</span>

          <span class="hidden lg:inline-flex items-center text-white/80 space-x-1.5 font-normal">
            <app-icon name="map-pin" size="13" className="text-[#FBB600] shrink-0"></app-icon>
            <span class="truncate">Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac</span>
          </span>
        </div>

        <!-- Lado Derecho: Insignia Conmemorativa y Red Social -->
        <div class="flex items-center space-x-2.5 text-[10px] sm:text-xs">
          <div class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#254EB6] text-[#FBB600] font-bold text-[10px] tracking-wider uppercase shadow-xs">
            FUNDADO EN 1957 · RÍMAC
          </div>
          <a
            href="https://www.facebook.com/iepdoramayerdezulen/"
            target="_blank"
            rel="noopener"
            class="text-white/80 hover:text-white transition-colors flex items-center space-x-1"
            title="Facebook Oficial @iepdoramayerdezulen"
          >
            <app-icon name="facebook" size="14" className="text-[#FBB600] shrink-0"></app-icon>
            <span class="hidden md:inline font-medium">&#64;iepdoramayerdezulen</span>
          </a>
        </div>

      </div>
    </div>

    <!-- Navegación Principal Pegajosa (Sticky) y Suave -->
    <header
      class="sticky top-0 z-40 transition-all duration-300 ease-in-out"
      [class]="isScrolled()
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#0F296B]/10 py-1'
        : 'bg-white border-b border-[#0F296B]/15 py-2.5'"
    >
      <div
        class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 transition-all duration-300"
        [class]="isScrolled() ? 'h-14 sm:h-16' : 'h-16 sm:h-20'"
      >
        
        <!-- Logotipo Institucional y Escudo -->
        <a href="#" class="flex items-center space-x-2.5 sm:space-x-3.5 group min-w-0">
          <img
            src="/images/insignia.png"
            alt="Insignia Oficial I.E.P. Dora Mayer de Zulen"
            class="object-contain filter drop-shadow group-hover:scale-105 transition-all duration-300 shrink-0"
            [class]="isScrolled() ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-11 h-11 sm:w-14 sm:h-14'"
          />
          <div class="min-w-0">
            <div class="font-black text-sm sm:text-lg text-[#0F296B] tracking-tight leading-tight truncate">
              I.E.P. Dora Mayer de Zulen
            </div>
            <div class="text-[10px] sm:text-xs text-slate-500 font-medium tracking-wide truncate">
              <span class="hidden sm:inline">Rímac, Lima · 68 Años de Tradición y Rigor</span>
              <span class="sm:hidden font-mono uppercase text-slate-600">Rímac · Ventura Rossi</span>
            </div>
          </div>
        </a>

        <!-- Menú de Navegación Desktop -->
        <nav class="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-700">
          <a href="#propuesta" class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent hover:border-[#254EB6]">{{ i18n.t('nav.propuesta') }}</a>
          <a href="#niveles" class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent hover:border-[#254EB6]">{{ i18n.t('nav.niveles') }}</a>
          <a href="#historia" class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent hover:border-[#254EB6]">{{ i18n.t('nav.historia') }}</a>
          <a href="#testimonios" class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent hover:border-[#254EB6]">{{ i18n.t('nav.testimonios') }}</a>
          <a href="#eventos" class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent hover:border-[#254EB6]">{{ i18n.t('nav.comunicados') }}</a>
          <a href="#contacto" class="hover:text-[#254EB6] transition py-1 border-b-2 border-transparent hover:border-[#254EB6]">{{ i18n.t('nav.contacto') }}</a>
        </nav>

        <!-- CTA Matrícula y Menú Móvil -->
        <div class="flex items-center space-x-2 shrink-0">
          <a
            href="#matricula"
            class="hidden sm:inline-flex px-4 py-2.5 rounded-sm bg-[#254EB6] hover:bg-[#0F296B] text-white text-xs font-black uppercase tracking-wider shadow-sm border border-[#254EB6] hover:shadow-mayer-soft transition-all items-center space-x-2"
          >
            <span>MATRÍCULA 2026 / 2027</span>
            <app-icon name="arrow-right" size="14" className="text-[#FBB600]"></app-icon>
          </a>

          <a
            href="#matricula"
            class="sm:hidden px-2.5 py-1.5 rounded-sm bg-[#254EB6] text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-xs"
          >
            ADMISIÓN
          </a>

          <!-- Botón Menú Móvil Físico Táctil (Min 40x40px) -->
          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="md:hidden w-10 h-10 flex items-center justify-center rounded-sm border border-[#0F296B]/20 bg-slate-50 text-[#0F296B] active:bg-slate-200 transition"
            aria-label="Menú móvil"
          >
            <app-icon [name]="isMobileMenuOpen() ? 'close' : 'chevron-down'" size="20"></app-icon>
          </button>
        </div>
      </div>

      <!-- Menú Desplegable Móvil -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden bg-white border-b border-[#0F296B]/15 px-4 py-4 space-y-2 shadow-lg">
          <a (click)="closeMenu()" href="#propuesta" class="p-3 rounded-sm border border-slate-200 font-sans text-xs font-bold uppercase text-slate-800 hover:bg-slate-50 flex items-center justify-between">
            <span>{{ i18n.t('nav.propuesta') }}</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a (click)="closeMenu()" href="#niveles" class="p-3 rounded-sm border border-slate-200 font-sans text-xs font-bold uppercase text-slate-800 hover:bg-slate-50 flex items-center justify-between">
            <span>{{ i18n.t('nav.niveles') }}</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a (click)="closeMenu()" href="#historia" class="p-3 rounded-sm border border-slate-200 font-sans text-xs font-bold uppercase text-slate-800 hover:bg-slate-50 flex items-center justify-between">
            <span>{{ i18n.t('nav.historia') }}</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a (click)="closeMenu()" href="#testimonios" class="p-3 rounded-sm border border-slate-200 font-sans text-xs font-bold uppercase text-slate-800 hover:bg-slate-50 flex items-center justify-between">
            <span>{{ i18n.t('nav.testimonios') }}</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a (click)="closeMenu()" href="#eventos" class="p-3 rounded-sm border border-slate-200 font-sans text-xs font-bold uppercase text-slate-800 hover:bg-slate-50 flex items-center justify-between">
            <span>{{ i18n.t('nav.comunicados') }}</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
          <a (click)="closeMenu()" href="#contacto" class="p-3 rounded-sm border border-slate-200 font-sans text-xs font-bold uppercase text-slate-800 hover:bg-slate-50 flex items-center justify-between">
            <span>{{ i18n.t('nav.contacto') }}</span>
            <app-icon name="arrow-right" size="14" className="text-[#254EB6]"></app-icon>
          </a>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  i18n = inject(I18nService);
  isMobileMenuOpen = signal<boolean>(false);
  isScrolled = signal<boolean>(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 25);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
