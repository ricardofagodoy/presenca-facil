package br.com.presencafacil.model;

import br.com.presencafacil.enums.DiasSemana;
import br.com.presencafacil.model.entity.Aula;
import br.com.presencafacil.model.entity.Local;
import br.com.presencafacil.model.entity.Materia;
import br.com.presencafacil.model.entity.Turma;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class AulaDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    private Long id;

    @NotNull
    private Turma turma;

    @NotNull
    private String materia;

    @NotNull
    private String local;

    @NotNull
    private Date dataInicio;

    @NotNull
    private Date dataFim;

    @NotNull
    private List<DiasSemana> diasSemana;

    public AulaDTO(Aula aula) {
        if (aula != null) {
            this.setId(aula.getId());
            this.setTurma(aula.getTurma());
            this.setMateria(aula.getMateria().getNome());
            this.setLocal(aula.getLocal().getNome());
            this.setDataInicio(aula.getDataInicio());
            this.setDataFim(aula.getDataFim());
            this.setDiasSemana(aula.getDiasSemana());
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Turma getTurma() {
        return turma;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public String getMateria() {
        return materia;
    }

    public void setMateria(String materia) {
        this.materia = materia;
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

    @Override
    public String toString() {
        return this.getTurma() + " - " + this.getMateria() + " - " + this.getLocal();
    }
}
