package br.com.presencafacil.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.presencafacil.exception.AlunoNaoEncontradoException;
import br.com.presencafacil.exception.TurmaNaoEncontradaException;
import br.com.presencafacil.model.entity.Aluno;
import br.com.presencafacil.model.entity.Turma;
import br.com.presencafacil.repository.TurmaRepository;
import br.com.presencafacil.service.AlunoService;
import br.com.presencafacil.service.TurmaService;

@Service
public class TurmaServiceImpl extends JpaCrudService<Turma, String> implements TurmaService {
	
	@Autowired
	private AlunoService alunoService;

	// private static final Logger logger =
	// LoggerFactory.getLogger(TurmaServiceImpl.class);

	@Autowired
	public TurmaServiceImpl(TurmaRepository turmaRepository) {
		super(turmaRepository);
	}

	@Override
	public void adicionarAlunoTurma(String turmaId, Long alunoId) throws TurmaNaoEncontradaException, AlunoNaoEncontradoException {
		
		Turma turma = this.findOne(turmaId);

		if (turma == null)
			throw new TurmaNaoEncontradaException();

		Aluno aluno = this.alunoService.load(alunoId);

		if (aluno == null)
			throw new AlunoNaoEncontradoException();

		turma.adicionarAluno(aluno);
		
		this.save(turma);
	}

	@Override
	public Turma save(Turma t) {

		if (t == null)
			return null;

		if (t.getId() != null) {

			Turma existente = this.findOne(t.getId());

			if (existente != null)
				t = existente.merge(t);
		}

		return super.save(t);
	}
}