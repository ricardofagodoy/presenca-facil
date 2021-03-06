package br.com.presencafacil.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.presencafacil.model.entity.Materia;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, String> {
	
}
