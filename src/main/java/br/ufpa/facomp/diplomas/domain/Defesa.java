package br.ufpa.facomp.diplomas.domain;

import br.ufpa.facomp.diplomas.domain.enumeration.StatusDefesa;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Defesa.
 */
@Entity
@Table(name = "defesa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Defesa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "aluno")
    private String aluno;

    @Column(name = "cod_defesa")
    private String codDefesa;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_defesa")
    private StatusDefesa statusDefesa;

    @Column(name = "data")
    private LocalDate data;

    @ManyToOne
    @JsonIgnoreProperties(value = { "defesas" }, allowSetters = true)
    private Processo codDefesa;

    @ManyToOne
    @JsonIgnoreProperties(value = { "nomes" }, allowSetters = true)
    private Aluno aluno;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Defesa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAluno() {
        return this.aluno;
    }

    public Defesa aluno(String aluno) {
        this.setAluno(aluno);
        return this;
    }

    public void setAluno(String aluno) {
        this.aluno = aluno;
    }

    public String getCodDefesa() {
        return this.codDefesa;
    }

    public Defesa codDefesa(String codDefesa) {
        this.setCodDefesa(codDefesa);
        return this;
    }

    public void setCodDefesa(String codDefesa) {
        this.codDefesa = codDefesa;
    }

    public StatusDefesa getStatusDefesa() {
        return this.statusDefesa;
    }

    public Defesa statusDefesa(StatusDefesa statusDefesa) {
        this.setStatusDefesa(statusDefesa);
        return this;
    }

    public void setStatusDefesa(StatusDefesa statusDefesa) {
        this.statusDefesa = statusDefesa;
    }

    public LocalDate getData() {
        return this.data;
    }

    public Defesa data(LocalDate data) {
        this.setData(data);
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Processo getCodDefesa() {
        return this.codDefesa;
    }

    public void setCodDefesa(Processo processo) {
        this.codDefesa = processo;
    }

    public Defesa codDefesa(Processo processo) {
        this.setCodDefesa(processo);
        return this;
    }

    public Aluno getAluno() {
        return this.aluno;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Defesa aluno(Aluno aluno) {
        this.setAluno(aluno);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Defesa)) {
            return false;
        }
        return id != null && id.equals(((Defesa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Defesa{" +
            "id=" + getId() +
            ", aluno='" + getAluno() + "'" +
            ", codDefesa='" + getCodDefesa() + "'" +
            ", statusDefesa='" + getStatusDefesa() + "'" +
            ", data='" + getData() + "'" +
            "}";
    }
}
