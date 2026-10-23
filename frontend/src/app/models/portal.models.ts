export interface LeadMatriculaRequest {
  tipoProceso: 'NUEVO' | 'MAYERINO';
  apoderadoNombres: string;
  apoderadoApellidos: string;
  tipoDocumento: 'DNI' | 'CE';
  numeroDocumento: string;
  telefonoContacto: string;
  correoElectronico: string;
  alumnoNombres: string;
  alumnoApellidos: string;
  nivelAcademico: 'INICIAL' | 'PRIMARIA' | 'SECUNDARIA';
  gradoIngreso: string;
  colegioProcedencia?: string;
  comentarios?: string;
  canalContactoPreferido: 'WHATSAPP' | 'LLAMADA' | 'CORREO';
  aceptaTerminos: boolean;
  aceptaPoliticaDatos: boolean;
  website?: string; // Honeypot
}

export interface InscripcionVacacionesRequest {
  apoderadoNombres: string;
  apoderadoApellidos: string;
  numeroDocumento: string;
  telefonoContacto: string;
  correoElectronico: string;
  alumnoNombres: string;
  alumnoEdad: number;
  tallerSeleccionado: string;
  turnoPreferido: string;
  aceptaTerminos: boolean;
  aceptaPoliticaDatos: boolean;
  website?: string;
}

export interface LibroReclamacionesRequest {
  reclamanteTipoDoc: string;
  reclamanteNumeroDoc: string;
  reclamanteNombres: string;
  reclamanteApellidos: string;
  reclamanteDomicilio: string;
  reclamanteTelefono: string;
  reclamanteCorreo: string;
  esMenorEdad: boolean;
  nombreAlumnoAfectado?: string;
  tipoBienServicio: string;
  montoReclamado?: number;
  descripcionBienServicio: string;
  tipoAccion: 'RECLAMO' | 'QUEJA';
  detalleReclamacion: string;
  pedidoConsumidor: string;
  aceptaPoliticaDatos: boolean;
  website?: string;
}

export interface MensajeContactoRequest {
  nombreCompleto: string;
  correoElectronico: string;
  telefono: string;
  asunto: string;
  mensaje: string;
  website?: string;
}

export interface EventoResponse {
  id: number;
  titulo: string;
  slug: string;
  categoria: 'NOTICIA' | 'EVENTO' | 'COMUNICADO' | 'VACACIONES';
  resumen: string;
  contenido: string;
  imagenUrl?: string;
  fechaEvento?: string;
  isPinned: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  whatsappRedirectUrl?: string;
  timestamp: string;
}
