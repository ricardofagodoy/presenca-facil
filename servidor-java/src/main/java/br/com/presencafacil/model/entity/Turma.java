package br.com.presencafacil.model.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@Entity
public class Turma {
	
	@Id
	@Column(nullable = false)
	private String id;
	
	@Column (nullable = false)
	private String nome;
	
	@ManyToMany
    @JoinTable(name="turma_aluno", joinColumns=
    {@JoinColumn(name="turma_id")}, inverseJoinColumns=
      {@JoinColumn(name="aluno_id")})
    private List<Aluno> alunos;
	
	@OneToMany(mappedBy = "turma", targetEntity = Aula.class, fetch = FetchType.LAZY)
	private List<Aula> aulas;
	
	public Turma() {
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
	
	public List<Aluno> getAlunos(){
		return this.alunos;
	}
	
	public void setAlunos(List<Aluno> alunos){
		this.alunos = alunos;		
	}
	
	public boolean adicionarAluno(Aluno a){
		if (temAluno(a.getId()))
			return true;
		
		return alunos.add(a);		
	}
	
	public boolean temAluno(Long alunoId){
		
		for (Aluno a : alunos)
			if (a.getId().equals(alunoId))
				return true;
		
		return false;
	}

	public Turma merge(Turma t) {
		
		if (t != null) {
			
			if (!StringUtils.isEmpty(t.getNome()))
					this.setNome(t.getNome());
		}
		
		return this;
	}


	@Override
	public String toString() {
		return "Turma " + this.id + " - " + this.nome;
	}
}
