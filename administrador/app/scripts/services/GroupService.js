import Constants from '../utils/Constants'
import { hashHistory } from 'react-router';

import axios from 'axios';

export default {

  createGroup: (id, nome, students) => {
    return axios.post(Constants.WS.GROUP,
    [{
      id: id,
      nome: nome,
      alunos: students
    }],
    {
        withCredentials: false
    });
  },

  getAllGroups: () => {
    return axios.get(Constants.WS.GROUP);
  },

  getStudentsFromGroup: (groupId) => {
    return axios.get(Constants.WS.GROUP + "/" + groupId);
  },

  importGroups: (groupList) => {
    return new Promise((resolve, reject) => {
      console.log('Call correct WS with: ' + JSON.stringify(groupList))
      resolve(groupList)
    })
  },

  groupMapper: (valuesList) => {

    if (valuesList.length != 3)
      throw 'Linha com campos inválidos: ' + valuesList.join(Constants.IMPORT_FILE_SEPARATOR)

    let alunosList = valuesList[2].split(Constants.IMPORT_FILE_LIST_SEPARATOR);

    if (alunosList[0] != ''){

      //Converting into a list of objects
      for (let i= 0; i < alunosList.length; i++)
        alunosList[i] = { id : alunosList[i]}

      return {
        id: valuesList[0],
        nome: valuesList[1],
        alunos: alunosList
      }

    }
    else
      return {
        id: valuesList[0],
        nome: valuesList[1]
      }
  }
}
