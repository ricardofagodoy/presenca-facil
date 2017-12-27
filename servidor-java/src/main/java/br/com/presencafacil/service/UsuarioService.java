package br.com.presencafacil.service;

import br.com.presencafacil.model.entity.Usuario;

public interface UsuarioService extends JpaCrudInterface<Usuario, Long> {
	Usuario findByLoginUsuario(String usuario);
	String findSenhaById(Long id);
}
