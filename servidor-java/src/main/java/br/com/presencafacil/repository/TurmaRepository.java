package br.com.presencafacil.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.presencafacil.model.entity.Turma;

@Repository
public interface TurmaRepository extends JpaRepository<Turma, String> {
	
}
