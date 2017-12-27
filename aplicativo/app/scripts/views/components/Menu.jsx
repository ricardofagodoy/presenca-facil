import React from 'react';
import { Link } from 'react-router';

import SessionService from 'services/SessionService';

$(document).ready(function () {
	$(".navbar-toggle").on("click", function () {
		$(this).toggleClass("active");
	});
});

export default class Menu extends React.Component {

	constructor() {

		super()

		this.state = {
			perfil: SessionService.loggedUser().perfil.nome
		};
	}

	handleLogout = (e) => {
		SessionService.logout();
	}

	render() {

		let opcaoVariavel1 = "";
		let opcaoVariavel2 = "";

		if (this.state.perfil == "ALUNO") {
			opcaoVariavel1 = <li><Link to={this.state.perfil.toLowerCase() + "/grade"}>Grade</Link></li>;
			opcaoVariavel2 = <li><Link to={this.state.perfil.toLowerCase() + "/presencas"}>Presenças</Link></li>;

		} else if (this.state.perfil == "PROFESSOR") {
			opcaoVariavel1 = <li><Link to={this.state.perfil.toLowerCase() + "/grade"}>Grade</Link></li>;
			opcaoVariavel2 = "";
		}

		return (
			<div className="navbar navbar-inverse navbar-fixed-top">
				<div className="navbar-header">
					<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>

					<Link to={this.state.perfil.toLowerCase()}>
						<div className="navbar-brand" >Presença Fácil</div>
					</Link>
				</div>
				<div className="navbar-collapse collapse">
					<ul className="nav navbar-nav">

						{opcaoVariavel1}

						{opcaoVariavel2}

						<li>
							<Link onClick={this.handleLogout} to={"/logout"}>
								Sair
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}