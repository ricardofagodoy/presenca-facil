import Constants from '../utils/Constants'
import { hashHistory } from 'react-router';

import axios from 'axios';

export default {

  createClass: (group,subject,teacher,locale,startTime,endTime,startDate,endDate,weekdays) => {
    return axios.post(Constants.WS.CLASS,
    [{
      turma: group,
      materia: subject,
      professor: teacher,
      local: locale,
      horarioInicio: startTime,
      horarioFim: endTime,
      dataInicio: startDate,
      dataFim: endDate,
      diasSemana: weekdays
    }],
    {
        withCredentials: false
    });
  },

  getAllClasses: () => {
    return axios.get(Constants.WS.CLASS);
  },

  importClasses: (classList) => {
    return new Promise((resolve, reject) => {
      console.log('Call correct WS with: ' + JSON.stringify(classList))
      resolve(classList)
    })
  },

  classMapper: (valuesList) => {

    if (valuesList.length != 9)
      throw 'Linha com campos inválidos: ' + valuesList.join(Constants.IMPORT_FILE_SEPARATOR)

    let diasSemanaList = valuesList[8].split(Constants.IMPORT_FILE_LIST_SEPARATOR)

    if (diasSemanaList[0] == '')
      diasSemanaList = []

    return {
      turma: valuesList[0],
      materia: valuesList[1],
      professor: valuesList[2],
      local: valuesList[3],
      horarioInicio: valuesList[4],
      horarioFim: valuesList[5],
      dataInicio: valuesList[6],
      dataFim: valuesList[7],
      diasSemana: diasSemanaList
    }
  }
  
}
