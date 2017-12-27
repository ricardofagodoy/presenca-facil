package br.com.presencafacil.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.presencafacil.model.entity.Usuario;
import br.com.presencafacil.repository.UsuarioRepository;
import br.com.presencafacil.service.UsuarioService;

@Service
public class UsuarioServiceImpl extends JpaCrudService<Usuario, Long> implements UsuarioService {

	private static final Logger logger = LoggerFactory.getLogger(UsuarioServiceImpl.class);

	private UsuarioRepository usuarioRepository;

	@Autowired
	public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
		super(usuarioRepository);

		this.usuarioRepository = usuarioRepository;
	}

	@Override
	public Usuario findByLoginUsuario(String usuario) {
		logger.info("Finding Usuario by login username");
		return this.usuarioRepository.findByLoginUsuario(usuario);
	}

	@Override
	public String findSenhaById(Long id) {
		logger.info("Finding Senha by Id {}", id);
		return this.usuarioRepository.findSenhaByUsuarioId(id);
	}
}