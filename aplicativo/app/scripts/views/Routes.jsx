import React from 'react';
import { Router, Route, Link, IndexRedirect, hashHistory, browserHistory } from 'react-router';
import App from 'views/App';

import SessionService from 'services/SessionService'

import LoginView from 'views/LoginView';
import AlunoHomeView from 'views/AlunoHomeView';
import ProfessorHomeView from 'views/ProfessorHomeView';
import ShowStudents from 'containers/ShowStudents';
import AlunoPresencasView from 'views/AlunoPresencasView';
import UsuarioGradeView from 'views/UsuarioGradeView';

export default class Routes extends React.Component {

	render() {
		return (
			<Router history={hashHistory}>
				<Route path="/login" component={LoginView} />
				<Route path="/logout" component={LoginView} onEnter={SessionService.logout} />
				<Route path="/" component={App} onEnter={SessionService.verifyValid}>
					<Route path="aluno" component={AlunoHomeView} />
					<Route path="aluno/presencas" component={AlunoPresencasView} />
					<Route path="aluno/grade" component={UsuarioGradeView} />
					<Route path="professor/grade" component={UsuarioGradeView} />
					<Route path="professor" component={ProfessorHomeView} />
					<Route path="listaAluno/:classId" component={ShowStudents} />
					<IndexRedirect to="/login" />
				</Route>
			</Router>
		);
	}
}