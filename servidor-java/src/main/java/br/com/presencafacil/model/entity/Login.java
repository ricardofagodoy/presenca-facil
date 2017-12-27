package br.com.presencafacil.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotNull;
import org.springframework.util.StringUtils;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import br.com.presencafacil.util.PasswordUtils;

@JsonInclude(Include.NON_NULL)
@Entity
public class Login {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Column(unique = true)
	private String usuario;

	@JsonProperty(access = Access.WRITE_ONLY)
	@Column(nullable = false)
	private String senha;

	public Login() {
	}

	public Login(String usuario, String senha) {
		this.usuario = usuario;
		this.senha = senha;
	}

	public Long getId() {
		return id;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getUsuario() {
		return usuario;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getSenha() {
		return this.senha;
	}

	public String toString() {
		return this.getId() + ": " + this.usuario;
	}

	public void merge(Login l) {

		if (l == null)
			return;

		if (!StringUtils.isEmpty(l.getUsuario()))
			this.setUsuario(l.getUsuario());

		if (!StringUtils.isEmpty(l.getSenha()))
			this.setSenha(PasswordUtils.hashPassword(l.getSenha()));
	}

	@PrePersist
	public void hashSenha() {
		if (!StringUtils.isEmpty(this.senha))
			this.setSenha(PasswordUtils.hashPassword(this.senha));
	}
}
