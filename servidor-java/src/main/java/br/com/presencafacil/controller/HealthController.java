package br.com.presencafacil.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
	
	@Value("${application.name}")
	private String appName;
	
	@RequestMapping(value = "/", method=RequestMethod.GET)
    public String health() {
        return this.appName + " up and running!";
    }
}
