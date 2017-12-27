package br.com.presencafacil.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.presencafacil.model.entity.Materia;
import br.com.presencafacil.repository.MateriaRepository;
import br.com.presencafacil.service.MateriaService;

@Service
public class MateriaServiceImpl extends JpaCrudService<Materia, String> implements MateriaService {

	// private static final Logger logger =
	// LoggerFactory.getLogger(MateriaServiceImpl.class);

	@Autowired
	public MateriaServiceImpl(MateriaRepository materiaRepository) {
		super(materiaRepository);
	}

	@Override
	public Materia save(Materia m) {

		if (m == null)
			return null;

		if (m.getId() != null) {

			Materia existente = this.findOne(m.getId());

			if (existente != null)
				m = existente.merge(m);
		}

		return super.save(m);
	}
}