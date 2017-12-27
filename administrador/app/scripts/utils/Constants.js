const WS_URL = 'http://localhost:8080/presenca-facil-server/'

let constants = {

  WS: {
    LOGIN: WS_URL + 'login',
    STUDENT: WS_URL + 'aluno',
    TEACHER: WS_URL + 'professor',
    COURSE: WS_URL + 'materia',
    CLASS: WS_URL + 'aula',
    GROUP: WS_URL + 'turma',
    LOCALE: WS_URL + 'local',
    ATTENDANCE: WS_URL + 'attendance',
  },

  SESSION_PARAM: "session",
  IMPORT_FILE_EXTENSION: "csv",
  IMPORT_FILE_SEPARATOR: ';',
  IMPORT_FILE_LIST_SEPARATOR: '|',
  IMPORT_FILE_MAX_SIZE_BYTES: 7000
}

export default constants;