import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { CountersComponent } from './components/counters/counters.component';
import { LevelsComponent } from './components/levels/levels.component';
import { HistoryComponent } from './components/history/history.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { EventsComponent } from './components/events/events.component';
import { ContactFooterComponent } from './components/contact-footer/contact-footer.component';
import { WhatsappWidgetComponent } from './components/whatsapp-widget/whatsapp-widget.component';
import { LatestAnnouncementModalComponent } from './components/latest-announcement-modal/latest-announcement-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    CountersComponent,
    LevelsComponent,
    HistoryComponent,
    TestimonialsComponent,
    EventsComponent,
    ContactFooterComponent,
    WhatsappWidgetComponent,
    LatestAnnouncementModalComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col font-sans selection:bg-[#254EB6] selection:text-white bg-white">
      
      <!-- Encabezado Fijo Sobrio y Ejecutivo -->
      <app-header></app-header>

      <main class="flex-grow">
        <!-- Hero Section Crítica (Carga Inmediata) -->
        <app-hero></app-hero>

        <!-- Secciones Diferidas (@defer on idle; on viewport) para optimizar el bundle inicial -->
        @defer (on idle; on viewport) {
          <!-- Fusión Estudio, Trabajo, Amistad + Indicadores Institucionales -->
          <app-counters></app-counters>
        } @placeholder {
          <div class="h-40 bg-slate-50 animate-pulse"></div>
        }

        @defer (on idle; on viewport) {
          <!-- Niveles Educativos (Inicial, Primaria, Secundaria) con Modal Centrado -->
          <app-levels></app-levels>
        } @placeholder {
          <div class="h-80 bg-white animate-pulse"></div>
        }

        @defer (on idle; on viewport) {
          <!-- Historia, Fundadores y Línea de Tiempo -->
          <app-history></app-history>
        } @placeholder {
          <div class="h-80 bg-[#F4F6FB] animate-pulse"></div>
        }

        @defer (on idle; on viewport) {
          <!-- Voces de la Familia Mayerina (Testimonios) -->
          <app-testimonials></app-testimonials>
        } @placeholder {
          <div class="h-60 bg-white animate-pulse"></div>
        }

        @defer (on idle; on viewport) {
          <!-- Comunicados y Eventos Oficiales -->
          <app-events></app-events>
        } @placeholder {
          <div class="h-60 bg-[#F4F6FB] animate-pulse"></div>
        }

        @defer (on idle; on viewport) {
          <!-- Contacto, Ubicación y Libro de Reclamaciones Indecopi -->
          <app-contact-footer></app-contact-footer>
        } @placeholder {
          <div class="h-80 bg-white animate-pulse"></div>
        }
      </main>

      <!-- Asistente Flotante de WhatsApp -->
      <app-whatsapp-widget></app-whatsapp-widget>

      <!-- Tarjeta Emergente con Marco Grueso del Último Comunicado Oficial (Facebook) -->
      <app-latest-announcement-modal></app-latest-announcement-modal>

    </div>
  `
})
export class AppComponent {}
