package br.ufpa.facomp.diplomas.domain;

import static org.assertj.core.api.Assertions.assertThat;

import br.ufpa.facomp.diplomas.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DefesaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Defesa.class);
        Defesa defesa1 = new Defesa();
        defesa1.setId(1L);
        Defesa defesa2 = new Defesa();
        defesa2.setId(defesa1.getId());
        assertThat(defesa1).isEqualTo(defesa2);
        defesa2.setId(2L);
        assertThat(defesa1).isNotEqualTo(defesa2);
        defesa1.setId(null);
        assertThat(defesa1).isNotEqualTo(defesa2);
    }
}
