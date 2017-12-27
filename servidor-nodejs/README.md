# Presenca Facil - Node #

Projeto para registrar presencas de forma rapida, assincrona e nao bloqueante.

Utiliza Firebase para base de dados e XXXXX para hospedagem.

# Como usar? #

* npm run dev ---> rodar localmente, para desenvolvimento
* npm test    ---> rodar os testes
* npm start   ---> rodar ambiente de produção

* Script deployProducao ---> mandar o Heroku

# Endpoints #

## Abrir presença para a aula 1 com Beacon 1A:2B:3C:4D ##

* POST localhost:3000/attendance/class/1 

Body:
```
{
    "deviceId": "1A:2B:3C:4D",
    "timeout": 30  // Opcional, em segundos, o valor padrão é 60
}
```

Response: 200 OK

OBS: O timeout é o tempo em segundos que a aula irá fechar automaticamente após aberta.
_____________________________________________

## Fechar presença para a aula 1 ##

- DELETE localhost:3000/attendance/class/1 

Response: 200 OK
______________________________________________

## Obter presenças da aula 1 ##

- GET localhost:3000/attendance/class/1 

Response: 
```
[
    3, 5, 7, 9
]
```

OBS: Cada número é um studentId
______________________________________________

## Obter presenças do aluno 3 ##

- GET localhost:3000/attendance/student/3 

Response: 
```
[
    1, 3, 6, 8, 9
]
```

OBS: Cada número é um classId
______________________________________________

## Dar presença na aula 1 para o aluno 3 ##

- POST localhost:3000/attendance

```
{
    "classId": 1,
    "studentId": 3,
    "deviceId": "A:2B:3C:4D"
}
```

Response: 200 OK