package br.com.presencafacil.service.impl;

import br.com.presencafacil.model.entity.AulaEspecifica;
import br.com.presencafacil.repository.AulaEspecificaRepository;
import br.com.presencafacil.service.AlunoService;
import br.com.presencafacil.service.AulaEspecificaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AulaEspecificaServiceImpl extends JpaCrudService<AulaEspecifica, Long> implements AulaEspecificaService {

	// private static final Logger logger =
	// LoggerFactory.getLogger(AulaServiceImpl.class);

	@Autowired
	public AulaEspecificaServiceImpl(AulaEspecificaRepository aulaEspecificaRepository) {
		super(aulaEspecificaRepository);
	}

	@Override
	public AulaEspecifica save(AulaEspecifica aula) {

		if (aula == null)
			return null;

		return super.save(aula);
	}
}