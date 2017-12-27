package br.com.presencafacil.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import br.com.presencafacil.enums.Perfis;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http
		.csrf().disable()
		.authorizeRequests()
		//.antMatchers("/perfil/**").hasRole(Perfis.ADMIN.name())
		//.antMatchers("/aluno/**").hasRole(Perfis.ADMIN.name())
		.anyRequest().permitAll()
		.and()
		.logout().disable()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED);
	}
}
