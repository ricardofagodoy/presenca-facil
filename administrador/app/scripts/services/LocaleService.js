import Constants from '../utils/Constants'
import { hashHistory } from 'react-router';

import axios from 'axios';

export default {

  createLocale: (id, name, deviceId) => {
    return axios.post(Constants.WS.LOCALE,
    [{
      id : id,
      nome: name,
      deviceId : deviceId
    }],
    {
        withCredentials: false
    });
  },

  getAllLocale: () => {
    return axios.get(Constants.WS.LOCALE);
  },

  importLocale: (LocaleList) => {
    return new Promise((resolve, reject) => {
      console.log('Call correct WS with: ' + JSON.stringify(LocaleList))
      resolve(LocaleList)
    })
  },

  LocaleMapper: (valuesList) => {

    if (valuesList.length != 3)
      throw 'Linha com campos inválidos: ' + valuesList.join(Constants.IMPORT_FILE_SEPARATOR)

    return {
      id: valuesList[0],
      nome: valuesList[1],
      deviceId: valuesList[2]
    }
  }
}
