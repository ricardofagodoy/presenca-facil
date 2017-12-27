package br.com.presencafacil.controller.base;

import br.com.presencafacil.model.Message;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

public abstract class BaseController {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected Message handleMessageNotReadableException() {
        return new Message("JSON de formato invalido.");
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected Message handleMethodArgumentNotValidException() {
        return new Message("JSON com campos invalidos ou faltantes");
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(Exception.class)
    protected Message handleGenericException() {
        return new Message("Erro interno, contate o administrador.");
    }

    protected ResponseEntity<Message> ok(String message, Object object) {
        return ResponseEntity.ok(new Message(message, object));
    }

    protected ResponseEntity<Message> badRequest(String message, Object object) {
        return ResponseEntity.badRequest().body(new Message(message, object));
    }

    protected ResponseEntity<Message> internalError(String message, Object object) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new Message(message, object));
    }
}
