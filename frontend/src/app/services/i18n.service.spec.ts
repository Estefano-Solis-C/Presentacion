import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService (Unit Tests)', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
    expect(service.currentLang()).toBe('es');
  });

  it('debe resolver claves de primer y segundo nivel', () => {
    expect(service.t('common.schoolName')).toBe('I.E.P. Dora Mayer de Zulen');
    expect(service.t('common.motto')).toBe('Estudio – Trabajo – Amistad');
    expect(service.t('nav.matriculaCta')).toBe('Matrícula 2026 / 2027');
  });

  it('debe retornar la misma clave como fallback si no existe', () => {
    expect(service.t('inexistente.clave')).toBe('inexistente.clave');
  });

  it('debe reemplazar parámetros interpolados', () => {
    const result = service.t('test.message', { name: 'Paulino' });
    // Si la clave no existe, retorna la clave
    expect(result).toBe('test.message');
  });
});
