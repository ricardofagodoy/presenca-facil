package br.com.presencafacil.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import java.util.List;

@JsonInclude(Include.NON_NULL)
@Entity
public class Local {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@OneToMany(mappedBy = "local", targetEntity = Aula.class, fetch = FetchType.LAZY)
	private List<Aula> aulas;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String deviceId;

	public Local() {
	}

	public Local(String nome, String deviceId) {
		this.setNome(nome);
		this.setDeviceId(deviceId);
	}

	@JsonIgnore
	public List<Aula> getAulas() {
		return this.aulas;
	}

	public void setAulas(List<Aula> aulas) {
		this.aulas = aulas;
	}

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

	@Override
	public String toString() {
		return this.id + " - " + this.nome + " - " + this.getDeviceId();
	}

	public Local merge(Local l) {
		if (l != null) {
			if (!StringUtils.isEmpty(l.getNome()))
				this.setNome(l.getNome());
		}

		return this;
	}
}
