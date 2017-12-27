package br.com.presencafacil.model;

public class Presenca {

    private final Long aulaEspecifica;

    private final String timestamp;

    public Presenca(Long aulaEspecifica, String timestamp) {
        this.aulaEspecifica = aulaEspecifica;
        this.timestamp = timestamp;
    }

    public Long getAulaEspecifica() {
        return aulaEspecifica;
    }

    public String getTimestamp() {
        return timestamp;
    }
}
