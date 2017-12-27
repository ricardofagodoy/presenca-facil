package br.com.presencafacil.model;

import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
public class Message implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String message;
	private Object object;
	
	public Message() {
	}
	
	public Message(String message) {
		this.setMessage(message);
	}
	
	public Message(String message, Object object) {
		this.setMessage(message);
		this.setObject(object);
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getObject() {
		return object;
	}

	public void setObject(Object object) {
		this.object = object;
	}
}
