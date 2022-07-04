package br.ufpa.facomp.diplomas.repository;

import br.ufpa.facomp.diplomas.domain.Defesa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Defesa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DefesaRepository extends JpaRepository<Defesa, Long> {}
