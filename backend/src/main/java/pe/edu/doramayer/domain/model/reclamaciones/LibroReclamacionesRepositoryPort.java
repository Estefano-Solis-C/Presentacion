package pe.edu.doramayer.domain.model.reclamaciones;

import java.util.Optional;

public interface LibroReclamacionesRepositoryPort {
    LibroReclamaciones save(LibroReclamaciones reclamacion);
    Optional<LibroReclamaciones> findByCodigo(CodigoReclamacion codigo);
    int findMaxCorrelativoByAnio(int anio);
}
