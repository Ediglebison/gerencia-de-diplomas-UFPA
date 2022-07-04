package br.ufpa.facomp.diplomas.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.ufpa.facomp.diplomas.IntegrationTest;
import br.ufpa.facomp.diplomas.domain.Defesa;
import br.ufpa.facomp.diplomas.domain.enumeration.StatusDefesa;
import br.ufpa.facomp.diplomas.repository.DefesaRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DefesaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DefesaResourceIT {

    private static final String DEFAULT_ALUNO = "AAAAAAAAAA";
    private static final String UPDATED_ALUNO = "BBBBBBBBBB";

    private static final String DEFAULT_COD_DEFESA = "AAAAAAAAAA";
    private static final String UPDATED_COD_DEFESA = "BBBBBBBBBB";

    private static final StatusDefesa DEFAULT_STATUS_DEFESA = StatusDefesa.ATIVO;
    private static final StatusDefesa UPDATED_STATUS_DEFESA = StatusDefesa.CONCLUIDO;

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/defesas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DefesaRepository defesaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDefesaMockMvc;

    private Defesa defesa;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Defesa createEntity(EntityManager em) {
        Defesa defesa = new Defesa()
            .aluno(DEFAULT_ALUNO)
            .codDefesa(DEFAULT_COD_DEFESA)
            .statusDefesa(DEFAULT_STATUS_DEFESA)
            .data(DEFAULT_DATA);
        return defesa;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Defesa createUpdatedEntity(EntityManager em) {
        Defesa defesa = new Defesa()
            .aluno(UPDATED_ALUNO)
            .codDefesa(UPDATED_COD_DEFESA)
            .statusDefesa(UPDATED_STATUS_DEFESA)
            .data(UPDATED_DATA);
        return defesa;
    }

    @BeforeEach
    public void initTest() {
        defesa = createEntity(em);
    }

    @Test
    @Transactional
    void createDefesa() throws Exception {
        int databaseSizeBeforeCreate = defesaRepository.findAll().size();
        // Create the Defesa
        restDefesaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(defesa)))
            .andExpect(status().isCreated());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeCreate + 1);
        Defesa testDefesa = defesaList.get(defesaList.size() - 1);
        assertThat(testDefesa.getAluno()).isEqualTo(DEFAULT_ALUNO);
        assertThat(testDefesa.getCodDefesa()).isEqualTo(DEFAULT_COD_DEFESA);
        assertThat(testDefesa.getStatusDefesa()).isEqualTo(DEFAULT_STATUS_DEFESA);
        assertThat(testDefesa.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    void createDefesaWithExistingId() throws Exception {
        // Create the Defesa with an existing ID
        defesa.setId(1L);

        int databaseSizeBeforeCreate = defesaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDefesaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(defesa)))
            .andExpect(status().isBadRequest());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDefesas() throws Exception {
        // Initialize the database
        defesaRepository.saveAndFlush(defesa);

        // Get all the defesaList
        restDefesaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(defesa.getId().intValue())))
            .andExpect(jsonPath("$.[*].aluno").value(hasItem(DEFAULT_ALUNO)))
            .andExpect(jsonPath("$.[*].codDefesa").value(hasItem(DEFAULT_COD_DEFESA)))
            .andExpect(jsonPath("$.[*].statusDefesa").value(hasItem(DEFAULT_STATUS_DEFESA.toString())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())));
    }

    @Test
    @Transactional
    void getDefesa() throws Exception {
        // Initialize the database
        defesaRepository.saveAndFlush(defesa);

        // Get the defesa
        restDefesaMockMvc
            .perform(get(ENTITY_API_URL_ID, defesa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(defesa.getId().intValue()))
            .andExpect(jsonPath("$.aluno").value(DEFAULT_ALUNO))
            .andExpect(jsonPath("$.codDefesa").value(DEFAULT_COD_DEFESA))
            .andExpect(jsonPath("$.statusDefesa").value(DEFAULT_STATUS_DEFESA.toString()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()));
    }

    @Test
    @Transactional
    void getNonExistingDefesa() throws Exception {
        // Get the defesa
        restDefesaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDefesa() throws Exception {
        // Initialize the database
        defesaRepository.saveAndFlush(defesa);

        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();

        // Update the defesa
        Defesa updatedDefesa = defesaRepository.findById(defesa.getId()).get();
        // Disconnect from session so that the updates on updatedDefesa are not directly saved in db
        em.detach(updatedDefesa);
        updatedDefesa.aluno(UPDATED_ALUNO).codDefesa(UPDATED_COD_DEFESA).statusDefesa(UPDATED_STATUS_DEFESA).data(UPDATED_DATA);

        restDefesaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDefesa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDefesa))
            )
            .andExpect(status().isOk());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
        Defesa testDefesa = defesaList.get(defesaList.size() - 1);
        assertThat(testDefesa.getAluno()).isEqualTo(UPDATED_ALUNO);
        assertThat(testDefesa.getCodDefesa()).isEqualTo(UPDATED_COD_DEFESA);
        assertThat(testDefesa.getStatusDefesa()).isEqualTo(UPDATED_STATUS_DEFESA);
        assertThat(testDefesa.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    void putNonExistingDefesa() throws Exception {
        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();
        defesa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDefesaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, defesa.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(defesa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDefesa() throws Exception {
        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();
        defesa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDefesaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(defesa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDefesa() throws Exception {
        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();
        defesa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDefesaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(defesa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDefesaWithPatch() throws Exception {
        // Initialize the database
        defesaRepository.saveAndFlush(defesa);

        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();

        // Update the defesa using partial update
        Defesa partialUpdatedDefesa = new Defesa();
        partialUpdatedDefesa.setId(defesa.getId());

        partialUpdatedDefesa.aluno(UPDATED_ALUNO).codDefesa(UPDATED_COD_DEFESA).statusDefesa(UPDATED_STATUS_DEFESA).data(UPDATED_DATA);

        restDefesaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDefesa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDefesa))
            )
            .andExpect(status().isOk());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
        Defesa testDefesa = defesaList.get(defesaList.size() - 1);
        assertThat(testDefesa.getAluno()).isEqualTo(UPDATED_ALUNO);
        assertThat(testDefesa.getCodDefesa()).isEqualTo(UPDATED_COD_DEFESA);
        assertThat(testDefesa.getStatusDefesa()).isEqualTo(UPDATED_STATUS_DEFESA);
        assertThat(testDefesa.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    void fullUpdateDefesaWithPatch() throws Exception {
        // Initialize the database
        defesaRepository.saveAndFlush(defesa);

        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();

        // Update the defesa using partial update
        Defesa partialUpdatedDefesa = new Defesa();
        partialUpdatedDefesa.setId(defesa.getId());

        partialUpdatedDefesa.aluno(UPDATED_ALUNO).codDefesa(UPDATED_COD_DEFESA).statusDefesa(UPDATED_STATUS_DEFESA).data(UPDATED_DATA);

        restDefesaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDefesa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDefesa))
            )
            .andExpect(status().isOk());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
        Defesa testDefesa = defesaList.get(defesaList.size() - 1);
        assertThat(testDefesa.getAluno()).isEqualTo(UPDATED_ALUNO);
        assertThat(testDefesa.getCodDefesa()).isEqualTo(UPDATED_COD_DEFESA);
        assertThat(testDefesa.getStatusDefesa()).isEqualTo(UPDATED_STATUS_DEFESA);
        assertThat(testDefesa.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    void patchNonExistingDefesa() throws Exception {
        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();
        defesa.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDefesaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, defesa.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(defesa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDefesa() throws Exception {
        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();
        defesa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDefesaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(defesa))
            )
            .andExpect(status().isBadRequest());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDefesa() throws Exception {
        int databaseSizeBeforeUpdate = defesaRepository.findAll().size();
        defesa.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDefesaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(defesa)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Defesa in the database
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDefesa() throws Exception {
        // Initialize the database
        defesaRepository.saveAndFlush(defesa);

        int databaseSizeBeforeDelete = defesaRepository.findAll().size();

        // Delete the defesa
        restDefesaMockMvc
            .perform(delete(ENTITY_API_URL_ID, defesa.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Defesa> defesaList = defesaRepository.findAll();
        assertThat(defesaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
