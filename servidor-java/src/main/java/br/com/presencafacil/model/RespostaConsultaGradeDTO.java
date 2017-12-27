package br.com.presencafacil.model;

import br.com.presencafacil.enums.DiasSemana;
import br.com.presencafacil.model.entity.Aula;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

public class RespostaConsultaGradeDTO implements Serializable {

	private static final long serialVersionUID = 1L;

    @NotNull
    private String nomeMateria;

	@NotNull
	private String horarioInicio;

	@NotNull
	private String horarioFim;

	@NotNull
	private String local;

    @NotNull
    private List<DiasSemana> diasSemana;

	public RespostaConsultaGradeDTO(Aula a) {
	    this.nomeMateria = a.getMateria().getNome();
        this.horarioInicio = a.getHorarioInicio();
        this.horarioFim = a.getHorarioFim();
        this.local = a.getLocal().getNome();
        this.diasSemana = a.getDiasSemana();
	}

    public String getNomeMateria() {
        return nomeMateria;
    }

    public void setNomeMateria(String nomeMateria) {
        this.nomeMateria = nomeMateria;
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

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public List<DiasSemana> getDiasSemana() {
        return diasSemana;
    }

    public void setDiasSemana(List<DiasSemana> diasSemana) {
        this.diasSemana = diasSemana;
    }
}