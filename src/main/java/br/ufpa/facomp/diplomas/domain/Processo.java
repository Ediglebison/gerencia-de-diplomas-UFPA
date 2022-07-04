package br.ufpa.facomp.diplomas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Processo.
 */
@Entity
@Table(name = "processo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Processo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "sipac")
    private String sipac;

    @Column(name = "inicio")
    private LocalDate inicio;

    @Column(name = "defesa")
    private String defesa;

    @Column(name = "enviado_biblioteca")
    private Boolean enviadoBiblioteca;

    @Column(name = "entrega_diploma")
    private Boolean entregaDiploma;

    @OneToMany(mappedBy = "codDefesa")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "codDefesa", "aluno" }, allowSetters = true)
    private Set<Defesa> defesas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Processo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSipac() {
        return this.sipac;
    }

    public Processo sipac(String sipac) {
        this.setSipac(sipac);
        return this;
    }

    public void setSipac(String sipac) {
        this.sipac = sipac;
    }

    public LocalDate getInicio() {
        return this.inicio;
    }

    public Processo inicio(LocalDate inicio) {
        this.setInicio(inicio);
        return this;
    }

    public void setInicio(LocalDate inicio) {
        this.inicio = inicio;
    }

    public String getDefesa() {
        return this.defesa;
    }

    public Processo defesa(String defesa) {
        this.setDefesa(defesa);
        return this;
    }

    public void setDefesa(String defesa) {
        this.defesa = defesa;
    }

    public Boolean getEnviadoBiblioteca() {
        return this.enviadoBiblioteca;
    }

    public Processo enviadoBiblioteca(Boolean enviadoBiblioteca) {
        this.setEnviadoBiblioteca(enviadoBiblioteca);
        return this;
    }

    public void setEnviadoBiblioteca(Boolean enviadoBiblioteca) {
        this.enviadoBiblioteca = enviadoBiblioteca;
    }

    public Boolean getEntregaDiploma() {
        return this.entregaDiploma;
    }

    public Processo entregaDiploma(Boolean entregaDiploma) {
        this.setEntregaDiploma(entregaDiploma);
        return this;
    }

    public void setEntregaDiploma(Boolean entregaDiploma) {
        this.entregaDiploma = entregaDiploma;
    }

    public Set<Defesa> getDefesas() {
        return this.defesas;
    }

    public void setDefesas(Set<Defesa> defesas) {
        if (this.defesas != null) {
            this.defesas.forEach(i -> i.setCodDefesa(null));
        }
        if (defesas != null) {
            defesas.forEach(i -> i.setCodDefesa(this));
        }
        this.defesas = defesas;
    }

    public Processo defesas(Set<Defesa> defesas) {
        this.setDefesas(defesas);
        return this;
    }

    public Processo addDefesa(Defesa defesa) {
        this.defesas.add(defesa);
        defesa.setCodDefesa(this);
        return this;
    }

    public Processo removeDefesa(Defesa defesa) {
        this.defesas.remove(defesa);
        defesa.setCodDefesa(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Processo)) {
            return false;
        }
        return id != null && id.equals(((Processo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Processo{" +
            "id=" + getId() +
            ", sipac='" + getSipac() + "'" +
            ", inicio='" + getInicio() + "'" +
            ", defesa='" + getDefesa() + "'" +
            ", enviadoBiblioteca='" + getEnviadoBiblioteca() + "'" +
            ", entregaDiploma='" + getEntregaDiploma() + "'" +
            "}";
    }
}
