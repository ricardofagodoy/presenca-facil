# Presenca Facil - Server #

## DEPLOY EM PROD ##

1. Baixar o c�digo do projeto desse reposit�rio
2. Executar o ```deployProducao``` na raiz do projeto.
3. https://presenca-facil-java.herokuapp.com/presenca-facil-server/

## Seguranca: Basic ##

* Adicionar ao header: Authorization base64(usuario:senha)

Em breve sera implementado oAuth.

### Login ###

Deve ser chamado para validar usuario/senha e obter o usuario como resposta.

* POST /presenca-facil-server/login

Request body:

```{
  "usuario": "ricardo",
  "senha": "123"
}```

Response body:

```{
	"message": "Sucesso",
	"object":{
		"id": 1,
		"nome": "Ricardo Godoy",
		"email": "ricardofagodoy@gmail.com",
		"ra": "13049630",
		"login":{
			"id": 1,
			"usuario": "ricardo",
			"senha": "r08PpIi0na624b8.#",
			"perfil":{
				"id": 1,
				"nome": "ADMIN"
			}
		}
	}
}```

### Aluno ###

* GET http://localhost:8080/presenca-facil-server/aluno

* POST http://localhost:8080/presenca-facil-server/aluno

{
	"nome": "James Bond",
	"email": "jamesbond@gmail.com",
	"ra": "13048887",
	"login": {
		"usuario": "james",
		"senha": "123",
		"perfil": {
         	 "id": 2,
			"nome": "USER"
		}
	}
}

* PUT http://localhost:8080/presenca-facil-server/aluno

{
  	"id": 2,
	"nome": "James Baond",
	"email": "jamesbond@gmail.com",
	"ra": "13048887",
	"login": {
      	"id": 2,
		"usuario": "james",
		"senha": "1234",
		"perfil": {
         	 "id": 2,
			"nome": "USER"
		}
	}
}

* DELETE http://localhost:8080/presenca-facil-server/aluno

2

### Perfil ###

* GET http://localhost:8080/presenca-facil-server/perfil


### Servicos da plataforma de presencas ###

* TODO

* ricardofagodoy@gmail.com