import Constants from '../utils/Constants'

import LoginService from './LoginService'
import { hashHistory } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default {

  verifyValid: () => {
    console.log('Verificando se a sessão é válida');

      if (cookies.get('sessionActive') == 'false'){
        console.log('Sessao invalida');
        hashHistory.push('/login');
      }
          
  },

  startSession: () => {
    cookies.set('sessionActive', 'true', { path: '/' });

    console.log('Session criada!');
  },

  logout: () => {
    cookies.set('sessionActive', 'false', { path: '/' });

    console.log('Session limpa!');

    hashHistory.push('/login');
  }
}
