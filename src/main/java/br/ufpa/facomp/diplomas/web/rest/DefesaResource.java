package br.ufpa.facomp.diplomas.web.rest;

import br.ufpa.facomp.diplomas.domain.Defesa;
import br.ufpa.facomp.diplomas.repository.DefesaRepository;
import br.ufpa.facomp.diplomas.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link br.ufpa.facomp.diplomas.domain.Defesa}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DefesaResource {

    private final Logger log = LoggerFactory.getLogger(DefesaResource.class);

    private static final String ENTITY_NAME = "defesa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DefesaRepository defesaRepository;

    public DefesaResource(DefesaRepository defesaRepository) {
        this.defesaRepository = defesaRepository;
    }

    /**
     * {@code POST  /defesas} : Create a new defesa.
     *
     * @param defesa the defesa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new defesa, or with status {@code 400 (Bad Request)} if the defesa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/defesas")
    public ResponseEntity<Defesa> createDefesa(@RequestBody Defesa defesa) throws URISyntaxException {
        log.debug("REST request to save Defesa : {}", defesa);
        if (defesa.getId() != null) {
            throw new BadRequestAlertException("A new defesa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Defesa result = defesaRepository.save(defesa);
        return ResponseEntity
            .created(new URI("/api/defesas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /defesas/:id} : Updates an existing defesa.
     *
     * @param id the id of the defesa to save.
     * @param defesa the defesa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated defesa,
     * or with status {@code 400 (Bad Request)} if the defesa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the defesa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/defesas/{id}")
    public ResponseEntity<Defesa> updateDefesa(@PathVariable(value = "id", required = false) final Long id, @RequestBody Defesa defesa)
        throws URISyntaxException {
        log.debug("REST request to update Defesa : {}, {}", id, defesa);
        if (defesa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, defesa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!defesaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Defesa result = defesaRepository.save(defesa);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, defesa.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /defesas/:id} : Partial updates given fields of an existing defesa, field will ignore if it is null
     *
     * @param id the id of the defesa to save.
     * @param defesa the defesa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated defesa,
     * or with status {@code 400 (Bad Request)} if the defesa is not valid,
     * or with status {@code 404 (Not Found)} if the defesa is not found,
     * or with status {@code 500 (Internal Server Error)} if the defesa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/defesas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Defesa> partialUpdateDefesa(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Defesa defesa
    ) throws URISyntaxException {
        log.debug("REST request to partial update Defesa partially : {}, {}", id, defesa);
        if (defesa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, defesa.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!defesaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Defesa> result = defesaRepository
            .findById(defesa.getId())
            .map(existingDefesa -> {
                if (defesa.getAluno() != null) {
                    existingDefesa.setAluno(defesa.getAluno());
                }
                if (defesa.getCodDefesa() != null) {
                    existingDefesa.setCodDefesa(defesa.getCodDefesa());
                }
                if (defesa.getStatusDefesa() != null) {
                    existingDefesa.setStatusDefesa(defesa.getStatusDefesa());
                }
                if (defesa.getData() != null) {
                    existingDefesa.setData(defesa.getData());
                }

                return existingDefesa;
            })
            .map(defesaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, defesa.getId().toString())
        );
    }

    /**
     * {@code GET  /defesas} : get all the defesas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of defesas in body.
     */
    @GetMapping("/defesas")
    public List<Defesa> getAllDefesas() {
        log.debug("REST request to get all Defesas");
        return defesaRepository.findAll();
    }

    /**
     * {@code GET  /defesas/:id} : get the "id" defesa.
     *
     * @param id the id of the defesa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the defesa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/defesas/{id}")
    public ResponseEntity<Defesa> getDefesa(@PathVariable Long id) {
        log.debug("REST request to get Defesa : {}", id);
        Optional<Defesa> defesa = defesaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(defesa);
    }

    /**
     * {@code DELETE  /defesas/:id} : delete the "id" defesa.
     *
     * @param id the id of the defesa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/defesas/{id}")
    public ResponseEntity<Void> deleteDefesa(@PathVariable Long id) {
        log.debug("REST request to delete Defesa : {}", id);
        defesaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
