package br.com.presencafacil.security;

import java.util.Collection;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import br.com.presencafacil.model.entity.Usuario;

public class CustomAuthenticationToken extends UsernamePasswordAuthenticationToken {

	private static final long serialVersionUID = 2207452920422978875L;

	private Usuario usuario;

	public CustomAuthenticationToken(Object principal, Object credentials,
			Collection<? extends GrantedAuthority> authorities) {
		super(principal, credentials, authorities);
	}

	public CustomAuthenticationToken(Object principal, Object credentials) {
		this(principal, credentials, null);
	}

	public CustomAuthenticationToken(Object principal, Object credentials,
			Collection<? extends GrantedAuthority> authorities, Usuario usuario) {
		this(principal, credentials, authorities);
		this.usuario = usuario;
	}

	public Usuario getUsuario() {
		return this.usuario;
	}
}
