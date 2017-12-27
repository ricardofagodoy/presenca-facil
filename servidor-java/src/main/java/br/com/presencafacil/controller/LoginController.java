package br.com.presencafacil.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.presencafacil.controller.base.BaseController;
import br.com.presencafacil.model.Credenciais;
import br.com.presencafacil.model.Message;
import br.com.presencafacil.security.CustomAuthenticationProvider;
import br.com.presencafacil.security.CustomAuthenticationToken;
import br.com.presencafacil.util.SecuritySessionUtils;

@RestController
public class LoginController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private CustomAuthenticationProvider customAuthProvider;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Message> login(@Valid @RequestBody Credenciais credenciais, HttpServletRequest request) {

        logger.info("Tentativa de login: {}", credenciais);

        // Build credentials token
        Authentication authCredentials = new PreAuthenticatedAuthenticationToken(credenciais.getUsuario(),
                credenciais.getSenha());

        // Try to authenticate
        CustomAuthenticationToken authResult = null;

        if ((authResult = customAuthProvider.authenticate(authCredentials)) == null)
            return badRequest("Usuario ou senha incorretos", credenciais);

        SecuritySessionUtils.login(request.getSession(true), authResult);

        return ok("Sucesso", authResult.getUsuario());
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ResponseEntity<Message> logout(HttpServletRequest request) {

        logger.info("Fazendo logout");

        SecuritySessionUtils.logout(request.getSession());

        return ok("Sucesso", null);
    }
}
