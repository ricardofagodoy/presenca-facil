--DROP TABLE aluno;
--DROP TABLE login;
--DROP TABLE aula;
--DROP TABLE perfil;
--DROP TABLE turma;
--DROP TABLE materia;
--DROP TABLE materia;


INSERT INTO perfil (nome) VALUES ('ADMIN');
INSERT INTO perfil (nome) VALUES ('PROFESSOR');
INSERT INTO perfil (nome) VALUES ('ALUNO');


INSERT INTO login (usuario, senha) VALUES ('ricardo', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.');
INSERT INTO usuario (nome, email, criacao, perfil, login_id) VALUES ('Ricardo Godoy', 'ricardofagodoy@gmail.com', '2017-05-12', 'ADMIN', 1);

INSERT INTO login (usuario, senha) VALUES ('professor', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.');
INSERT INTO usuario (nome, email, criacao, perfil, login_id) VALUES ('Andre Luis', 'professordefault@gmail.com', '2017-01-15', 'PROFESSOR', 2);
INSERT INTO professor (id) VALUES (2);

INSERT INTO login (usuario, senha) VALUES ('aluno', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.');
INSERT INTO usuario (nome, email, criacao, perfil, login_id) VALUES ('Marcelo Silva', 'alunodefault@gmail.com', '2013-01-15', 'ALUNO', 3);
INSERT INTO aluno (id) VALUES (3);

INSERT INTO login (usuario, senha) VALUES ('antonio', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.');
INSERT INTO usuario (nome, email, criacao, perfil, login_id) VALUES ('Antonio Piau', 'antonio@gmail.com', '2014-01-15', 'ALUNO', 4);
INSERT INTO aluno (id) VALUES (4);

INSERT INTO login (usuario, senha) VALUES ('felipe', '$2a$10$EblZqNptyYvcLm/VwDCVAuBjzZOI7khzdyGPBr08PpIi0na624b8.');
INSERT INTO usuario (nome, email, criacao, perfil, login_id) VALUES ('Felipe Kohlmann', 'felipe@gmail.com', '2014-06-10', 'ALUNO', 5);
INSERT INTO aluno (id) VALUES (5);

INSERT INTO materia (id, nome) VALUES (1, 'Calculo II');
INSERT INTO materia (id, nome) VALUES (2, 'Banco de Dados');

INSERT INTO local (id, nome, device_id) VALUES (null, 'Sala 01', 'Presenca_00001');
INSERT INTO local (id, nome, device_id) VALUES (null, 'Sala 03', 'Presenca_00001');

INSERT INTO turma (id, nome) VALUES (1, 'Sistemas de Informacao 2017');
INSERT INTO turma (id, nome) VALUES (2, 'Ciencia da Computacao 2017');

INSERT INTO turma_aluno (turma_id, aluno_id) VALUES (1, 3);
INSERT INTO turma_aluno (turma_id, aluno_id) VALUES (1, 4);
INSERT INTO turma_aluno (turma_id, aluno_id) VALUES (2, 5);


insert into aula (id, data_inicio, data_fim, horario_inicio, horario_fim, local_id, materia_id, professor_id, turma_id) values (null, '2017-01-01 00:00:00', '2017-07-01 00:00:00', '18:00', '21:00', 1, 1, 2, 1);
insert into aula (id, data_inicio, data_fim, horario_inicio, horario_fim, local_id, materia_id, professor_id, turma_id) values (null, '2017-01-01 00:00:00', '2017-07-01 00:00:00', '19:20', '20:30', 2, 2, 2, 1);

insert into aula_dias_semana (aula_id, dias_semana) values (1, 'SEGUNDA');
insert into aula_dias_semana (aula_id, dias_semana) values (1, 'QUARTA');
insert into aula_dias_semana (aula_id, dias_semana) values (2, 'SEXTA');


insert into aula_especifica (id, aula_id, data_inicio, data_fim) values (null, 1, '2017-10-30 18:00:00', '2018-01-01 21:00:00');
insert into aula_especifica (id, aula_id, data_inicio, data_fim) values (null, 1, '2018-10-25 19:00:00', '2018-10-25 22:00:00');
insert into aula_especifica (id, aula_id, data_inicio, data_fim) values (null, 1, '2018-06-14 18:00:00', '2018-06-14 21:00:00');
insert into aula_especifica (id, aula_id, data_inicio, data_fim) values (null, 1, '2018-06-14 19:00:00', '2018-06-14 22:00:00');
insert into aula_especifica (id, aula_id, data_inicio, data_fim) values (null, 2, '2018-06-15 19:20:00', '2018-06-15 20:30:00');
insert into aula_especifica (id, aula_id, data_inicio, data_fim) values (null, 2, '2018-06-12 19:00:00', '2018-06-12 22:30:00');




