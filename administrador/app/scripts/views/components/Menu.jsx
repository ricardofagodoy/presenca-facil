import React from 'react';
import { Link } from 'react-router';
import SessionService from '../../services/SessionService';

export default class Menu extends React.Component {

		constructor(props){
	  	super(props);
		}

	handleLogout = (e) => {
			SessionService.logout();
	}

	render() {
		return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Presença Fácil</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Alunos
              <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/buscar-aluno">Buscar</Link></li>
                <li><Link to="/criar-aluno">Criar</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Professores
              <span className="caret"></span></a>
              <ul className="dropdown-menu">
              <li><Link to="/buscar-professor">Buscar</Link></li>
                <li><Link to="/criar-professor">Criar</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Turmas
              <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/buscar-turma">Buscar</Link></li>
                <li><Link to="/criar-turma">Criar</Link></li>
              </ul>
            </li>
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Matérias
              <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/buscar-materia">Buscar</Link></li>
                <li><Link to="/criar-materia">Criar</Link></li>
              </ul>
            </li>
						<li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">Aula
              <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><Link to="/buscar-aula">Buscar</Link></li>
                <li><Link to="/criar-aula">Criar</Link></li>
              </ul>
            </li>
						<li className="dropdown">
							<a className="dropdown-toggle" data-toggle="dropdown" href="#">Relatórios
							<span className="caret"></span></a>
							<ul className="dropdown-menu">
								<li><Link to="/gerar-relatorios">Gerar</Link></li>
							</ul>
						</li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><span className="glyphicon glyphicon-user"></span> Ricardo Godoy</a></li>
            <li><Link to="/logout"> <span className="glyphicon glyphicon-log-in"></span> LogOut</Link></li>


          </ul>
        </div>
      </nav>
	  );
	}
}
