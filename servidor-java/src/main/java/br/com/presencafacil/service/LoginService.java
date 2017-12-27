package br.com.presencafacil.service;

import br.com.presencafacil.model.Credenciais;
import br.com.presencafacil.model.entity.Usuario;

public interface LoginService {
	Usuario fazerLogin(Credenciais credenciais);
}
