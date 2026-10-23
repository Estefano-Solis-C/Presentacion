import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { CountersComponent } from './components/counters/counters.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { LevelsComponent } from './components/levels/levels.component';
import { HistoryComponent } from './components/history/history.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { EventsComponent } from './components/events/events.component';
import { ContactFooterComponent } from './components/contact-footer/contact-footer.component';
import { WhatsappWidgetComponent } from './components/whatsapp-widget/whatsapp-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    CountersComponent,
    BenefitsComponent,
    LevelsComponent,
    HistoryComponent,
    TestimonialsComponent,
    EventsComponent,
    ContactFooterComponent,
    WhatsappWidgetComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col font-sans selection:bg-mayer-sky-500 selection:text-white">
      
      <!-- Encabezado Fijo -->
      <app-header></app-header>

      <main class="flex-grow">
        <!-- Hero Section Crítica (Carga Inmediata) -->
        <app-hero></app-hero>

        <!-- Secciones Diferidas (@defer on viewport) para optimizar el bundle inicial < 250 KB -->
        @defer (on viewport) {
          <app-counters></app-counters>
        } @placeholder {
          <div class="h-40 bg-white animate-pulse"></div>
        }

        @defer (on viewport) {
          <app-benefits></app-benefits>
        } @placeholder {
          <div class="h-60 bg-mayer-fog animate-pulse"></div>
        }

        @defer (on viewport) {
          <app-levels></app-levels>
        } @placeholder {
          <div class="h-80 bg-white animate-pulse"></div>
        }

        @defer (on viewport) {
          <app-history></app-history>
        } @placeholder {
          <div class="h-80 bg-mayer-fog animate-pulse"></div>
        }

        @defer (on viewport) {
          <app-testimonials></app-testimonials>
        } @placeholder {
          <div class="h-60 bg-white animate-pulse"></div>
        }

        @defer (on viewport) {
          <app-events></app-events>
        } @placeholder {
          <div class="h-60 bg-mayer-fog animate-pulse"></div>
        }

        @defer (on viewport) {
          <app-contact-footer></app-contact-footer>
        } @placeholder {
          <div class="h-80 bg-white animate-pulse"></div>
        }
      </main>

      <!-- Asistente Flotante de WhatsApp -->
      <app-whatsapp-widget></app-whatsapp-widget>

    </div>
  `
})
export class AppComponent {}
