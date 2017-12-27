import React from 'react';
import { hashHistory } from 'react-router';

import LoginService from 'services/LoginService'
import SessionService from 'services/SessionService'

//import SessionMock from 'tests/mocks/mock-session.js'

export default class Login extends React.Component {

	constructor(props) {

		super(props);

		this.state = { username: '', password: '', error: '' };

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleUsernameChange(e) {
		this.setState({ username: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	/*handleLogin(e) {

		e.preventDefault();

		if (this.state.username.toLowerCase() == 'a') {
			SessionMock.startSessionStudent()
			hashHistory.push('/aluno');
		} else {
			SessionMock.startSessionProfessor()
			hashHistory.push('/professor');
		}
	}*/

	handleLogin(e) {
		e.preventDefault();

		LoginService.login(this.state.username, this.state.password)
			.then((response) => {

				if (response.data.object.perfil.nome == 'ALUNO') {
					SessionService.startSession(response.data.object);
					hashHistory.push('/aluno');
				}
				else if (response.data.object.perfil.nome == 'PROFESSOR') {
					SessionService.startSession(response.data.object);
					hashHistory.push('/professor');
				}
				else {
					console.log('Login failed - not a professor os student!');

					this.setState({ username: '', password: '', error: 'Usuario sem permissao.' });
				}
			})
			.catch((error) => {
				console.log('Login failed - incorrect username/password!');
				this.setState({ username: '', password: '', error: 'Usuario ou senha incorretos.' });
			});
	}

	render() {
		return (
			<div id="panel-login" className="panel container-fluid">

				<div className="panel-body">

					<h4 className="center">
						Presença Fácil - Login
				</h4>

					<div id="errorMessage" className={this.state.error ? '' : 'hidden'}>
						<div className="alert alert-danger center" role="alert">
							{this.state.error}
						</div>
					</div>

					<form acceptCharset="UTF-8" role="form" id="login-form">
						<fieldset>
							<div className="form-group input-group">
								<span className="input-group-addon">
									<i className="glyphicon glyphicon-user"></i>
								</span>
								<input className="form-control" placeholder="Username" id="username" name="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
							</div>
							<div className="form-group input-group">
								<span className="input-group-addon">
									<i className="glyphicon glyphicon-lock"></i>
								</span>
								<input className="form-control" placeholder="Password" id="password" name="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
							</div>
							<div className="checkbox">
								<label><input type="checkbox" value="" />Lembrar-me</label>
							</div>
							<div className="form-group">
								<button type="button" className="btn btn-primary btn-block" onClick={this.handleLogin}>
									Login
							</button>
								<p className="help-block">
									<a className="pull-right text-muted" href="#/professor" id="login"><small>Esqueceu a sua senha?</small></a>
								</p>
							</div>
						</fieldset>
					</form>

					<div style={{ display: 'none' }}>

						<h5 className="">
							Esqueceu a sua senha?
					</h5>

						<form acceptCharset="UTF-8" role="form" id="login-recordar" method="post">
							<fieldset>
								<span className="help-block">
									Endereço de e-mail associado a sua conta
								<br />
									Um e-mail será enviado com instruções para acessar a sua conta
							</span>
								<div className="form-group input-group">
									<span className="input-group-addon">@</span>
									<input className="form-control" placeholder="E-mail" name="email" type="email" required="" />
								</div>
								<button type="submit" className="btn btn-primary btn-block" id="btn-login">
									Enviar
							</button>
								<p className="help-block">
									<a className="text-muted" href="#" id="acesso"><small>Acesse a sua conta</small></a>
								</p>
							</fieldset>
						</form>

					</div>
				</div>
			</div>
		);
	}
}
