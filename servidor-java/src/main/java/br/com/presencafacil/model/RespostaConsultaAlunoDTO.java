package br.com.presencafacil.model;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

public class RespostaConsultaAlunoDTO implements Serializable {

	private static final long serialVersionUID = 1L;

    @NotNull
    private final Integer porcentagem;

	@NotNull
	private final String nomeMateria;

	public RespostaConsultaAlunoDTO(Integer porcentagem, String nomeMateria) {
	    this.porcentagem = porcentagem;
	    this.nomeMateria = nomeMateria;
	}

    public Integer getPorcentagem() {
        return porcentagem;
    }

    public String getNomeMateria() {
        return nomeMateria;
    }


    @Override
	public String toString() {
		return this.getNomeMateria() + " - " + this.getPorcentagem();
	}
}