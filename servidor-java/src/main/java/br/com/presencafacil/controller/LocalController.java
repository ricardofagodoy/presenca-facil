package br.com.presencafacil.controller;

import br.com.presencafacil.controller.base.BaseController;
import br.com.presencafacil.model.Message;
import br.com.presencafacil.model.entity.Local;
import br.com.presencafacil.service.LocalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/local")
public class LocalController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(LocalController.class);

    @Autowired
    private LocalService localService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Message> listarLocais() {
        logger.info("Listando locais...");
        return ok("Sucesso", this.localService.findAll());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{localId}")
    public ResponseEntity<Message> buscarLocalPorId(@PathVariable Long localId) {
        logger.info("Buscando local por ID...");

        Local local = this.localService.findOne(localId);

        if (local == null) {
            logger.error("Nenhum local encontrado com esse ID!");
            return badRequest("Nenhum local encontrado com esse ID!", localId);
        }

        return ok("Sucesso", local);
    }

    @RequestMapping(method = RequestMethod.POST)

    public ResponseEntity<Message> criarLocal(@Valid @RequestBody List<Local> locais) throws Exception {

        logger.info("Criando/editando  {}", locais);

        return ok("Sucesso", this.localService.saveList(locais));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Message> editarLocal(@RequestBody List<Local> locais) throws Exception {
        return this.criarLocal(locais);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{LocalId}")
    public ResponseEntity<Message> deletarLocal(@PathVariable Long localId) {

        logger.info("Deletando local com ID: {}", localId);

        this.localService.delete(localId);

        return ok("Sucesso", localId);
    }
}
