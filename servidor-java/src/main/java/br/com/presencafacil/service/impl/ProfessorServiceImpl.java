package br.com.presencafacil.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.presencafacil.model.entity.Professor;
import br.com.presencafacil.repository.ProfessorRepository;
import br.com.presencafacil.service.ProfessorService;

@Service
public class ProfessorServiceImpl extends JpaCrudService<Professor, Long> implements ProfessorService {

	//private static final Logger logger = LoggerFactory.getLogger(AlunoServiceImpl.class);

	@Autowired
	public ProfessorServiceImpl(ProfessorRepository professorRepository) {
		super(professorRepository);
	}
	
	@Override
	public Professor save(Professor p) {
		
		if (p == null)
			return null;
		
		if (p.getId() != null) {
			
			Professor existente = this.findOne(p.getId());
			
			if (existente != null)
				p = existente.merge(p);
		}
		
		return super.save(p);
	}
}