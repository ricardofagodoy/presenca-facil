import Constants from 'utils/Constants'
import DataUtils from "utils/DataUtils"
import BaseService from 'services/BaseService'

export default {

  encontraProximaAulaProfessor: (id, success, error) =>
    BaseService.get(Constants.WS.PROXIMA_AULA_PROFESSOR + id, success, error)
  ,

  encontraAulaAtualProfessor: (id, success, error) =>
    BaseService.get(Constants.WS.AULA_ATUAL_PROFESSOR + id, success, error)
  ,

  encontraProximaAulaAluno: (id, success, error) =>
    BaseService.get(Constants.WS.PROXIMA_AULA_ALUNO + id, success, error)
  ,

  encontraAulaAtualAluno: (id, success, error) =>
    BaseService.get(Constants.WS.AULA_ATUAL_ALUNO + id, success, error)
  ,
  
  findNextClass: function(user, success, error) {
    if (user.perfil.nome === 'ALUNO')
      this.encontraProximaAulaAluno(user.id, success, error)
    else
      this.encontraProximaAulaProfessor(user.id, success, error)
  },
  
  findCurrentClass: function(user, success, error) {
    if (user.perfil.nome === 'ALUNO')
      this.encontraAulaAtualAluno(user.id, success, error)
    else
      this.encontraAulaAtualProfessor(user.id, success, error)
  },

  findAllClasses: function(user, success, error) {
    BaseService.get(Constants.WS.ALL_CLASSES + user, success, error)
  },

  prepareToView: (classData) => {
    classData.materia = classData.materia;
		classData.horarioInicio = DataUtils.horarioDoTimestamp(classData.dataInicio);
		classData.horarioFim = DataUtils.horarioDoTimestamp(classData.dataFim);
		classData.dataProxima = DataUtils.dataDoTimestamp(classData.dataInicio);
    
    return classData;
  }
}