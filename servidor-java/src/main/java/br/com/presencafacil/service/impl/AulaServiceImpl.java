package br.com.presencafacil.service.impl;

import br.com.presencafacil.model.CriarAulaDTO;
import br.com.presencafacil.model.entity.*;
import br.com.presencafacil.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.presencafacil.exception.AlunoNaoEncontradoException;
import br.com.presencafacil.exception.AulaNaoEncontradaException;
import br.com.presencafacil.exception.MateriaNaoEncontradaException;
import br.com.presencafacil.exception.ProfessorNaoEncontradoException;
import br.com.presencafacil.repository.AulaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AulaServiceImpl extends JpaCrudService<Aula, Long> implements AulaService {
	
	@Autowired
	private TurmaService turmaService;
	
	@Autowired
	private MateriaService materiaService;

	@Autowired
	private LocalService localService;
	
	@Autowired
	private ProfessorService professorService;
	
	@Autowired
	private AlunoService alunoService;
	
	private AulaRepository aulaRepository;
	
	// private static final Logger logger =
	// LoggerFactory.getLogger(AulaServiceImpl.class);

	@Autowired
	public AulaServiceImpl(AulaRepository aulaRepository) {
		super(aulaRepository);
		
		this.aulaRepository = aulaRepository;
	}
	
	@Override
	public Aula aulaAtualProfessor(Long professorId) throws ProfessorNaoEncontradoException{
		
		if (!this.professorService.exists(professorId))
			throw new ProfessorNaoEncontradoException();
		
		return this.aulaRepository.findAulaAtualByProfessor(professorId);
	}
	
	@Override
	public Aula aulaAtualAluno(Long alunoId) throws AlunoNaoEncontradoException{
		
		if (!this.alunoService.exists(alunoId))
			throw new AlunoNaoEncontradoException();
		
		return this.aulaRepository.findAulaAtualByAluno(alunoId);
	}	
	
	@Override
	public Aula proximaAulaProfessor(Long professorId) throws ProfessorNaoEncontradoException{
		
		if (!this.professorService.exists(professorId))
			throw new ProfessorNaoEncontradoException();
		
		return this.aulaRepository.findProximaAulaByProfessor(professorId);
	}
	
	@Override
	public Aula proximaAulaAluno(Long alunoId) throws AlunoNaoEncontradoException{
		
		if (!this.alunoService.exists(alunoId))
			throw new AlunoNaoEncontradoException();
		
		return this.aulaRepository.findProximaAulaByAluno(alunoId);
	}

	@Override
	public List<Aula> getAulaByUserId(Long userId){
		return this.aulaRepository.findAulaByUserId(userId);
	}


	@Override
	public Aula save(CriarAulaDTO aula) {
		
		Turma turma = null;
		Materia materia = null;
		Professor professor = null;
        Local local = null;

		if (aula == null)
			return null;

		if (aula.getTurma() != null) {
			turma = turmaService.findOne(aula.getTurma());
		}
		
		if (aula.getMateria() != null) {
			materia = materiaService.findOne(aula.getMateria());
		}
		
		if (aula.getProfessor() != null) {
			professor = professorService.findOne(aula.getProfessor());
		}

        if (aula.getLocal() != null) {
            local = localService.findOne(aula.getLocal());
        }

		return super.save(new Aula(turma, materia, professor, local, aula.getHorarioInicio(), aula.getHorarioFim(), aula.getDataInicio(), aula.getDataFim(), aula.getDiasSemana()));
	}


    @Override
    @Transactional(rollbackFor = {Exception.class})
    public List<CriarAulaDTO> saveListDTO(List<CriarAulaDTO> list) {
        if (list == null)
            return null;

        for (int i = 0; i < list.size(); i++) {
            try {
                this.save(list.get(i));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return null;
    }
}