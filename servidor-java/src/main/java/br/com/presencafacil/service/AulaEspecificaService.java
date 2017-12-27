package br.com.presencafacil.service;

import br.com.presencafacil.exception.AlunoNaoEncontradoException;
import br.com.presencafacil.exception.AulaEspecificaNaoEncontradaException;
import br.com.presencafacil.model.entity.AulaEspecifica;

public interface AulaEspecificaService extends JpaCrudInterface<AulaEspecifica, Long> {

}
