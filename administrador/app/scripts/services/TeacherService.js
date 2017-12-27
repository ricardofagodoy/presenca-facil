import Constants from '../utils/Constants'
import { hashHistory } from 'react-router';

import axios from 'axios';

export default {

  createTeacher: (name, email, username, password) => {
    return axios.post(Constants.WS.TEACHER,
    [{
      nome: name,
      email: email,
      login: {
        usuario: username,
        senha: password
      }
    }],
    {
        withCredentials: false
    });
  },

  getAllTeachers: () => {
    return axios.get(Constants.WS.TEACHER);
  },

  importTeachers: (teacherList) => {
    return new Promise((resolve, reject) => {
      console.log('Call correct WS with: ' + JSON.stringify(teacherList))
      resolve(teacherList)
    })
  },

  teacherMapper: (valuesList) => {

    if (valuesList.length != 4)
      throw 'Linha com campos inválidos: ' + valuesList.join(Constants.IMPORT_FILE_SEPARATOR)

    return {
      nome: valuesList[0],
      email: valuesList[1],
      login: {
        usuario: valuesList[2],
        senha: valuesList[3]
      }
    }
  }
}
