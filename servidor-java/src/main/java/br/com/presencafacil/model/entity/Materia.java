package br.com.presencafacil.model.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@Entity
public class Materia {

	@Id
	@Column(nullable = false)
	private String id;

	@OneToMany(mappedBy = "materia", targetEntity = Aula.class, fetch = FetchType.LAZY)
	private List<Aula> aulas;

	@Column(nullable = false)
	private String nome;

	public Materia() {
	}

	public Materia(String nome) {
		this.setNome(nome);
	}

	@JsonIgnore
	public List<Aula> getAulas() {
		return this.aulas;
	}

	public void setAulas(List<Aula> aulas) {
		this.aulas = aulas;
	}

	public String getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	@Override
	public String toString() {
		return this.id + " - " + this.nome;
	}

	public Materia merge(Materia m) {
		if (m != null) {
			if (!StringUtils.isEmpty(m.getNome()))
				this.setNome(m.getNome());
		}

		return this;
	}
}
