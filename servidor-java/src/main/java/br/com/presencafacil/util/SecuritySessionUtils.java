package br.com.presencafacil.util;

import javax.servlet.http.HttpSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecuritySessionUtils {
	
	public static final String SPRING_SECURITY_SESSION_ATTRIBUTE = "SPRING_SECURITY_CONTEXT";
	
	public static void login(HttpSession session, Authentication user) {
		
		SecurityContext securityContext = SecurityContextHolder.getContext();
		
		if (securityContext == null || session == null)
			return;
		
		securityContext.setAuthentication(user);
		session.setAttribute(SPRING_SECURITY_SESSION_ATTRIBUTE, securityContext);
	}
	
	public static void logout(HttpSession session) {
		
		SecurityContext securityContext = SecurityContextHolder.getContext();
		
		if (securityContext == null || session == null)
			return;
		
		securityContext.setAuthentication(null);
		session.removeAttribute(SPRING_SECURITY_SESSION_ATTRIBUTE);
	}
}
