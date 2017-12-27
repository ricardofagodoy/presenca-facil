package br.com.presencafacil.service;

import br.com.presencafacil.exception.AlunoNaoEncontradoException;
import br.com.presencafacil.exception.AulaNaoEncontradaException;
import br.com.presencafacil.exception.MateriaNaoEncontradaException;
import br.com.presencafacil.exception.ProfessorNaoEncontradoException;
import br.com.presencafacil.model.CriarAulaDTO;
import br.com.presencafacil.model.entity.Aula;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AulaService extends JpaCrudInterface<Aula, Long> {
    Aula proximaAulaProfessor(Long professorId) throws ProfessorNaoEncontradoException;

    Aula proximaAulaAluno(Long alunoId) throws AlunoNaoEncontradoException;

    Aula aulaAtualProfessor(Long professorId) throws ProfessorNaoEncontradoException;

    Aula aulaAtualAluno(Long alunoId) throws AlunoNaoEncontradoException;

    Aula save(CriarAulaDTO aula);

    List<CriarAulaDTO> saveListDTO(List<CriarAulaDTO> list);

    List<Aula> getAulaByUserId(Long userId);
}
