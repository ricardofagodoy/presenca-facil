package br.com.presencafacil;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages="br.com.presencafacil")
public class PresencaFacilServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PresencaFacilServerApplication.class, args);
	}
}
