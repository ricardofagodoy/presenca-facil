package br.com.presencafacil.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.presencafacil.controller.base.BaseController;
import br.com.presencafacil.exception.AlunoNaoEncontradoException;
import br.com.presencafacil.exception.TurmaNaoEncontradaException;
import br.com.presencafacil.model.Message;
import br.com.presencafacil.model.entity.Turma;
import br.com.presencafacil.service.TurmaService;

import java.util.List;

@RestController
@RequestMapping("/turma")
public class TurmaController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(TurmaController.class);

    @Autowired
    private TurmaService turmaService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> listarTurmas() {
        logger.info("Listando turmas...");
        return ok("Sucesso", this.turmaService.findAll());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{turmaId}")
    public ResponseEntity<Message> buscarTurmaPorId(@PathVariable String turmaId) {
        logger.info("Buscando turma por ID...");

        Turma turma = this.turmaService.findOne(turmaId);

        if (turma == null) {
            logger.error("Nenhum turma encontrado com esse ID!");
            return badRequest("Nenhum turma encontrado com esse ID!", turmaId);
        }

        return ok("Sucesso", turma);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/adicionaraluno/{turmaId}/{alunoId}")
    public ResponseEntity<Message> adicionarAlunoTurma(@PathVariable String turmaId, @PathVariable Long alunoId) {

        try {
            turmaService.adicionarAlunoTurma(turmaId, alunoId);
        } catch (AlunoNaoEncontradoException e) {
            return badRequest("Aluno nao encontrado.", alunoId);
        } catch (TurmaNaoEncontradaException e) {
            return badRequest("Turma nao encontrada.", turmaId);
        }

        return ok("Sucesso", null);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> criarTurma(@Valid @RequestBody List<Turma> turmas) throws Exception {

        logger.info("Criando/editando  {}", turmas);

        return ok("Sucesso", this.turmaService.saveList(turmas));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> editarTurma(@RequestBody List<Turma> turmas) throws Exception {
        return this.criarTurma(turmas);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{turmaId}")
    public ResponseEntity<Message> deletarTurma(@PathVariable String turmaId) {

        logger.info("Deletando turma com ID: {}", turmaId);

        this.turmaService.delete(turmaId);

        return ok("Sucesso", turmaId);
    }
}
