package br.com.presencafacil.repository;

import br.com.presencafacil.model.entity.Local;
import br.com.presencafacil.model.entity.Materia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {
	
}
