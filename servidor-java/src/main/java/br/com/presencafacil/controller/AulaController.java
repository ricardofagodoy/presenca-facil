package br.com.presencafacil.controller;

import javax.validation.Valid;

import br.com.presencafacil.model.AulaDTO;
import br.com.presencafacil.model.RespostaConsultaGradeDTO;
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
import br.com.presencafacil.exception.ProfessorNaoEncontradoException;
import br.com.presencafacil.model.CriarAulaDTO;
import br.com.presencafacil.model.Message;
import br.com.presencafacil.model.entity.Aula;
import br.com.presencafacil.service.AulaService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/aula")
public class AulaController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(AulaController.class);

    @Autowired
    private AulaService aulaService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> listarAulas() {
        logger.info("Listando aulas...");
        return ok("Sucesso", this.aulaService.findAll());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{aulaId}")
    public ResponseEntity<Message> buscarAulaPorId(@PathVariable Long aulaId) {
        logger.info("Buscando aula por ID...");

        Aula aula = this.aulaService.findOne(aulaId);

        if (aula == null) {
            logger.error("Nenhuma aula encontrado com esse ID!");
            return badRequest("Nenhuma aula encontrado com esse ID!", aulaId);
        }

        return ok("Sucesso", aula);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/atualprofessor/{professorId}")
    public ResponseEntity<Message> aulaAtualProfessor(@PathVariable Long professorId) {
        logger.info("Buscando aula atual para professor {}", professorId);
        try {
            AulaDTO aula = null;
            Aula proxAula = this.aulaService.aulaAtualProfessor(professorId);

            if (proxAula != null)
                aula = new AulaDTO(proxAula);

            if (aula == null)
                return badRequest("Esse professor nao esta em aula.", professorId);

            return ok("Sucesso", aula);
        } catch (ProfessorNaoEncontradoException e) {
            return badRequest("Professor nao encontrado!", professorId);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/atualaluno/{alunoId}")
    public ResponseEntity<Message> aulaAtualAulaAluno(@PathVariable Long alunoId) {
        logger.info("Buscando aula atual para aluno {}", alunoId);
        try {
            AulaDTO aula = null;
            Aula proxAula = this.aulaService.aulaAtualAluno(alunoId);

            if (proxAula != null)
                aula = new AulaDTO(proxAula);

            if (aula == null)
                return badRequest("Esse aluno nao esta em aula.", alunoId);

            return ok("Sucesso", aula);
        } catch (AlunoNaoEncontradoException e) {
            return badRequest("Aluno nao encontrado!", alunoId);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/proximaprofessor/{professorId}")
    public ResponseEntity<Message> proximaAulaProfessor(@PathVariable Long professorId) {
        logger.info("Buscando proxima aula para professor {}", professorId);
            try {
            AulaDTO aula = null;
            Aula proxAula = this.aulaService.proximaAulaProfessor(professorId);

            if (proxAula != null)
                aula = new AulaDTO(proxAula);

            if (aula == null)
                return badRequest("Nao existe aula para este professor.", professorId);

            return ok("Sucesso", aula);
        } catch (ProfessorNaoEncontradoException e) {
            return badRequest("Professor nao encontrado!", professorId);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/proximaaluno/{alunoId}")
    public ResponseEntity<Message> proximaAulaAluno(@PathVariable Long alunoId) {
        logger.info("Buscando proxima aula para aluno {}", alunoId);
        try {
            AulaDTO aula = null;
            Aula proxAula = this.aulaService.proximaAulaAluno(alunoId);

            if (proxAula != null)
                aula = new AulaDTO(proxAula);

            if (aula == null)
                return badRequest("Nao existe aula para este aluno.", alunoId);

            return ok("Sucesso", aula);
        } catch (AlunoNaoEncontradoException e) {
            return badRequest("Aluno nao encontrado!", alunoId);
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/grade/{userId}")
    public ResponseEntity<Message> buscarGrade(@PathVariable Long userId) {
        logger.info("Buscando grade para usuario " + userId);

        List<Aula> aulas = this.aulaService.getAulaByUserId(userId);

        List<RespostaConsultaGradeDTO> aulasRetorno = new ArrayList<RespostaConsultaGradeDTO>();

        if (aulas == null) {
            logger.error("Nenhuma aula encontrada para um usuario com esse ID!");
            return badRequest("Nenhuma aula encontrada para um usuario com esse ID!", userId);
        }

        for (Aula aula : aulas){
            aulasRetorno.add(new RespostaConsultaGradeDTO(aula));
        }

        return ok("Sucesso", aulasRetorno);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Message> criarAula(@Valid @RequestBody List<CriarAulaDTO> aulas) {

        logger.info("Criando nova Aula {}", aulas);

        return ok("Sucesso", this.aulaService.saveListDTO(aulas));

    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{professorId}")
    public ResponseEntity<Message> deletarAula(@PathVariable Long professorId) {

        logger.info("Deletando aula com ID: {}", professorId);

        this.aulaService.delete(professorId);

        return ok("Sucesso", professorId);
    }
}
