export interface EventModel {
  id: number;
  titulo: string;
  tipo: 'COMUNICADO' | 'EVENTO';
  fecha: string;
  anio?: number;
  resumen: string;
  contenido: string;
  imagenUrl?: string;
  imagenes?: string[];
  destacado: boolean;
  publicado: boolean;
  facebookPostId?: string;
  facebookPermalink?: string;
  createdAt?: string;
}

export interface TestimonialModel {
  id: number;
  nombre: string;
  profesion: string;
  detalle: string; // Ej: Exalumna · Promoción 1980
  texto: string;
  fotoUrl: string;
  activo: boolean;
  createdAt?: string;
}

export interface LevelModel {
  id: number;
  slug: 'inicial' | 'primaria' | 'secundaria';
  nombre: string;
  rangoEdades: string;
  resumen: string;
  descripcion: string;
  puntos: string[]; // parsed from JSON array
  fotoUrl: string;
  orden: number;
}

export interface LeadSubmission {
  apoderadoNombres: string;
  apoderadoApellidos: string;
  documento?: string;
  celular?: string;
  correo?: string;
  alumnoNombre: string;
  nivel: 'INICIAL' | 'PRIMARIA' | 'SECUNDARIA';
  grado: string;
  website?: string; // Honeypot
}

export interface ContactSubmission {
  nombre: string;
  celular: string;
  correo: string;
  asunto: string;
  mensaje: string;
  website?: string;
}

export interface ReclamoSubmission {
  reclamanteNombres: string;
  reclamanteApellidos: string;
  reclamanteDocumento: string;
  reclamanteTelefono: string;
  reclamanteCorreo: string;
  reclamanteDomicilio: string;
  alumnoAfectado?: string;
  tipoAccion: 'RECLAMO' | 'QUEJA';
  descripcionBienServicio: string;
  detalle: string;
  pedido: string;
  website?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  whatsappRedirectUrl?: string;
  timestamp: string;
}

// Aliases para compatibilidad existente
export type EventoResponse = EventModel;
export type LeadMatriculaRequest = LeadSubmission;
export type MensajeContactoRequest = ContactSubmission;
export type LibroReclamacionesRequest = ReclamoSubmission;
