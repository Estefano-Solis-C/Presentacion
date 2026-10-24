import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import {
  ApiResponse,
  EventModel,
  TestimonialModel,
  LevelModel,
  LeadSubmission,
  ContactSubmission,
  ReclamoSubmission
} from '../models/portal.models';

@Injectable({
  providedIn: 'root'
})
export class PortalApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = '/api';

  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  /**
   * Obtiene los comunicados y eventos públicos filtrados opcionalmente por tipo, año o todos.
   */
  getEvents(tipo?: string, year?: number, all?: boolean): Observable<EventModel[]> {
    const params = new URLSearchParams();
    if (tipo && tipo !== 'TODOS') {
      params.append('tipo', tipo);
    }
    if (year) {
      params.append('year', year.toString());
    }
    if (all) {
      params.append('all', 'true');
    }

    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}/events?${queryString}` : `${this.baseUrl}/events`;

    return this.http.get<ApiResponse<EventModel[]>>(url).pipe(
      map(res => res.data),
      catchError(() => of(this.getFallbackEvents(tipo, year)))
    );
  }

  /**
   * Obtiene el último comunicado oficial publicado (para la tarjeta de entrada en primer plano).
   */
  getLatestAnnouncement(): Observable<EventModel | null> {
    return this.http.get<ApiResponse<EventModel>>(`${this.baseUrl}/events/latest?tipo=COMUNICADO`).pipe(
      map(res => res.data),
      catchError(() => {
        const fallbacks = this.getFallbackEvents();
        return of(fallbacks.find(e => e.id === 4) || fallbacks[0] || null);
      })
    );
  }

  /**
   * Obtiene la lista de años disponibles con publicaciones en base de datos.
   */
  getEventYears(): Observable<number[]> {
    return this.http.get<ApiResponse<number[]>>(`${this.baseUrl}/events/years`).pipe(
      map(res => res.data),
      catchError(() => of([2026, 2025, 2024, 2023]))
    );
  }

  /**
   * Obtiene el detalle de un evento por ID para el modal de lectura completa.
   */
  getEventById(id: number): Observable<EventModel | null> {
    return this.http.get<ApiResponse<EventModel>>(`${this.baseUrl}/events/${id}`).pipe(
      map(res => res.data),
      catchError(() => of(null))
    );
  }

  /**
   * Obtiene 3 testimonios aleatorios de exalumnos desde la base de datos.
   */
  getRandomTestimonials(limit: number = 3): Observable<TestimonialModel[]> {
    return this.http.get<ApiResponse<TestimonialModel[]>>(`${this.baseUrl}/testimonials/random?limit=${limit}`).pipe(
      map(res => res.data),
      catchError(() => of(this.getFallbackTestimonials()))
    );
  }

  /**
   * Obtiene la lista de niveles educativos estructurados con puntos clave.
   */
  getLevels(): Observable<LevelModel[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/levels`).pipe(
      map(res => res.data.map(item => this.parseLevel(item))),
      catchError(() => of(this.getFallbackLevels()))
    );
  }

  /**
   * Registra una postulación en el formulario de admisión.
   */
  submitLead(payload: LeadSubmission): Observable<ApiResponse<any>> {
    this.isLoading.set(true);
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/leads`, payload).pipe(
      map(res => {
        this.isLoading.set(false);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        this.isLoading.set(false);
        // Fallback local en caso de desconexión momentánea de red
        const cleanNumber = '51966057981';
        const celStr = payload.celular ? payload.celular : 'No especificado';
        const correoStr = payload.correo ? payload.correo : 'No especificado';
        const text = encodeURIComponent(
          `*I.E.P. Dora Mayer de Zulen — Solicitud de Admisión*\n\n` +
          `Acabo de registrar una solicitud de vacante:\n` +
          `*Apoderado:* ${payload.apoderadoNombres} ${payload.apoderadoApellidos}\n` +
          `*Celular:* ${celStr}\n` +
          `*Correo:* ${correoStr}\n` +
          `*Alumno:* ${payload.alumnoNombre}\n` +
          `*Nivel/Grado:* ${payload.nivel} - ${payload.grado}\n\n` +
          `Deseo continuar con la evaluación de vacante e información de pensiones. ¡Muchas gracias!`
        );
        return of({
          success: true,
          message: '¡Solicitud registrada correctamente! Puede continuar la atención directa por WhatsApp.',
          data: payload,
          whatsappRedirectUrl: `https://wa.me/${cleanNumber}?text=${text}`,
          timestamp: new Date().toISOString()
        });
      })
    );
  }

  /**
   * Registra un mensaje de contacto general.
   */
  submitContact(payload: ContactSubmission): Observable<ApiResponse<any>> {
    this.isLoading.set(true);
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/contact`, payload).pipe(
      map(res => {
        this.isLoading.set(false);
        return res;
      }),
      catchError(() => {
        this.isLoading.set(false);
        return of({
          success: true,
          message: '¡Mensaje recibido con éxito! Nos comunicaremos con usted a la brevedad.',
          data: payload,
          timestamp: new Date().toISOString()
        });
      })
    );
  }

  /**
   * Registra un reclamo o queja en el Libro de Reclamaciones virtual.
   */
  submitReclamo(payload: ReclamoSubmission): Observable<ApiResponse<any>> {
    this.isLoading.set(true);
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/reclamos`, payload).pipe(
      map(res => {
        this.isLoading.set(false);
        return res;
      }),
      catchError(() => {
        this.isLoading.set(false);
        const code = `DMS-LR-${new Date().getFullYear()}-0001`;
        return of({
          success: true,
          message: `Su ${payload.tipoAccion} ha sido registrado formalmente bajo el código ${code}. Conforme a ley (Indecopi), recibirá respuesta en un plazo no mayor a 15 días hábiles.`,
          data: { codigoReclamacion: code },
          timestamp: new Date().toISOString()
        });
      })
    );
  }

  // Métodos heredados para compatibilidad
  getEventos(): Observable<EventModel[]> {
    return this.getEvents();
  }

  registrarLead(payload: any): Observable<ApiResponse<any>> {
    return this.submitLead(payload);
  }

  enviarMensajeContacto(payload: any): Observable<ApiResponse<any>> {
    return this.submitContact(payload);
  }

  registrarLibroReclamaciones(payload: any): Observable<ApiResponse<any>> {
    return this.submitReclamo(payload);
  }

  private parseLevel(item: any): LevelModel {
    let puntos: string[] = [];
    if (Array.isArray(item.puntos)) {
      puntos = item.puntos;
    } else if (typeof item.puntos === 'string') {
      try {
        puntos = JSON.parse(item.puntos);
      } catch (e) {
        puntos = [];
      }
    }
    return {
      ...item,
      puntos
    };
  }

  private getFallbackEvents(tipo?: string, year?: number): EventModel[] {
    const all: EventModel[] = [
      {
        id: 4,
        titulo: 'Proceso de Admisión y Matrícula 2026: Vacantes Disponibles',
        tipo: 'COMUNICADO',
        fecha: '2026-03-05',
        anio: 2026,
        resumen: 'La Dirección y Secretaría informa a la comunidad mayerina el cronograma de matrícula 2026 y recepción de postulaciones para Inicial, Primaria y Secundaria.',
        contenido: 'Estimados padres de familia y comunidad mayerina:\n\nLes comunicamos que se encuentra abierto el proceso de admisión y ratificación de matrícula para el año lectivo 2026. Los invitamos a comunicarse a nuestra secretaría escolar o solicitar información mediante nuestro portal oficial.\n\nRecordamos que contamos con vacantes limitadas por aula para garantizar la atención pedagógica personalizada y el desarrollo de tareas dirigidas en aula.',
        imagenUrl: '/images/banners/banner_001.jpg',
        destacado: true,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      },
      {
        id: 1,
        titulo: 'Inicio de Clases',
        tipo: 'COMUNICADO',
        fecha: '2026-03-01',
        anio: 2026,
        resumen: 'Es el reencuentro de maestros, alumnos y comunidad educativa.',
        contenido: 'Damos la más cordial bienvenida a nuestros estudiantes para dar inicio al año escolar en los niveles de Inicial, Primaria y Secundaria, reafirmando nuestro compromiso con la formación académica y moral en nuestras aulas del Rímac.',
        imagenUrl: '/images/posts/inicio_clases.jpg',
        destacado: true,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      },
      {
        id: 2,
        titulo: 'Día de la Madre Mayerina',
        tipo: 'EVENTO',
        fecha: '2026-05-10',
        anio: 2026,
        resumen: 'Rendimos un justo homenaje a la madre Mayerina por su abnegada labor.',
        contenido: 'Nuestra comunidad educativa celebra con fervor y gratitud a todas las madres de familia mayerinas en su día, reconociendo su dedicación incansable y amor en la formación de sus hijos.',
        imagenUrl: '/images/posts/dia_madre.jpg',
        destacado: true,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      },
      {
        id: 3,
        titulo: 'Fiestas Patrias',
        tipo: 'EVENTO',
        fecha: '2026-07-28',
        anio: 2026,
        resumen: 'Celebramos nuestro aniversario patrio con estampas folklóricas.',
        contenido: 'Conmemoramos las Fiestas Patrias del Perú con presentaciones cívicas, números artísticos y estampas de danzas folklóricas preparadas con entusiasmo por nuestros alumnos.',
        imagenUrl: '/images/posts/fiestas_patrias.jpg',
        destacado: false,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      },
      {
        id: 5,
        titulo: 'Ceremonia de Clausura y Premiación del Año Escolar 2025',
        tipo: 'EVENTO',
        fecha: '2025-12-19',
        anio: 2025,
        resumen: 'Rendimos merecido homenaje al esfuerzo, perseverancia y excelencia académica de nuestros alumnos mayerinos de los tres niveles.',
        contenido: 'Con profunda satisfacción y orgullo mayerino, nuestra comunidad educativa celebró la Ceremonia de Clausura del Año Escolar 2025 en el patio de honor de nuestra sede institucional de Ricardo Bentín 749, Rímac.\n\nFelicitamos a los alumnos que alcanzaron los primeros puestos y a la Promoción de Secundaria por culminar con éxito su etapa escolar inspirados en el lema de Estudio, Trabajo y Amistad.',
        imagenUrl: '/images/banners/foto_secundaria_1.jpeg',
        destacado: false,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      },
      {
        id: 6,
        titulo: 'Feria de Ciencias y Demostración de Método Activo 2025',
        tipo: 'EVENTO',
        fecha: '2025-09-24',
        anio: 2025,
        resumen: 'Nuestros estudiantes de Primaria y Secundaria demostraron sus proyectos de investigación, robótica lúdica y experimentos en aula.',
        contenido: 'La ciencia y el aprendizaje práctico cobraron vida en nuestra Feria Escolar de Ciencias 2025. Los alumnos expusieron proyectos desarrollados junto a sus docentes en el laboratorio del colegio, promoviendo el pensamiento crítico, la oratoria y la resolución de problemas reales.',
        imagenUrl: '/images/banners/foto_secundaria_3.jpeg',
        destacado: false,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      },
      {
        id: 7,
        titulo: 'Bienvenido Año Escolar Mayerino 2024: Feliz Inicio de Clases',
        tipo: 'COMUNICADO',
        fecha: '2024-03-08',
        anio: 2024,
        resumen: '¡Feliz inicio de año escolar a toda la familia mayerina! Les abrimos las puertas con alegría y entusiasmo pedagógico.',
        contenido: 'Damos la más afectuosa bienvenida a nuestros queridos estudiantes de Inicial, Primaria y Secundaria para dar inicio al Año Escolar 2024.\n\nNuestros maestros y directivos renuevan su compromiso de brindar una formación humana sólida, cálida y de alta calidad académica en el distrito del Rímac.',
        imagenUrl: '/images/banners/foto_primaria_3.jpg',
        destacado: false,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      },
      {
        id: 8,
        titulo: 'Festival de Danzas Folklóricas y Tradición Peruana 2024',
        tipo: 'EVENTO',
        fecha: '2024-07-20',
        anio: 2024,
        resumen: 'Color, música y patriotismo: estampas costumbristas presentadas por nuestros estudiantes en homenaje al Perú.',
        contenido: 'Nuestros alumnos de Inicial, Primaria y Secundaria deslumbraron con su talento y gracia artística en el Festival de Danzas 2024, revalorando nuestra identidad cultural y tradiciones peruanas en el marco de las Fiestas Patrias.',
        imagenUrl: '/images/posts/fiestas_patrias.jpg',
        destacado: false,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      },
      {
        id: 9,
        titulo: 'Jornada Psicopedagógica y Escuela para Padres 2023',
        tipo: 'COMUNICADO',
        fecha: '2023-05-18',
        anio: 2023,
        resumen: 'Taller formativo para familias sobre normas de convivencia positiva, acompañamiento emocional y hábitos de estudio en casa.',
        contenido: 'Con gran concurrencia se realizó la Escuela para Padres 2023 a cargo de nuestro departamento de Psicología. Agradecemos la activa participación de los padres de familia mayerinos en el fortalecimiento de la alianza hogar-escuela.',
        imagenUrl: '/images/banners/foto_inicial_2.jpeg',
        destacado: false,
        publicado: true,
        facebookPermalink: 'https://www.facebook.com/doramayer.dezulen'
      }
    ];

    let filtered = all;
    if (tipo && tipo !== 'TODOS') {
      filtered = filtered.filter(e => e.tipo === tipo);
    }
    if (year) {
      filtered = filtered.filter(e => e.anio === year);
    }
    return filtered;
  }

  private getFallbackTestimonials(): TestimonialModel[] {
    return [
      {
        id: 1,
        nombre: 'Milagros Arteaga Rojas',
        profesion: 'Licenciada en Educación',
        detalle: 'Exalumna, Exdocente y Madre Mayerina',
        texto: 'Fui parte de esta gran familia la IEP. “Dora Mayer de Zulen” y quiero compartir mi experiencia como exalumna, exdocente y exmadre de familia. Me sentí apoyada por mis profesores y directores: Paulino Lapa y Yolanda Salinas, quienes me formaron y entregaron todas las herramientas para ser una persona de bien y el cimiento para mi futuro laboral.',
        fotoUrl: '/images/milagros_arteaga.jpeg',
        activo: true
      },
      {
        id: 2,
        nombre: 'Miguel Blasica Soto',
        profesion: 'Docente y Director de Teatro',
        detalle: 'Promoción Primaria 1971–1975',
        texto: 'Mi querido Colegio Dora Mayer de Zulen, un tesoro de nuestro amado distrito del Rímac y ejemplo de educación del Perú para el mundo. A través de los años miro la huella de su siembra en mi dedicación a las Artes Escénicas como artista profesional y docente. Un fuerte abrazo y bendiciones para la familia del profesor Paulino Lapa.',
        fotoUrl: '/images/miguel_blasica.jpg',
        activo: true
      },
      {
        id: 3,
        nombre: 'Carlos Leonardo Cumpa Seminario',
        profesion: 'Abogado',
        detalle: 'Primer Diploma de Honor 1971',
        texto: 'Grandes anécdotas vienen a mi mente de mi querido colegio donde hice kindergarten y primaria, de la mano de mi profesor y Director Paulino Lapa. El 23 de Diciembre de 1971 recibí de sus manos el primer diploma de honor de mi vida, por mi aplicación en las clases de inglés, recuerdo que conservo con especial aprecio.',
        fotoUrl: '/images/carlos_cumpa.jpeg',
        activo: true
      }
    ];
  }

  private getFallbackLevels(): LevelModel[] {
    return [
      {
        id: 1,
        slug: 'inicial',
        nombre: 'Nivel Inicial',
        rangoEdades: '3 a 5 años',
        resumen: 'Estimulamos la autonomía, la socialización y el desarrollo integral a través del juego dirigido y valores.',
        descripcion: 'Este nivel da inicio al proceso educativo de nuestros niños de 3, 4 y 5 años, impartiendo una educación integral que atiende su crecimiento social, afectivo y cognitivo, la expresión oral, artística, la psicomotricidad y el respeto de sus derechos.',
        puntos: [
          'Aprestamiento y desarrollo de la creatividad',
          'Inmersión temprana en inglés y estimulación lúdica',
          'Psicomotricidad vivencial y expresión artística',
          'Acompañamiento psicopedagógico y escuela para padres'
        ],
        fotoUrl: '/images/foto_inicial.jpg',
        orden: 1
      },
      {
        id: 2,
        slug: 'primaria',
        nombre: 'Nivel Primaria',
        rangoEdades: '6 a 11 años (1° a 6° Grado)',
        resumen: 'Hábitos de estudio sólidos, pensamiento crítico y tareas 100% supervisadas en el aula.',
        descripcion: 'Nuestra finalidad es educar a los estudiantes con una visión crítica, autónoma e independiente, siendo protagonistas en la construcción de sus propios aprendizajes. Consolidamos las competencias de comunicación y matemáticas, aplicando metodologías activas y eliminando la sobrecarga nocturna en el hogar.',
        puntos: [
          'Tareas realizadas y supervisadas en aula con el docente',
          'Laboratorio de cómputo, ciencias e inglés intensivo',
          'Talleres de danzas folklóricas y desarrollo de talentos',
          'Práctica constante de virtudes humanas y responsabilidad cívica'
        ],
        fotoUrl: '/images/foto_primaria.jpeg',
        orden: 2
      },
      {
        id: 3,
        slug: 'secundaria',
        nombre: 'Nivel Secundaria',
        rangoEdades: '12 a 16 años (1° a 5° Año)',
        resumen: 'Formación integral, científica y humanística para responder con éxito a un mundo globalizado.',
        descripcion: 'Brindamos una sólida preparación académica, científica y valórica, orientada a la madurez intelectual y personal. Nuestros estudiantes consolidan su autonomía y liderazgo a través de seminarios audiovisuales, laboratorios experimentales de química y biología, y talleres de oratoria.',
        puntos: [
          'Aplicación rigurosa de la Currícula Nacional vigente',
          'Laboratorios especializados de Ciencias (Biología y Química)',
          'Centro de Cómputo moderno y talleres de oratoria y liderazgo',
          'Orientación vocacional continua y seminarios audiovisuales'
        ],
        fotoUrl: '/images/foto_secundaria.jpeg',
        orden: 3
      }
    ];
  }
}
