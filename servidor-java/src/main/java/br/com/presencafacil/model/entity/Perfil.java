package br.com.presencafacil.model.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import br.com.presencafacil.enums.Perfis;

@Entity
public class Perfil {
	
	@Id
	@NotNull
	@Enumerated(EnumType.STRING)
	private Perfis nome;

	public Perfil() {
	}
	
	public Perfil(Perfis perfil) {
		this.nome = perfil;
	}

	public Perfis getNome() {
		return nome;
	}

	public String toString() {
		return this.getNome().getRole();
	}
}
