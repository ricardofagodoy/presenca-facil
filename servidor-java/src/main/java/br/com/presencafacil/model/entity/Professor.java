package br.com.presencafacil.model.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import br.com.presencafacil.enums.Perfis;

@JsonInclude(Include.NON_NULL)
@Entity
public class Professor extends Usuario {

    @OneToMany(mappedBy = "professor", targetEntity = Aula.class, fetch = FetchType.LAZY)
    private List<Aula> aulas;

    public Professor() {
    }

    public Professor(String nome, String email, Perfil perfil, Login login) {
        super(nome, email, perfil, login);
    }

    @PrePersist
    public void preenchePerfil() {
        this.setPerfil(new Perfil(Perfis.PROFESSOR));
    }

    @Override
    public String toString() {
        return super.toString();
    }

    public Professor merge(Professor a) {
        super.merge(a);

        return this;
    }
}
