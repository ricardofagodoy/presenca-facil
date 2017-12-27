import Constants from 'utils/Constants'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios);

const userId = 3
const classId = 1

const MOCK_RESPONSES = {
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
    }
}

const mockClasses = (() => {

    mock.onGet(Constants.WS.AULA_ATUAL_PROFESSOR + userId).
    reply(200, MOCK_RESPONSES.CURRENT_CLASS_PROFESSOR)

    mock.onGet(Constants.WS.PROXIMA_AULA_PROFESSOR + userId).
    reply(200, MOCK_RESPONSES.NEXT_CLASS_PROFESSOR)

    mock.onGet(Constants.WS.AULA_ATUAL_ALUNO + userId).
    reply(200, MOCK_RESPONSES.CURRENT_CLASS_STUDENT)

    mock.onGet(Constants.WS.PROXIMA_AULA_ALUNO + userId).
    reply(200, MOCK_RESPONSES.NEXT_CLASS_STUDENT)

    mock.onAny().passThrough();
})()

export default MOCK_RESPONSES