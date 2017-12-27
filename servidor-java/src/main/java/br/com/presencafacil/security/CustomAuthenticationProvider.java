package br.com.presencafacil.security;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import br.com.presencafacil.model.Credenciais;
import br.com.presencafacil.model.entity.Usuario;
import br.com.presencafacil.service.LoginService;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private LoginService loginService;

	@Override
	public CustomAuthenticationToken authenticate(Authentication authentication) throws AuthenticationException {

		String usuario = authentication.getName();
		String senha = authentication.getCredentials().toString();

		if (!StringUtils.isEmpty(usuario)) {

			Usuario usuarioLogado = this.loginService.fazerLogin(new Credenciais(usuario, senha));

			if (usuarioLogado != null)
				return new CustomAuthenticationToken(usuario, senha, getAuthorities(usuarioLogado), usuarioLogado);
		}

		return null;
	}
	
	private List<GrantedAuthority> getAuthorities(Usuario usuario) {

		List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        
		if (usuario != null)
			grantedAuthorities.add(new SimpleGrantedAuthority(usuario.getPerfil().toString()));
        
		return grantedAuthorities;
    }

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(CustomAuthenticationToken.class);
	}
}
