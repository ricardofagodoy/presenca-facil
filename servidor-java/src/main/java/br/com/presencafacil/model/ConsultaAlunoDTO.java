package br.com.presencafacil.model;

import br.com.presencafacil.enums.DiasSemana;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ConsultaAlunoDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	@NotNull
	private Long alunoId;

	@NotNull
	private Long aulaId;

	private Long dataInicio;

	private Long dataFim;

	public ConsultaAlunoDTO() {
	}
	
	public Long getAluno() {
		return alunoId;
	}

	public void setAluno(Long alunoId) {
		this.alunoId = alunoId;
	}

	public Long getAula() {
		return aulaId;
	}

	public void setAula(Long aulaId) {
		this.aulaId = aulaId;
	}

	public Long getDataInicio() {
		return dataInicio;
	}

	public void setDataInicio(Long dataInicio) {
		this.dataInicio = dataInicio;
	}

	public Long getDataFim() {
		return dataFim;
	}

	public void setDataFim(Long dataFim) {
		this.dataFim = dataFim;
	}


	@Override
	public String toString() {
		return this.getAluno() + " - " + this.getAula() + " - " + this.getDataInicio() + " - " + this.getDataFim();
	}
}
