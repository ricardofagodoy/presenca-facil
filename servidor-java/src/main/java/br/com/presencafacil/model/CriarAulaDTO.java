package br.com.presencafacil.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotNull;

import br.com.presencafacil.enums.DiasSemana;
import br.com.presencafacil.model.entity.Local;

public class CriarAulaDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@NotNull
	private String turma;
	
	@NotNull
	private String materia;
	
	@NotNull
	private Long professor;
	
	@NotNull
	private Long local;
	
	@NotNull
	private String horarioInicio;
	
	@NotNull
	private String horarioFim;
	
	@NotNull
	private Date dataInicio;
	
	@NotNull
	private Date dataFim;
	
	@NotNull
	private List<DiasSemana> diasSemana;
	
	public CriarAulaDTO() {
	}
	
	public String getTurma() {
		return turma;
	}

	public void setTurma(String turma) {
		this.turma = turma;
	}
	
	public String getMateria() {
		return materia;
	}

	public void setMateria(String materia) {
		this.materia = materia;
	}
	
	public Long getProfessor() {
		return professor;
	}

	public void setProfessor(Long professor) {
		this.professor = professor;
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

	public String getHorarioInicio() {
		return horarioInicio;
	}

	public void setHorarioInicio(String horarioInicio) {
		this.horarioInicio = horarioInicio;
	}

	public String getHorarioFim() {
		return horarioFim;
	}

	public void setHorarioFim(String horarioFim) {
		this.horarioFim = horarioFim;
	}

	public Long getLocal() {
		return local;
	}

	public void setLocal(Long local) {
		this.local = local;
	}

	public List<DiasSemana> getDiasSemana() {
		return diasSemana;
	}

	public void setDiasSemana(List<DiasSemana> diasSemana) {
		this.diasSemana = diasSemana;
	}

	@Override
	public String toString() {
		return this.getTurma() + " - " + this.getMateria() + " - " + this.getProfessor();
	}
}
