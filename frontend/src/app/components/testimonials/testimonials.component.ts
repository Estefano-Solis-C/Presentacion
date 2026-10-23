import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  computed,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutlineIconComponent } from '../icon/outline-icon.component';

interface Testimonial {
  id: string;
  name: string;
  generation: string;
  career: string;
  quote: string;
  image: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, OutlineIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="testimonios" class="py-20 bg-mayer-fog border-b border-[#0F296B]/15 overflow-hidden select-none">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <!-- Header de Sección (Sin Controles Superiores) -->
        <div class="pb-6 border-b border-[#0F296B]/15">
          <div class="space-y-2 max-w-2xl">
            <div class="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-950 font-sans text-xs uppercase px-3.5 py-1.5 font-bold tracking-wider border border-emerald-200 rounded-full shadow-xs">
              <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
              <span>VOCES DE NUESTRA COMUNIDAD MAYERINA</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F296B] tracking-tight">
              Voces de la Familia Mayerina
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed font-normal">
              Historias reales de exalumnos egresados que hoy destacan profesionalmente gracias a los cimientos de Estudio, Trabajo y Amistad forjados en nuestras aulas.
            </p>
          </div>
        </div>

        <!-- Carrusel Enmarcado con Flechas Laterales a Izquierda y Derecha -->
        <div class="relative px-3 sm:px-12">
          
          <!-- Botón Anterior Flotante a la Izquierda -->
          <button
            type="button"
            (click)="prev()"
            aria-label="Testimonio anterior"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#254EB6] hover:bg-[#0F296B] text-white shadow-md flex items-center justify-center transition-all cursor-pointer"
          >
            <app-icon name="arrow-left" size="18"></app-icon>
          </button>

          <!-- Contenedor del Carrusel Deslizable -->
          <div
            #carouselContainer
            (mouseenter)="onMouseEnter()"
            (mouseleave)="onMouseLeave()"
            (mousedown)="onMouseDown($event)"
            (mousemove)="onMouseMove($event)"
            (mouseup)="onMouseUp()"
            (touchstart)="onTouchStart($event)"
            (touchmove)="onTouchMove($event)"
            (touchend)="onTouchEnd()"
            class="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 pt-2 no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
          >
            @for (item of testimonials(); track item.name; let i = $index) {
              <div
                [attr.data-index]="i"
                class="w-[82vw] sm:w-[350px] lg:w-[364px] min-w-[260px] sm:min-w-[350px] max-w-[380px] bg-white rounded-sm p-6 border border-[#0F296B]/15 shadow-mayer-soft hover:shadow-mayer-elevated hover:-translate-y-1 transition-all duration-300 h-[380px] sm:h-[370px] flex flex-col justify-between shrink-0"
              >
                
                <!-- Encabezado de Tarjeta Editorial y Cita -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span class="font-sans text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate">
                      EXPEDIENTE · EGRESADO #0{{ i + 1 }}
                    </span>
                    <div class="text-[#FBB600] text-2xl font-serif font-black leading-none">“</div>
                  </div>

                  <!-- Cita Testimonial Real de la Web Histórica (En cursiva, sin cortes) -->
                  <div class="min-h-[160px] max-h-[180px] overflow-y-auto no-scrollbar pr-1 text-slate-700 leading-relaxed font-sans italic text-xs sm:text-[13px]">
                    <p class="italic">“{{ item.quote }}”</p>
                  </div>
                </div>

                <!-- Autor Institucional con Fotografía Real y Profesión Verdadera -->
                <div class="pt-3 border-t border-slate-100 flex items-center space-x-3.5">
                  <div class="w-14 h-14 rounded-sm border border-[#0F296B]/20 shadow-xs overflow-hidden bg-slate-100 shrink-0">
                    <img
                      [src]="item.image"
                      [alt]="item.name"
                      class="w-full h-full object-cover pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                  <div class="min-w-0">
                    <div class="font-bold text-sm text-[#0F296B] truncate">{{ item.name }}</div>
                    <div class="text-[11px] font-sans text-[#254EB6] font-bold uppercase truncate">{{ item.career }}</div>
                    <div class="text-[10px] font-sans text-slate-500 uppercase font-medium truncate">{{ item.generation }}</div>
                  </div>
                </div>

              </div>
            }
          </div>

          <!-- Botón Siguiente Flotante a la Derecha -->
          <button
            type="button"
            (click)="next()"
            aria-label="Testimonio siguiente"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#254EB6] hover:bg-[#0F296B] text-white shadow-md flex items-center justify-center transition-all cursor-pointer"
          >
            <app-icon name="arrow-right" size="18"></app-icon>
          </button>

        </div>

        <!-- Indicadores de Navegación Dinámicos (Dots según Viewport) -->
        <div class="flex items-center justify-center space-x-2 pt-2">
          @for (idx of dotIndexes(); track idx) {
            <button
              type="button"
              (click)="scrollToIndex(idx)"
              [class]="currentIndex() === idx ? 'w-8 bg-[#254EB6]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'"
              class="h-2 rounded-full transition-all duration-300 cursor-pointer"
              [attr.aria-label]="'Ir a parada ' + (idx + 1)"
            ></button>
          }
        </div>

      </div>
    </section>
  `
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  @ViewChild('carouselContainer', { static: false })
  carouselContainer?: ElementRef<HTMLDivElement>;

  // Datos 100% auténticos según la web histórica del colegio
  testimonials = signal<Testimonial[]>([
    {
      id: '1',
      name: 'Milagros Arteaga Rojas',
      generation: 'Exalumna, Exdocente y Exmadre de Familia',
      career: 'Licenciada en Educación',
      quote: 'Fui parte de esta gran familia la IEP. “Dora Mayer de Zulen” y quiero compartir mi experiencia como exalumna, exdocente y exmadre de familia. Me sentí apoyada por mis profesores y directores: Paulino Lapa y Yolanda Salinas, quienes me formaron y entregaron todas las herramientas para ser una persona de bien y el cimiento para mi futuro laboral.',
      image: '/images/milagros_arteaga.jpeg'
    },
    {
      id: '2',
      name: 'Miguel Blasica Soto',
      generation: 'Promoción Primaria 1971–1975',
      career: 'Docente y Director de Teatro',
      quote: 'Mi querido Colegio Dora Mayer de Zulen, un tesoro de nuestro amado distrito del Rímac y ejemplo de educación del Perú para el mundo. A través de los años miro la huella de su siembra en mi dedicación a las Artes Escénicas como artista profesional y docente. Un fuerte abrazo y bendiciones para la familia del profesor Paulino Lapa.',
      image: '/images/miguel_blasica.jpg'
    },
    {
      id: '3',
      name: 'Carlos Leonardo Cumpa Seminario',
      generation: 'Primer Diploma de Honor 1971',
      career: 'Abogado',
      quote: 'Grandes anécdotas vienen a mi mente de mi querido colegio donde hice kindergarten y primaria, de la mano de mi profesor y Director Paulino Lapa. El 23 de Diciembre de 1971 recibí de sus manos el primer diploma de honor de mi vida, por mi aplicación en las clases de inglés, recuerdo que conservo con especial aprecio.',
      image: '/images/carlos_cumpa.jpeg'
    },
    {
      id: '4',
      name: 'Patricia Lapa Salinas',
      generation: 'Exalumna y Familia Fundadora',
      career: 'Médico Cirujano',
      quote: 'Cómo no recordar a mi querido colegio Dora Mayer de Zulen... siempre con la misma calidez, valores y principios inculcados a sus alumnos. Sentaste las bases de mi educación, me llevaste de la mano en mis primeros años y gracias a ello logré ser una profesional médica y puse en tus manos la educación de mis hijos.',
      image: '/images/patricia_lapa.jpg'
    },
    {
      id: '5',
      name: 'Lizandro Morillo Viera',
      generation: 'Promoción 1980',
      career: 'Ingeniero de Sistemas',
      quote: 'Tengo los más lindos recuerdos de mi paso por el Colegio Dora Mayer de Zulen en la sede de Monitor Huáscar. Época de felicidad total, amigos, clases, aprendizajes y fulbito en el recreo con nuestro querido "DIRE" Paulino Lapa. Hoy con emocionada nostalgia agradezco la formación académica y los valores recibidos.',
      image: '/images/lizandro_morillo.jpg'
    },
    {
      id: '6',
      name: 'Gabriela Estephany Rosanna Ravelo Lapa',
      generation: 'Promoción Inicial, Primaria y Secundaria',
      career: 'Odontóloga',
      quote: 'Un agradecimiento especial a la institución educativa por haber sido mi primer lugar de enseñanza desde inicial, primaria y secundaria. Un recinto donde no solo se fomenta el estudio, el trabajo y los valores, sino también el compromiso continuo para lograr metas personales y convertirme en Odontóloga.',
      image: '/images/gabriela_ravelo.jpg'
    }
  ]);

  currentIndex = signal<number>(0);
  visibleCards = signal<number>(3); // Calculado dinámicamente

  // Cantidad dinámica de paradas (dots) según el viewport
  totalCards = computed(() => this.testimonials().length); // 6
  maxIndex = computed(() => Math.max(0, this.totalCards() - this.visibleCards()));
  dotIndexes = computed(() => Array.from({ length: this.maxIndex() + 1 }, (_, i) => i));

  private autoPlayTimer: any = null;
  private isPaused = false;

  // Estado de Arrastre (Mouse Drag & Touch Swipe)
  private isDragging = false;
  private startX = 0;
  private initialScrollLeft = 0;

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleCards();
  }

  ngOnInit() {
    this.updateVisibleCards();
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  private updateVisibleCards() {
    if (typeof window === 'undefined') return;
    const width = window.innerWidth;
    if (width >= 1024) {
      this.visibleCards.set(3); // Desktop: 6 - 3 + 1 = 4 dots
    } else if (width >= 640) {
      this.visibleCards.set(2); // Tablet: 6 - 2 + 1 = 5 dots
    } else {
      this.visibleCards.set(1); // Mobile: 6 - 1 + 1 = 6 dots
    }

    if (this.currentIndex() > this.maxIndex()) {
      this.currentIndex.set(this.maxIndex());
    }
  }

  private startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (!this.isPaused && !this.isDragging) {
        this.next();
      }
    }, 4500);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  next() {
    const max = this.maxIndex();
    const nextIdx = this.currentIndex() >= max ? 0 : this.currentIndex() + 1;
    this.scrollToIndex(nextIdx);
  }

  prev() {
    const max = this.maxIndex();
    const prevIdx = this.currentIndex() <= 0 ? max : this.currentIndex() - 1;
    this.scrollToIndex(prevIdx);
  }

  scrollToIndex(index: number) {
    this.currentIndex.set(index);
    const container = this.carouselContainer?.nativeElement;
    if (!container) return;

    const cards = container.children;
    if (cards && cards[index]) {
      const card = cards[index] as HTMLElement;
      const targetLeft = card.offsetLeft - container.offsetLeft - 16;
      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth'
      });
    }
  }

  onMouseEnter() {
    this.isPaused = true;
  }

  onMouseLeave() {
    this.isPaused = false;
  }

  onMouseDown(e: MouseEvent) {
    this.isDragging = true;
    this.isPaused = true;
    const container = this.carouselContainer?.nativeElement;
    if (container) {
      this.startX = e.pageX - container.offsetLeft;
      this.initialScrollLeft = container.scrollLeft;
    }
  }

  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    e.preventDefault();
    const container = this.carouselContainer?.nativeElement;
    if (container) {
      const x = e.pageX - container.offsetLeft;
      const walk = (x - this.startX) * 1.5;
      container.scrollLeft = this.initialScrollLeft - walk;
    }
  }

  onMouseUp() {
    if (this.isDragging) {
      this.isDragging = false;
      this.isPaused = false;
      this.snapToClosestCard();
    }
  }

  onTouchStart(e: TouchEvent) {
    this.isPaused = true;
    this.isDragging = true;
    const container = this.carouselContainer?.nativeElement;
    if (container && e.touches.length > 0) {
      this.startX = e.touches[0].pageX - container.offsetLeft;
      this.initialScrollLeft = container.scrollLeft;
    }
  }

  onTouchMove(e: TouchEvent) {
    if (!this.isDragging || e.touches.length === 0) return;
    const container = this.carouselContainer?.nativeElement;
    if (container) {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - this.startX) * 1.5;
      container.scrollLeft = this.initialScrollLeft - walk;
    }
  }

  onTouchEnd() {
    if (this.isDragging) {
      this.isDragging = false;
      this.isPaused = false;
      this.snapToClosestCard();
    }
  }

  private snapToClosestCard() {
    const container = this.carouselContainer?.nativeElement;
    if (!container) return;

    const cards = Array.from(container.children) as HTMLElement[];
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, index) => {
      const cardLeft = card.offsetLeft - container.offsetLeft;
      const diff = Math.abs(container.scrollLeft - cardLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    const targetIndex = Math.min(closestIndex, this.maxIndex());
    this.scrollToIndex(targetIndex);
  }
}
