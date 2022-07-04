package br.ufpa.facomp.diplomas.domain;

import br.ufpa.facomp.diplomas.domain.enumeration.StatusSIGAA;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Aluno.
 */
@Entity
@Table(name = "aluno")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Aluno implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "matricula")
    private String matricula;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_sigaa")
    private StatusSIGAA statusSIGAA;

    @OneToMany(mappedBy = "aluno")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "codDefesa", "aluno" }, allowSetters = true)
    private Set<Defesa> nomes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Aluno id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Aluno nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMatricula() {
        return this.matricula;
    }

    public Aluno matricula(String matricula) {
        this.setMatricula(matricula);
        return this;
    }

    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }

    public StatusSIGAA getStatusSIGAA() {
        return this.statusSIGAA;
    }

    public Aluno statusSIGAA(StatusSIGAA statusSIGAA) {
        this.setStatusSIGAA(statusSIGAA);
        return this;
    }

    public void setStatusSIGAA(StatusSIGAA statusSIGAA) {
        this.statusSIGAA = statusSIGAA;
    }

    public Set<Defesa> getNomes() {
        return this.nomes;
    }

    public void setNomes(Set<Defesa> defesas) {
        if (this.nomes != null) {
            this.nomes.forEach(i -> i.setAluno(null));
        }
        if (defesas != null) {
            defesas.forEach(i -> i.setAluno(this));
        }
        this.nomes = defesas;
    }

    public Aluno nomes(Set<Defesa> defesas) {
        this.setNomes(defesas);
        return this;
    }

    public Aluno addNome(Defesa defesa) {
        this.nomes.add(defesa);
        defesa.setAluno(this);
        return this;
    }

    public Aluno removeNome(Defesa defesa) {
        this.nomes.remove(defesa);
        defesa.setAluno(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aluno)) {
            return false;
        }
        return id != null && id.equals(((Aluno) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aluno{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", matricula='" + getMatricula() + "'" +
            ", statusSIGAA='" + getStatusSIGAA() + "'" +
            "}";
    }
}
