package br.com.presencafacil.model;

import java.io.Serializable;
import javax.validation.constraints.NotNull;

public class Credenciais implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@NotNull
	private String usuario;
	
	@NotNull
	private String senha;
	
	public Credenciais() {
	}

	public Credenciais(String usuario, String senha) {
		this.setUsuario(usuario);
		this.setSenha(senha);
	}
	
	public String getUsuario() {
		return usuario;
	}

	public void setUsuario(String usuario) {
		this.usuario = usuario;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
	@Override
	public String toString() {
		return this.getUsuario() + ":" + this.getSenha();
	}
}
