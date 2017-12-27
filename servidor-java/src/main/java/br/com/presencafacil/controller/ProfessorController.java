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
import br.com.presencafacil.model.Message;
import br.com.presencafacil.model.entity.Professor;
import br.com.presencafacil.service.ProfessorService;

import java.util.List;

@RestController
@RequestMapping("/professor")
public class ProfessorController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(ProfessorController.class);

    @Autowired
    private ProfessorService professorService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> listarProfessores() {
        logger.info("Listando professores...");
        return ok("Sucesso", this.professorService.findAll());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{professorId}")
    public ResponseEntity<Message> buscarProfessorPorId(@PathVariable Long professorId) {
        logger.info("Buscando professor por ID...");

        Professor professor = this.professorService.findOne(professorId);

        if (professor == null) {
            logger.error("Nenhum professor encontrado com esse ID!");
            return badRequest("Nenhum professor encontrado com esse ID!", professorId);
        }

        return ok("Sucesso", professor);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> criarProfessor(@Valid @RequestBody List<Professor> professors) throws Exception {

        logger.info("Criando/editando  {}", professors);

        return ok("Sucesso", this.professorService.saveList(professors));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> editarProfessor(@RequestBody List<Professor> professors) throws Exception {
        return this.criarProfessor(professors);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{professorId}")
    public ResponseEntity<Message> deletarProfessor(@PathVariable Long professorId) {

        logger.info("Deletando professor com ID: {}", professorId);

        this.professorService.delete(professorId);

        return ok("Sucesso", professorId);
    }
}
