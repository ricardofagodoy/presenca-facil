import Constants from '../utils/Constants'
import { hashHistory } from 'react-router';

import axios from 'axios';

export default {

  createCourse: (id, name) => {
    return axios.post(Constants.WS.COURSE,
    [{
      id : id,
      nome: name
    }],
    {
        withCredentials: false
    });
  },

  getAllCourses: () => {
    return axios.get(Constants.WS.COURSE);
  },

  importCourses: (courseList) => {
    return new Promise((resolve, reject) => {
      console.log('Call correct WS with: ' + JSON.stringify(courseList))
      resolve(courseList)
    })
  },

  courseMapper: (valuesList) => {

    if (valuesList.length != 2)
      throw 'Linha com campos inválidos: ' + valuesList.join(Constants.IMPORT_FILE_SEPARATOR)

    return {
      id: valuesList[0],
      nome: valuesList[1]
    }
  }
}
