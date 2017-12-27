package br.com.presencafacil.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.presencafacil.model.Credenciais;
import br.com.presencafacil.model.entity.Usuario;
import br.com.presencafacil.service.LoginService;
import br.com.presencafacil.service.UsuarioService;
import br.com.presencafacil.util.PasswordUtils;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private UsuarioService usuarioService;

	@Override
	public Usuario fazerLogin(Credenciais credenciais) {
		
		if (credenciais == null)
			return null;
		
		Usuario usuario = this.usuarioService.findByLoginUsuario(credenciais.getUsuario());
        
		if (usuario == null)
			return null;
		
        String senha = credenciais.getSenha();
        String senhaUsuario = this.usuarioService.findSenhaById(usuario.getId());
        
        if (PasswordUtils.matchPasswords(senha, senhaUsuario))
        		return usuario;
        
        return null;
	}
}
