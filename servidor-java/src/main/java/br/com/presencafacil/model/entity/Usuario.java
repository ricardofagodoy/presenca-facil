package br.com.presencafacil.model.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.DynamicUpdate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@JsonInclude(Include.NON_NULL)
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@DynamicUpdate
public class Usuario {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@NotNull
	private String nome;
	
	@NotNull
	private String email;
	
	@JsonProperty(access = Access.READ_ONLY)
	@Column(updatable=false)
	@DateTimeFormat(pattern = "YYYY-mm-dd")
	@Temporal(TemporalType.DATE)
	private Date criacao;
	
	@JsonProperty(access = Access.READ_ONLY)
	@ManyToOne(optional = false)
	@JoinColumn(name = "perfil")
	private Perfil perfil;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToOne(optional=false, cascade={CascadeType.ALL}, orphanRemoval=true)
	@JoinColumn(columnDefinition="login_id")
	private Login login;
	
	public Usuario() {
	}
	
	public Usuario(String nome, String email, Perfil perfil, Login login) {
		this.setNome(nome);
		this.setEmail(email);
		this.setLogin(login);
		this.setPerfil(perfil);
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCriacao() {
		return criacao;
	}
	
	public Perfil getPerfil() {
		return this.perfil;
	}

	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}

	@PrePersist
	private void insereDataCriacao() {
		this.criacao = new Date();
	}

	public Usuario merge(Usuario u) {
		
		if (u != null) {
		
			if (!StringUtils.isEmpty(u.getNome()))
					this.setNome(u.getNome());
			
			if (!StringUtils.isEmpty(u.getEmail()))
				this.setEmail(u.getEmail());
			
			if (u.getLogin() != null)
				this.login.merge(u.getLogin());
			
			if (u.getPerfil() != null)
				this.setPerfil(u.getPerfil());
		}
		
		return this;
	}
	
	@Override
	public String toString() {
		return this.getNome() + "|" + this.getEmail() + " | " + this.getPerfil();
	}
}
