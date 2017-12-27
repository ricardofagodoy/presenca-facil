import Constants from '../utils/Constants'
import { hashHistory } from 'react-router';

import axios from 'axios';

export default {

  login: (username, password) => {

    console.log('Calling login web service');

    // TODO: implement + filter session expired
    // https://github.com/mzabriskie/axios

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