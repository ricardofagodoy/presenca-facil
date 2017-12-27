package br.com.presencafacil.enums;

public enum Perfis {
	ADMIN,
	PROFESSOR,
	ALUNO;
	
	public String getRole() {
		return "ROLE_" + this.name();
	}
}
