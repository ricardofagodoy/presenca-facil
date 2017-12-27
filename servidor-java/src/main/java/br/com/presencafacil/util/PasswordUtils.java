package br.com.presencafacil.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordUtils {
	
	private static final BCryptPasswordEncoder passwordEncoder;
	
	static {
		passwordEncoder = new BCryptPasswordEncoder();
	}
	
	public static String hashPassword(String password) {
		return passwordEncoder.encode(password);
	}
	
	public static boolean matchPasswords(String rawPassword, String encodedPassword) {
		return passwordEncoder.matches(rawPassword, encodedPassword);
	}
}
