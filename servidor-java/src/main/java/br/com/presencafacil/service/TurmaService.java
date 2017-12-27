package br.com.presencafacil.service;

import br.com.presencafacil.exception.AlunoNaoEncontradoException;
import br.com.presencafacil.exception.TurmaNaoEncontradaException;
import br.com.presencafacil.model.entity.Turma;

public interface TurmaService extends JpaCrudInterface<Turma, String> {
	public void adicionarAlunoTurma(String turmaId, Long alunoId) throws AlunoNaoEncontradoException, TurmaNaoEncontradaException;
}
