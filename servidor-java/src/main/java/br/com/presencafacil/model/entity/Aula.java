package br.com.presencafacil.model.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import br.com.presencafacil.enums.DiasSemana;

@JsonInclude(Include.NON_NULL)
@Entity
public class Aula {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@ManyToOne
	@JoinColumn(name="materia_id")
	private Materia materia;
	
	@ManyToOne
	@JoinColumn(name="turma_id")
	private Turma turma;
	
	@ManyToOne
	@JoinColumn(name="professor_id")
	private Professor professor;
	
	@OneToMany(mappedBy = "aula", targetEntity = AulaEspecifica.class, fetch = FetchType.LAZY)
	private List<AulaEspecifica> aulasEspecificas;

	@ManyToOne
	@JoinColumn(name="local_id")
	private Local local;
	
	@Column(name = "horario_inicio", nullable = false)
	private String horarioInicio;
	
	@Column(name = "horario_fim", nullable = false)
	private String horarioFim;

	@Column(name = "data_inicio", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataInicio;
	
	@Column(name = "data_fim", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataFim;
	
	@NotNull
	@ElementCollection(targetClass = DiasSemana.class)
	@JoinTable(name = "Aula_DiasSemana", joinColumns = @JoinColumn(name = "aula_id"))
	@Enumerated(EnumType.STRING)
	@Column(name = "dias_semana", nullable = false)
	private List<DiasSemana> diasSemana;
	
	public Aula() {
	}

	public Aula(Turma turma, Materia materia, Professor professor, Local local, String horarioInicio, String horarioFim, Date dataInicio, Date dataFim, List<DiasSemana> diasSemana) {
		this.setMateria(materia);
		this.setTurma(turma);
		this.setProfessor(professor);
		this.setLocal(local);
		this.setHorarioInicio(horarioInicio);
		this.setHorarioFim(horarioFim);
		this.setDataInicio(dataInicio);
		this.setDataFim(dataFim);
		this.setDiasSemana(diasSemana);
	}	

	public Materia getMateria() {
		return materia;
	}

	public void setMateria(Materia materia) {
		this.materia = materia;
	}

	public Turma getTurma() {
		return turma;
	}

	public void setTurma(Turma turma) {
		this.turma = turma;
	}

	public Professor getProfessor() {
		return professor;
	}

	public void setProfessor(Professor professor) {
		this.professor = professor;
	}

	public Local getLocal() {
		return local;
	}

	public void setLocal(Local local) {
		this.local = local;
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

	public List<DiasSemana> getDiasSemana() {
		return diasSemana;
	}

	public void setDiasSemana(List<DiasSemana> diasSemana) {
		this.diasSemana = diasSemana;
	}

	@JsonIgnore
	public List<AulaEspecifica> getAulasEspecificas() {
		return aulasEspecificas;
	}

	public void setAulasEspecificas(List<AulaEspecifica> aulasEspecificas) {
		this.aulasEspecificas = aulasEspecificas;
	}

	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return this.id + " - " + this.getTurma() + " - " + this.getMateria() + " - " + this.getProfessor() + " - " + this.getDataInicio() + " a " + this.getDataFim();
	}

	public Aula merge(Aula a) {
		if (a != null) {
			if (!StringUtils.isEmpty(a.getTurma()))
				this.setTurma(a.getTurma());
			
			if (!StringUtils.isEmpty(a.getMateria()))
				this.setMateria(a.getMateria());

            if (!StringUtils.isEmpty(a.getLocal()))
                this.setLocal(a.getLocal());
			
			if (!StringUtils.isEmpty(a.getProfessor()))
				this.setProfessor(a.getProfessor());
			
			if (!StringUtils.isEmpty(a.getDataInicio()))
				this.setDataInicio(a.getDataInicio());
			
			if (!StringUtils.isEmpty(a.getDataFim()))
				this.setDataFim(a.getDataFim());
			
			if (!StringUtils.isEmpty(a.getAulasEspecificas()))
				this.setAulasEspecificas(a.getAulasEspecificas());
		}

		return this;
	}

}
