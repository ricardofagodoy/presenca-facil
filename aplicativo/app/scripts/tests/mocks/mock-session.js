import SessionService from 'services/SessionService'

export default {
    startSessionStudent: () => SessionService.startSession({
        id: 3, 
        nome: 'James', 
        perfil: {
            nome: 'ALUNO'
        }
    }),
    startSessionProfessor: () => SessionService.startSession({
        id: 3, 
        nome: 'Andre', 
        perfil: {
            nome: 'PROFESSOR'
        }
    })
}
