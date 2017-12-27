import Constants from 'utils/Constants'
import moxios from 'moxios'

moxios.install()

const userId = 3
const classId = 1

const MOCK_RESPONSES = {
    ATTENDANCE_ALUNO: {
        message: '',
        object: true
    },
    CURRENT_CLASS_PROFESSOR: {
        message: '',
        object: {
            id: classId,
            materia: { nome: 'Calculo I' },
            local: 'H8 - 015',
            horarioInicio: '19:20',
            horarioFim: '20:50',
            dataInicio: 1501640114,
            dataFim: 1513304114,
            diasSemana: [
                'TERCA', 'QUINTA'
            ]
        }
    },
    NEXT_CLASS_PROFESSOR: {
        message: '',
        object: {
            id: classId + 1,
            materia: { nome: 'Calculo III' },
            local: 'H12 - 03',
            horarioInicio: '21:30',
            horarioFim: '22:50',
            dataInicio: 1501640114,
            dataFim: 1513304114,
            diasSemana: [
                'TERCA', 'QUINTA'
            ]
        }
    },
    CURRENT_CLASS_STUDENT: {
        message: '',
        object: {
            id: classId,
            materia: { nome: 'Calculo I' },
            local: 'H08 - 15',
            horarioInicio: '19:20',
            horarioFim: '20:50',
            dataInicio: 1501712400000,
            dataFim: 1513378200000,
            diasSemana: [
                'TERCA', 'QUINTA'
            ]
        }
    },
    NEXT_CLASS_STUDENT: {
        message: '',
        object: {
            id: classId + 1,
            materia: { nome: 'Calculo III' },
            local: 'H12 - 03',
            horarioInicio: '21:30',
            horarioFim: '22:50',
            dataInicio: 1501718700000,
            dataFim: 1513384500000,
            diasSemana: [
                'TERCA', 'QUINTA'
            ]
        }
    },
    STUDENTS: {
        message: '',
        object: [
            {
                "id": 3,
                "nome": "Marcelo Silva",
                "email": "alunodefault@gmail.com",
                "criacao": "2013-01-15",
                "perfil": {
                "nome": "ALUNO"
                }
            },
            {
                "id": 4,
                "nome": "Saulo Correa",
                "email": "gostodemac@apple.com",
                "criacao": "2015-02-12",
                "perfil": {
                "nome": "ALUNO"
                }
            },
            {
                "id": 5,
                "nome": "Tonim Dagalera",
                "email": "vendimeumac@rico.com",
                "criacao": "2012-11-10",
                "perfil": {
                "nome": "ALUNO"
                }
            }
        ]
    }
}

const mockAttendances = (() => {

    moxios.stubRequest(Constants.WS.PRESENCA_ALUNO + classId + '/' + userId, {
        status: 200,
        response: MOCK_RESPONSES.ATTENDANCE_ALUNO
    })
})()

const mockClasses = (() => {

    moxios.stubRequest(Constants.WS.AULA_ATUAL_PROFESSOR + userId, {
        status: 200,
        response: MOCK_RESPONSES.CURRENT_CLASS_PROFESSOR
    })

    moxios.stubRequest(Constants.WS.PROXIMA_AULA_PROFESSOR + userId, {
        status: 200,
        response: MOCK_RESPONSES.NEXT_CLASS_PROFESSOR
    })

    moxios.stubRequest(Constants.WS.AULA_ATUAL_ALUNO + userId, {
        status: 200,
        response: MOCK_RESPONSES.CURRENT_CLASS_STUDENT
    })

    moxios.stubRequest(Constants.WS.PROXIMA_AULA_ALUNO + userId, {
        status: 200,
        response: MOCK_RESPONSES.NEXT_CLASS_STUDENT
    })
})()

const mockStudents = (() => {

    moxios.stubRequest(Constants.WS.STUDENT, {
        status: 200,
        response: MOCK_RESPONSES.STUDENTS
    })
})()

export default MOCK_RESPONSES