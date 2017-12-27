package br.com.presencafacil.repository;

import br.com.presencafacil.enums.DiasSemana;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.presencafacil.model.entity.Aula;

import java.util.List;

@Repository
public interface AulaRepository extends JpaRepository<Aula, Long> {

	@Query(value = "SELECT ae.id, ae.data_inicio, ae.data_fim, a.horario_fim, a.horario_inicio, a.local_id, a.materia_id, a.professor_id, a.turma_id "
			+ "FROM Aula a "
			+ "INNER JOIN Aula_Especifica ae ON "
			+ "ae.aula_id = a.id "
			+ "WHERE a.professor_id=?1 AND ae.data_inicio >= NOW() ORDER BY ae.data_inicio LIMIT 1", nativeQuery = true)
	Aula findProximaAulaByProfessor(Long id);

	@Query(value = "SELECT ae.id, ae.data_inicio, ae.data_fim, a.horario_fim, a.horario_inicio, a.local_id, a.materia_id, a.professor_id, a.turma_id "
			+ "FROM Aula a "
			+ "INNER JOIN Turma_Aluno t "
			+ "ON t.aluno_id = ?1 "
			+ "INNER JOIN Aula_Especifica ae "
			+ "ON ae.aula_id = a.id "
			+ "WHERE a.turma_id = t.turma_id AND ae.data_inicio >= NOW() ORDER BY ae.data_inicio LIMIT 1", nativeQuery = true)
	Aula findProximaAulaByAluno(Long id);


	@Query(value = "SELECT ae.id, ae.data_inicio, ae.data_fim, a.horario_fim, a.horario_inicio, a.local_id, a.materia_id, a.professor_id, a.turma_id "
			+ "FROM Aula a "
			+ "INNER JOIN Aula_Especifica ae ON "
			+ "ae.aula_id = a.id "
			+ "WHERE a.professor_id=?1 AND ae.data_inicio <= NOW() AND ae.data_fim >= NOW()", nativeQuery = true)
	Aula findAulaAtualByProfessor(Long id);

	@Query(value = "SELECT ae.id, ae.data_inicio, ae.data_fim, a.horario_fim, a.horario_inicio, a.local_id, a.materia_id, a.professor_id, a.turma_id "
			+ "FROM Aula a "
			+ "INNER JOIN Turma_Aluno t "
			+ "ON t.aluno_id = ?1 "
			+ "INNER JOIN Aula_Especifica ae "
			+ "ON ae.aula_id = a.id "
			+ "WHERE a.turma_id = t.turma_id AND ae.data_inicio <= NOW() AND ae.data_fim >= NOW()", nativeQuery = true)
	Aula findAulaAtualByAluno(Long id);

	List<Aula> findAulaByTurmaAlunosId(Long id);

    @Query(value = "SELECT a.id, a.data_inicio, a.data_fim, a.horario_fim, a.horario_inicio, a.local_id, a.materia_id, a.professor_id, a.turma_id "
            + "FROM Aula a "
            + "WHERE a.professor_id=?1 "
            + "UNION SELECT a.id, a.data_inicio, a.data_fim, a.horario_fim, a.horario_inicio, a.local_id, a.materia_id, a.professor_id, a.turma_id "
            + "FROM Aula a "
            + "INNER JOIN Turma_Aluno t "
            + "ON a.turma_id = t.turma_id "
            + "WHERE t.aluno_id = ?1", nativeQuery = true)
    List<Aula> findAulaByUserId(Long userId);



    /*@Query(value = "SELECT COUNT(ae) "
            + "FROM AulaEspecifica ae "
            + "JOIN ae.aula aula "
            + "JOIN aula.turma turma "
            + "JOIN turma.alunos aluno "
            + "WHERE aluno.id = ?1 AND aula.id = ?2 AND ae.dataInicio <= ?3")
    Integer aulaEspecificaCountByAulaId(Long alunoId, Long aulaId, Date today);*/

	List<DiasSemana> getDiasSemanaById(Long id);

}
