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
import br.com.presencafacil.model.entity.Aluno;
import br.com.presencafacil.service.AlunoService;

import java.util.List;

@RestController
@RequestMapping("/aluno")
public class AlunoController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(AlunoController.class);

    @Autowired
    private AlunoService alunoService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> listarAlunos() {
        logger.info("Listando alunos...");
        return ok("Sucesso", this.alunoService.findAll());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{alunoId}")
    public ResponseEntity<Message> buscarAlunoPorId(@PathVariable Long alunoId) {
        logger.info("Buscando aluno por ID...");

        Aluno aluno = this.alunoService.findOne(alunoId);

        if (aluno == null) {
            logger.error("Nenhum aluno encontrado com esse ID!");
            return badRequest("Nenhum aluno encontrado com esse ID!", alunoId);
        }

        return ok("Sucesso", aluno);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> criarAluno(@Valid @RequestBody List<Aluno> alunos) {

        logger.info("Criando/editando alunos");

        return ok("Sucesso", this.alunoService.saveList(alunos));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> editarAluno(@RequestBody List<Aluno> alunos) {
        return this.criarAluno(alunos);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{alunoId}")
    public ResponseEntity<Message> deletarAluno(@PathVariable Long alunoId) {

        logger.info("Deletando aluno com ID: {}", alunoId);

        this.alunoService.delete(alunoId);

        return ok("Sucesso", alunoId);
    }
}
