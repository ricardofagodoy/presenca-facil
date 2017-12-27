package br.com.presencafacil.model.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@Entity
public class AulaEspecifica {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "aula_id")
	private Aula aula;

	@Column(name = "data_inicio", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataInicio;

	@Column(name = "data_fim", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataFim;

	@ManyToMany
	@JoinTable(name = "Aula_Especifica_Aluno", joinColumns = {
			@JoinColumn(name = "aula_especifica_id") }, inverseJoinColumns = { @JoinColumn(name = "aluno_id") })
	private List<Aluno> presencas;

	public AulaEspecifica() {
	}

	public AulaEspecifica(Aula aula, Date dataInicio, Date dataFim) {
		this.setAula(aula);
		this.setDataInicio(dataInicio);
		this.setDataFim(dataFim);
	}

	public Aula getAula() {
		return aula;
	}

	public void setAula(Aula aula) {
		this.aula = aula;
	}

	public Date getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(Date dataInicio) {
		this.dataInicio = dataInicio;
	}

	public Date getDataFim() {
		return dataFim;
	}

	public void setDataFim(Date dataFim) {
		this.dataFim = dataFim;
	}

	public Long getId() {
		return id;
	}

	public boolean executarPresenca(List<Aluno> a) {
		if (a == null)
			return false;
		
		for(Aluno aluno : a)
			if (!presencas.contains(aluno))
				presencas.add(aluno);
		
		return true;
	}

	@Override
	public String toString() {
		return this.id + " - " + this.getAula() + " - " + this.getDataInicio() + " - " + this.getDataFim();
	}

	public AulaEspecifica merge(AulaEspecifica a) {
		if (a != null) {
			if (!StringUtils.isEmpty(a.getAula()))
				this.setAula(a.getAula());

			if (!StringUtils.isEmpty(a.getDataInicio()))
				this.setDataInicio(a.getDataInicio());

			if (!StringUtils.isEmpty(a.getDataFim()))
				this.setDataFim(a.getDataFim());
		}

		return this;
	}

}
