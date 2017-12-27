import Constants from '../utils/Constants'
import { hashHistory } from 'react-router'
import Cookies from 'universal-cookie';

let loggedUser = undefined;

const cookies = new Cookies();

export default {

  verifyValid: () => {

    console.log('Checking if session is valid');

    //if (loggedUser === undefined)
    //  return hashHistory.push('/login');

    if ((loggedUser === undefined) || (cookies.get('sessionActive') == 'false')) {
      console.log('Sessao invalida');
      hashHistory.push('/login');
    } else {
      console.log('Sessao valida');
      if (loggedUser.perfil.nome == 'PROFESSOR'){
        console.log('Sessao Professor');
      }
      else if (loggedUser.perfil.nome == 'ALUNO'){
        console.log('Sessao Aluno');
      }
    }
  },

  startSession: (user) => {
    cookies.set('sessionActive', 'true', { path: '/' });
    loggedUser = user;
    console.log('Session started!');
  },

  logout: () => {
    cookies.set('sessionActive', 'false', { path: '/' });
    loggedUser = undefined;
    console.log('Session ended!');
    hashHistory.push('/login');
  },

  loggedUser: () => {
    return loggedUser;
  }
}