import React from 'react';
import { Router, Route, Link, IndexRedirect, hashHistory, browserHistory } from 'react-router';

import SessionService from '../services/SessionService'

import Dashboard from './components/Dashboard';
import SearchStudent from './components/SearchStudent';
import CreateStudent from './components/CreateStudent';
import CreateTeacher from './components/CreateTeacher';
import CreateGroup from './components/CreateGroup';
import CreateCourse from './components/CreateCourse';
import CreateClass from './components/CreateClass';
import ImportStudent from './components/ImportStudent';
import GenerateReport from './components/GenerateReport';
import App from './App';
import Login from './Login';

export default class Routes extends React.Component {

	render() {
		return (
      <Router history={hashHistory}>
        <Route path="/login" component={Login} />
				<Route path="/logout" component={Login} onEnter={SessionService.logout}/>
        <Route path="/" component={App} onEnter={SessionService.verifyValid}>
          <Route path="home" component={Dashboard}/>
					<Route path="buscar-aluno" component={SearchStudent}/>
					<Route path="criar-aluno" component={CreateStudent}/>
					<Route path="criar-professor" component={CreateTeacher}/>
					<Route path="criar-turma" component={CreateGroup}/>
					<Route path="criar-materia" component={CreateCourse}/>
					<Route path="criar-aula" component={CreateClass}/>
					<Route path="importar-alunos" component={ImportStudent}/>
					<Route path="gerar-relatorios" component={GenerateReport}/>
          <IndexRedirect to="home" />
        </Route>
      </Router>
		);
	}
}
