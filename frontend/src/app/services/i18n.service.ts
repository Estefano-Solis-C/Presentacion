import { Injectable, signal } from '@angular/core';

/**
 * Servicio de Internacionalización (i18n) Reactivo con Angular Signals.
 * Diseñado con cero bloatware para mantener el bundle inicial por debajo de 250 KB.
 * Actualmente enfocado en Español (es) con soporte extensible para otros idiomas.
 */
@Injectable({
  providedIn: 'root'
})
export class I18nService {
  currentLang = signal<'es'>('es');

  // Diccionario centralizado de respaldo inmediato en memoria (evita latencias de red)
  private readonly dictionary: Record<string, any> = {
    common: {
      schoolName: 'I.E.P. Dora Mayer de Zulen',
      motto: 'Estudio – Trabajo – Amistad',
      location: 'Calle Ricardo Bentín 749, Urb. Ventura Rossi, Rímac, Lima',
      phone: '(01) 4815770',
      whatsapp: '+51 966057981',
      secretariaEmail: 'secretaria@doramayerdezulen.edu.pe',
      backupEmail: 'doramayer1957@gmail.com',
      facebook: '@iepdoramayerdezulen',
      copyright: 'Todos los derechos reservados. Cumplimiento Ley N° 29733 y Directiva Indecopi.'
    },
    nav: {
      propuesta: 'Propuesta',
      niveles: 'Niveles',
      historia: 'Historia',
      testimonios: 'Exalumnos',
      comunicados: 'Comunicados',
      contacto: 'Contacto',
      matriculaCta: 'Matrícula 2026 / 2027'
    },
    hero: {
      badge: '+65 Años de Excelencia en el Rímac · Fundado en 1957',
      headline: 'Educación con valores, rigor y tareas realizadas en clase.',
      subheadline: 'Bajo el lema histórico "Estudio – Trabajo – Amistad", brindamos a tus hijos acompañamiento psicopedagógico permanente, modernos laboratorios y formación integral de excelencia.',
      mascotTitle: 'Nuestra Mascota Institucional: El Búho Académico',
      mascotDesc: 'Simboliza la sabiduría, la disciplina en el estudio y la constante búsqueda de superación académica que inculcó nuestro fundador, el Prof. Paulino Lapa.'
    },
    admission: {
      tabNuevo: 'Alumno Nuevo',
      tabMayerino: 'Alumno Mayerino',
      tabVacaciones: 'Vacaciones Útiles',
      titleNuevo: 'Postulación para Alumno Nuevo 2026 / 2027',
      titleMayerino: 'Ratificación de Matrícula Mayerina',
      titleVacaciones: 'Inscripción en Vacaciones Útiles de Verano',
      subtitle: 'Completa los datos y recibe respuesta inmediata vía WhatsApp o llamada.',
      apoderadoNombres: 'Nombres del Apoderado *',
      apoderadoApellidos: 'Apellidos del Apoderado *',
      numeroDocumento: 'DNI / CE Apoderado *',
      telefonoContacto: 'Celular WhatsApp (9 dígitos) *',
      correoElectronico: 'Correo Electrónico *',
      alumnoNombres: 'Nombres y Apellidos del Alumno *',
      nivelEducativo: 'Nivel Educativo *',
      gradoIngreso: 'Grado al que postula *',
      tallerVerano: 'Taller de Verano *',
      ley29733Checkbox: 'Autorizo el tratamiento de mis datos personales para fines de admisión escolar conforme a la Ley N° 29733.',
      terminosCheckbox: 'Acepto los términos de postulación y el reglamento del proceso de admisión 2026 / 2027.',
      submitBtn: 'Solicitar Vacante e Información en WhatsApp',
      submitting: 'Procesando solicitud...',
      successTitle: '¡Registro Exitoso!',
      successDesc: 'Hemos recibido la información de postulación. Puedes continuar la conversación de inmediato en WhatsApp con Secretaría.',
      whatsappAction: 'Continuar en WhatsApp (+51 966057981)',
      anotherAction: 'Registrar otra postulación'
    },
    counters: {
      trajectory: 'Años de Trayectoria',
      trajectoryDesc: 'Desde 1957 en el Rímac',
      levels: 'Niveles Educativos',
      levelsDesc: 'Inicial, Primaria y Secundaria',
      homework: 'Tareas en Clase',
      homeworkDesc: 'Acompañamiento docente real',
      alumni: 'Egresados Mayerinos',
      alumniDesc: 'Líderes en el Perú y el mundo'
    },
    pillars: {
      badge: 'Nuestra Filosofía Formativa',
      title: 'El Trinomio de Formación Mayerina',
      desc: 'Inculcado por nuestros fundadores Paulino Lapa y Yolanda Salinas, este lema guía el crecimiento intelectual, técnico y humano de cada estudiante.',
      estudio: '1. Estudio',
      trabajo: '2. Trabajo',
      amistad: '3. Amistad'
    },
    benefits: {
      badge: 'Diferenciadores Clave',
      title: '¿Por qué las Familias del Rímac nos Eligen?',
      desc: 'Diseñamos un modelo educativo que responde a las necesidades reales de los padres de hoy.'
    },
    levels: {
      badge: 'Propuesta Curricular',
      title: 'Niveles Educativos Integrados'
    },
    history: {
      badge: 'Nuestra Historia y Legado (1957 – Presente)',
      title: 'Más de 65 Años Forjando el Futuro del Rímac'
    },
    testimonials: {
      badge: 'Voces de la Familia Mayerina',
      title: 'Testimonios de Nuestros Exalumnos'
    },
    events: {
      badge: 'Canal Oficial',
      title: 'Comunicados, Eventos y Noticias'
    },
    contact: {
      badge: 'Canales de Atención',
      title: 'Contáctanos o Visítanos en el Rímac'
    },
    reclamaciones: {
      title: 'Libro de Reclamaciones Virtual',
      subtitle: 'I.E.P. Dora Mayer de Zulen · D.S. N° 011-2011-PCM (Indecopi)'
    },
    whatsapp: {
      title: 'Admisión Mayerina',
      online: 'En línea · +51 966 057 981',
      welcome: '¡Hola! Bienvenido a la I.E.P. Dora Mayer de Zulen. ¿En qué podemos orientarte hoy?'
    }
  };

  /**
   * Resuelve una clave de traducción jerárquica (ej: 'nav.matriculaCta' -> 'Matrícula 2026 / 2027').
   */
  t(path: string, params?: Record<string, string>): string {
    const keys = path.split('.');
    let current: any = this.dictionary;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return path; // Fallback al path si no se encuentra
      }
    }

    if (typeof current === 'string' && params) {
      let result = current;
      for (const [k, v] of Object.entries(params)) {
        result = result.replace(`{${k}}`, v);
      }
      return result;
    }

    return typeof current === 'string' ? current : path;
  }
}
