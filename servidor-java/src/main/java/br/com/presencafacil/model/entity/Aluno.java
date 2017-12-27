package br.com.presencafacil.model.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import br.com.presencafacil.enums.Perfis;

@JsonInclude(Include.NON_NULL)
@Entity
public class Aluno extends Usuario {
	
	@ManyToMany(mappedBy = "alunos", fetch = FetchType.LAZY)
	private List<Turma> turmas;
	
	@ManyToMany(mappedBy = "presencas", fetch = FetchType.LAZY)
	private List<AulaEspecifica> presencas;

	public Aluno() {
	}
	
	public Aluno(String nome, String email, Perfil perfil, Login login) {
		super(nome, email, perfil, login);
	}
	
	@JsonIgnore
	public List<Turma> getTurmas(){
		return this.turmas;
	}
	
	public void setTurmas(List<Turma> turmas){
		this.turmas = turmas;
	}
	
	@JsonIgnore
	public List<AulaEspecifica> getPresencas() {
		return presencas;
	}

	public void setPresencas(List<AulaEspecifica> presencas) {
		this.presencas = presencas;
	}
	
	@PrePersist
	public void preenchePerfil() {
		this.setPerfil(new Perfil(Perfis.ALUNO));
	}

	@Override
	public String toString() {
		return super.toString() ;
	}
	
	public Aluno merge(Aluno a) {
		super.merge(a);
		
		return this;
	}
}
