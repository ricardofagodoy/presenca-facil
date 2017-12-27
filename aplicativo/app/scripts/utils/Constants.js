var Config = require('Config')

const WS_URL = Config.WS_URL
const WS_ATTENDANCE_URL = Config.WS_ATTENDANCE_URL

let constants = {

  WS: {
    LOGIN: WS_URL + 'login',
    PROXIMA_AULA_PROFESSOR: WS_URL + 'aula/proximaprofessor/',
    AULA_ATUAL_PROFESSOR: WS_URL + 'aula/atualprofessor/',

    PROXIMA_AULA_ALUNO: WS_URL + 'aula/proximaaluno/',
    AULA_ATUAL_ALUNO: WS_URL + 'aula/atualaluno/',

    PRESENCA_PROFESSOR: WS_URL + 'presenca/',
    PRESENCA_ALUNO: WS_URL + 'presenca/aulaespecificaaluno/',

    STUDENT: WS_URL + 'aluno/',
    OPEN_ATTENDANCE: WS_URL + 'attendance/class/',

    STUDENT_CLASSES_FREQUENCY: WS_URL + 'attendance/',

    ALL_CLASSES: WS_URL + 'aula/grade/'
  },

  WS_ATTENDANCE: {
    STUDENT_ATTENDANCE: WS_ATTENDANCE_URL,
    GET_ATTENDANCE_CLASS: WS_ATTENDANCE_URL + 'class/',
    MAKE_ATTENDANCE: WS_ATTENDANCE_URL,
    DELETE_ATTENDANCE: WS_ATTENDANCE_URL + 'remove',
    STUDENT_ATTENDANCES: WS_ATTENDANCE_URL + 'student/'
  },

  SESSION_PARAM: "session",
  CHECK_ATTENDANCE_INTERVAL: 3000
}

export default constants;