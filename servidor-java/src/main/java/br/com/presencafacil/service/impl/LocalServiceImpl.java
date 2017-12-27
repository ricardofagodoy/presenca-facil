package br.com.presencafacil.service.impl;

import br.com.presencafacil.model.entity.Local;
import br.com.presencafacil.repository.LocalRepository;
import br.com.presencafacil.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocalServiceImpl extends JpaCrudService<Local, Long> implements LocalService {

	// private static final Logger logger =
	// LoggerFactory.getLogger(LocalServiceImpl.class);

	@Autowired
	public LocalServiceImpl(LocalRepository localRepository) {
		super(localRepository);
	}

	@Override
	public Local save(Local l) {

		if (l == null)
			return null;

		if (l.getId() != null) {

			Local existente = this.findOne(l.getId());

			if (existente != null)
				l = existente.merge(l);
		}

		return super.save(l);
	}
}