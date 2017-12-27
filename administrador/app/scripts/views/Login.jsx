import React from 'react';
import { hashHistory } from 'react-router';
import LoginService from '../services/LoginService'

import SessionService from '../services/SessionService'

$(document).ready(function() {
  $('#login').click(function(e) {
    e.preventDefault();
    $('div#form-login').toggle('500');
  });
  $('#acesso').click(function(e) {
    e.preventDefault();
    $('div#form-login').toggle('500');
  });
});

export default class Login extends React.Component {

    constructor(props){
      super(props);

      this.state = {username: '', password: '', error: ''};

      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }

    handleUsernameChange(e) {
       this.setState({username: e.target.value});
    }

    handlePasswordChange(e) {
       this.setState({password: e.target.value});
    }

    handleLogin(e){
      e.preventDefault();

      LoginService.login(this.state.username,this.state.password)
      .then((response) => {
				
				if (response.data.object.perfil.nome == 'ADMIN'){
      		SessionService.startSession();
					hashHistory.push('/');
				}
				else{
					console.log('Login failed - not an ADMIN!');

					this.setState({username: '', password: '', error: 'Usuario sem permissao.'});
				}
      })
      .catch((error) => {
        console.log('Login failed - incorrect username/password!');
        this.setState({username: '', password: '', error: 'Usuario ou senha incorretos.'});
      });
    }


	render() {
		return (
      <div className="row panel-login">
  			<div className="panel panel-custom col-md-4 col-sm-4 col-xs-4 col-md-offset-4 col-sm-offset-4 col-xs-offset-4">
  				<div className="panel-body">
  						<div className="row">
  							<div className="col-md-12 col-sm-12 col-xs-12">
  								<h4 style={{borderBottom: '1 solid #c5c5c5'}}>
  									Bem-Vindo ao Setor Administrativo
  								</h4>

  								<div id="form-login">
  									<form acceptCharset="UTF-8" role="form" id="login-form">
  										<fieldset>
  											<div className="form-group input-group">
  												<span className="input-group-addon">
  													<i className="glyphicon glyphicon-user"></i>
  												</span>
  												<input className="form-control" placeholder="Username" id="username" name="username" type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
  											</div>
  											<div className="form-group input-group">
  												<span className="input-group-addon">
  													<i className="glyphicon glyphicon-lock"></i>
  												</span>
  												<input className="form-control" placeholder="Password" id="password" name="password" type="password" value={this.state.password} onChange={this.handlePasswordChange}/>
  											</div>
  											<div className="checkbox">
  											  <label><input type="checkbox" value=""/>Lembrar-me neste computador</label>
  											</div>

											<div className={this.state.error ? '' : 'hidden'}>
												<div className="alert alert-danger">
													{this.state.error}
												</div>
											</div>

  											<div className="form-group">
  												<button type="button" className="btn btn-primary btn-block" onClick={this.handleLogin}>
  													Login
  												</button>
  												<p className="help-block">
  													<a className="pull-right text-muted" href="#" id="login"><small>Esqueceu a sua senha?</small></a>
  												</p>
  											</div>
  										</fieldset>
  									</form>
  								</div>
  								<div style={{display: 'none'}} id="form-login">
  									<h5 className="">
  										Esqueceu a sua senha?
  									</h5>
  									<form acceptCharset="UTF-8" role="form" id="login-recordar" method="post">
  										<fieldset>
  											<span className="help-block">
  												Endereço de e-mail associado a sua conta
  												<br/>
  												Um e-mail será enviado com instruções para acessar a sua conta
  											</span>
  											<div className="form-group input-group">
  												<span className="input-group-addon">@</span>
  												<input className="form-control" placeholder="E-mail" name="email" type="email" required=""/>
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
  				</div>
        </div>
			</div>

		);
	}
}
