package br.com.presencafacil.controller;

import br.com.presencafacil.controller.base.BaseController;
import br.com.presencafacil.model.Message;
import br.com.presencafacil.model.entity.Materia;
import br.com.presencafacil.service.MateriaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/materia")
public class MateriaController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(MateriaController.class);

    @Autowired
    private MateriaService materiaService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> listarMaterias() {
        logger.info("Listando materias...");
        return ok("Sucesso", this.materiaService.findAll());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{materiaId}")
    public ResponseEntity<Message> buscarMateriaPorId(@PathVariable String materiaId) {
        logger.info("Buscando materia por ID...");

        Materia materia = this.materiaService.findOne(materiaId);

        if (materia == null) {
            logger.error("Nenhuma materia encontrado com esse ID!");
            return badRequest("Nenhuma materia encontrado com esse ID!", materiaId);
        }

        return ok("Sucesso", materia);
    }

    @RequestMapping(method = RequestMethod.POST)

    public ResponseEntity<Message> criarMateria(@Valid @RequestBody List<Materia> materias) throws Exception {

        logger.info("Criando/editando  {}", materias);

        return ok("Sucesso", this.materiaService.saveList(materias));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> editarMateria(@RequestBody List<Materia> materias) throws Exception {
        return this.criarMateria(materias);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{materiaId}")
    public ResponseEntity<Message> deletarMateria(@PathVariable String materiaId) {

        logger.info("Deletando materia com ID: {}", materiaId);

        this.materiaService.delete(materiaId);

        return ok("Sucesso", materiaId);
    }
}
