package br.com.presencafacil.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.presencafacil.model.entity.Aluno;
import br.com.presencafacil.model.entity.AulaEspecifica;

@Repository
public interface AulaEspecificaRepository extends JpaRepository<AulaEspecifica, Long> {

	@Query(value = "SELECT COUNT(ae) "
			+ "FROM AulaEspecifica ae "
            + "JOIN ae.aula aula "
            + "JOIN aula.turma turma "
            + "JOIN turma.alunos aluno "
			+ "WHERE aluno.id = ?1 AND aula.id = ?2 AND ae.dataInicio <= ?3")
	Integer aulaEspecificaCountByAulaId(Long alunoId, Long aulaId, Date today);
}
