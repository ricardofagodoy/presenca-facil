package br.com.presencafacil.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.presencafacil.controller.base.BaseController;
import br.com.presencafacil.model.Message;
import br.com.presencafacil.repository.PerfilRepository;

@RestController
@RequestMapping("/perfil")
public class PerfilController extends BaseController {
	
	private static final Logger logger = LoggerFactory.getLogger(PerfilController.class);
	
	@Autowired
	private PerfilRepository perfilRepository;
	
	@RequestMapping(method=RequestMethod.GET)
    public ResponseEntity<Message> perfil() {
		
		logger.info("Listando todos os perfis");
         
        return ok("Sucesso", this.perfilRepository.findAll());
    }
}
