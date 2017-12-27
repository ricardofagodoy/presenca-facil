import Constants from '../utils/Constants'
import { hashHistory } from 'react-router';

import axios from 'axios';

export default {

  login: (username, password) => {

    console.log('Calling login web service');

    return axios.post(Constants.WS.LOGIN,
    {
        usuario: username,
        senha: password
    },
    {
        withCredentials: true
    });
  }
}
