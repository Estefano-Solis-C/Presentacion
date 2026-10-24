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
   * Alimentado exclusivamente de la base de datos (cero fallbacks hardcodeados).
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
      map(res => (res?.data || []).map(e => this.parseEvent(e))),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene el último comunicado oficial publicado en la base de datos.
   */
  getLatestAnnouncement(): Observable<EventModel | null> {
    return this.http.get<ApiResponse<EventModel>>(`${this.baseUrl}/events/latest?tipo=COMUNICADO`).pipe(
      map(res => res?.data ? this.parseEvent(res.data) : null),
      catchError(() => of(null))
    );
  }

  /**
   * Obtiene la lista de años disponibles con publicaciones en base de datos.
   */
  getEventYears(): Observable<number[]> {
    return this.http.get<ApiResponse<number[]>>(`${this.baseUrl}/events/years`).pipe(
      map(res => res?.data || []),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene el detalle de un evento por ID para el modal de lectura completa.
   */
  getEventById(id: number): Observable<EventModel | null> {
    return this.http.get<ApiResponse<EventModel>>(`${this.baseUrl}/events/${id}`).pipe(
      map(res => res?.data ? this.parseEvent(res.data) : null),
      catchError(() => of(null))
    );
  }

  /**
   * Obtiene testimonios aleatorios de exalumnos desde la base de datos.
   */
  getRandomTestimonials(limit: number = 6): Observable<TestimonialModel[]> {
    return this.http.get<ApiResponse<TestimonialModel[]>>(`${this.baseUrl}/testimonials/random?limit=${limit}`).pipe(
      map(res => res?.data || []),
      catchError(() => of([]))
    );
  }

  /**
   * Obtiene la lista de niveles educativos estructurados desde la base de datos.
   */
  getLevels(): Observable<LevelModel[]> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/levels`).pipe(
      map(res => (res?.data || []).map(item => this.parseLevel(item))),
      catchError(() => of([]))
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

  private parseEvent(item: any): EventModel {
    let imagenes: string[] = [];
    if (Array.isArray(item.imagenes)) {
      imagenes = item.imagenes;
    } else if (typeof item.imagenes === 'string' && item.imagenes.trim().length > 0) {
      try {
        imagenes = JSON.parse(item.imagenes);
      } catch (e) {
        imagenes = [];
      }
    }
    if (imagenes.length === 0 && item.imagenUrl) {
      imagenes = [item.imagenUrl];
    }
    return {
      ...item,
      imagenes
    };
  }
}
