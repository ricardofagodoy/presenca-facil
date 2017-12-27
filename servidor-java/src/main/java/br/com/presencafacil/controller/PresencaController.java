package br.com.presencafacil.controller;

import br.com.presencafacil.controller.base.BaseController;
import br.com.presencafacil.model.Message;
import br.com.presencafacil.model.RespostaConsultaAlunoDTO;
import br.com.presencafacil.model.entity.Aluno;
import br.com.presencafacil.model.entity.Aula;
import br.com.presencafacil.model.entity.AulaEspecifica;
import br.com.presencafacil.repository.AulaEspecificaRepository;
import br.com.presencafacil.repository.AulaRepository;
import br.com.presencafacil.service.AlunoService;
import br.com.presencafacil.service.AulaEspecificaService;
import br.com.presencafacil.service.AulaService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping("/attendance")
public class PresencaController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(PresencaController.class);

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private AulaEspecificaService aulaEspecificaService;

    @Autowired
    private AulaService aulaService;

    @Autowired
    private AulaRepository aulaRepository;

    @Autowired
    private AulaEspecificaRepository aulaEspecificaRepository;

    private final String nodeClassPath;

    private final String nodeStudentPath;

    public PresencaController(@Value("${node.server.ip}") final String nodeIp) {
        this.nodeClassPath = nodeIp + "class/";
        this.nodeStudentPath = nodeIp + "student/";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/{alunoId}")
    public ResponseEntity<Message> buscarPresencas(@PathVariable Long alunoId) {

        Aluno aluno = this.alunoService.findOne(alunoId);

        Map<Long, Long> presencas = null;

        if (aluno == null) {
            logger.error("Nenhum aluno encontrado com esse ID!");
            return badRequest("Nenhum aluno encontrado com esse ID!", alunoId);
        }

        try {
            logger.info("Buscando presenca para o aluno {}.", alunoId);
            presencas = sendGet(alunoId);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        Map<Long, Integer> aulaPresenca = new HashMap<>();

        List<Aula> aulas = aulaRepository.findAulaByTurmaAlunosId(alunoId);

        for (Aula aula : aulas)
            aulaPresenca.put(aula.getId(), 0);

        List<RespostaConsultaAlunoDTO> list = new ArrayList<RespostaConsultaAlunoDTO>();

        for (Long presenca : presencas.keySet()) {

            AulaEspecifica aulaEspecifica = aulaEspecificaService.findOne(presenca);

            Aula aula = aulaEspecifica.getAula();

            aulaPresenca.put(aula.getId(), aulaPresenca.getOrDefault(aula.getId(), 0) + 1);
        }

        for (Long aulaId : aulaPresenca.keySet()) {

            Aula aula = aulaRepository.findOne(aulaId);

            String materia = aula.getMateria().getNome();

            Integer count = aulaEspecificaRepository.aulaEspecificaCountByAulaId(alunoId, aulaId, new Date());

            Integer percentage = 0;

            if (count != 0)
                percentage = ((aulaPresenca.get(aulaId) * 100) / count);

            logger.info("Qtde Presencas: " + aulaPresenca.get(aulaId) + " - Qtde Aulas: " + count + " - Porcentagem: " + percentage);

            list.add(new RespostaConsultaAlunoDTO(percentage, materia));
        }

        return ok("Sucesso", list);
    }


    @RequestMapping(method = RequestMethod.GET, value = "/class/{aulaId}")
    public ResponseEntity<Message> abrirPresenca(@PathVariable Long aulaId) {
        logger.info("Abrindo presenca...");

        Aula aula = this.aulaService.findOne(aulaId);

        if (aula == null) {
            logger.error("Nenhuma aula encontrado com esse ID!");
            return badRequest("Nenhuma aula encontrado com esse ID!", aulaId);
        }

        String deviceId = aula.getLocal().getDeviceId();

        if (deviceId == null) {
            logger.error("Nenhum device encontrado para essa aula!");
            return badRequest("Nenhum device encontrado para essa aula!", aulaId);
        }

        try {
            sendPost(aulaId, aula.getLocal().getDeviceId());
            logger.info("Mensagem com id de aula {} e device {} enviada para o servidor node.", aulaId, deviceId);
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        return ok("Sucesso", null);
    }

    // HTTP POST request
    private void sendPost(Long aulaId, String deviceId) throws Exception {

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("deviceId", deviceId);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        restTemplate.postForEntity(nodeClassPath + aulaId, request, String.class);
    }

    // HTTP GET request
    private Map<Long, Long> sendGet(Long alunoId) throws Exception {

        RestTemplate restTemplate = new RestTemplate();

        String json = restTemplate.getForObject(nodeStudentPath + alunoId, String.class);

        ObjectMapper mapper = new ObjectMapper();

        return mapper.readValue(json, new TypeReference<Map<Long, Long>>() {
        });
    }
}
