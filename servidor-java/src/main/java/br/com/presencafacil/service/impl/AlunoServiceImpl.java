package br.com.presencafacil.service.impl;

import br.com.presencafacil.model.entity.Aluno;
import br.com.presencafacil.repository.AlunoRepository;
import br.com.presencafacil.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlunoServiceImpl extends JpaCrudService<Aluno, Long> implements AlunoService {

    //private static final Logger logger = LoggerFactory.getLogger(AlunoServiceImpl.class);

    @Autowired
    public AlunoServiceImpl(AlunoRepository alunoRepository) {
        super(alunoRepository);
    }

    @Override
    public Aluno save(Aluno a) {

        if (a == null)
            return null;

        if (a.getId() != null) {

            Aluno existente = this.findOne(a.getId());

            if (existente != null)
                a = existente.merge(a);
        }

        return super.save(a);
    }


}
