import React from 'react';
import { hashHistory } from 'react-router';
import TeacherService from '../../services/TeacherService';
import Validation from 'react-validation';
import ImportTeacher from './ImportTeacher';

export default class createTeacher extends React.Component {

	constructor(props) {
		super(props);

		this.state = { name: '', email: '', username: '', password: '', success: 0, error: '', importModal: false };

		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.toggleImport = this.toggleImport.bind(this);
	}


	handleNameChange(e) {
		this.setState({ name: e.target.value });
	}

	handleEmailChange(e) {
		this.setState({ email: e.target.value });
	}

	handleUsernameChange(e) {
		this.setState({ username: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	toggleImport(e) {
		this.setState({ importModal: !this.state.importModal });
	}

	handleCreate(e) {
		e.preventDefault();

		TeacherService.createTeacher(this.state.name, this.state.email, this.state.username, this.state.password)
			.then((response) => {
				console.log('Professor Criado!');
				this.setState({ name: '', email: '', username: '', password: '', success: 1, error: '' });
			})
			.catch((error) => {
				this.setState({ success: 0, error: error.message });
			});
	}

	render() {
		return (
			<div className="container">
			   <div className="form-horizontal">
				 <div className="search-form" id="search-form">
				 <Validation.components.Form>
					 <div className="form-group">
						 <h3>Criar Professor</h3>
					 </div>

					 <div className="modal fade" id="myModal" role="dialog">
						 <div className="modal-dialog modal-lg">
							 <div className="modal-content">
								 <div className="modal-header">
									 <button type="button" className="close" data-dismiss="modal">&times;</button>
									 <h4 className="modal-title">Importar Professores</h4>
								 </div>
								 <div className="modal-body">
									 <ImportTeacher />
								 </div>
								 <div className="modal-footer">
									 <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
								 </div>
							 </div>
						 </div>
					 </div>



					 <div className={this.state.success ? '' : 'hidden'}>
						 <div className="alert alert-success">
							 Professor criado com sucesso.
						 </div>
					 </div>
					 <div className={this.state.error ? '' : 'hidden'}>
						 <div className="alert alert-danger">
							 {this.state.error}
						 </div>
					 </div>

					 <div className="form-group">
						 <label className="control-label col-sm-1" htmlFor="name">Nome: </label>
						 <div className="col-sm-3">
							 <Validation.components.Input className="form-control" validations={['required']}  placeholder="Nome" id="name" ref={el => this.inputNome = el} name="name" type="text" value={this.state.name} onChange={this.handleNameChange} />
						 </div>
					 </div>
					 <div className="form-group">
						 <label className="control-label col-sm-1" htmlFor="email">E-Mail: </label>
						 <div className="col-sm-3">
							 <Validation.components.Input className="form-control" validations={['required']}  placeholder="E-Mail" id="email" name="email" type="text" value={this.state.email} onChange={this.handleEmailChange} />
						 </div>
					 </div>
					 <div className="form-group">
						 <label className="control-label col-sm-1" htmlFor="name">Usuário: </label>
						 <div className="col-sm-3">
							 <Validation.components.Input className="form-control" validations={['required']}   placeholder="Usuário" id="username" name="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
						 </div>
					 </div>
					 <div className="form-group">
						 <label className="control-label col-sm-1" htmlFor="name">Senha: </label>
						 <div className="col-sm-3">
							 <Validation.components.Input className="form-control" validations={['required']}  placeholder="Senha" id="password" name="password" type="text" value={this.state.password} onChange={this.handlePasswordChange} />
						 </div>
					 </div>
					 <div className="form-group">
						 <div className="col-sm-7"> </div>
						 <div className="col-sm-2">
							 <button type="button" className="btn btn-primary btn-block" data-toggle="modal" data-target="#myModal">
								 Importar
								 </button>
						 </div>
						 <div className="col-sm-2">
							 <Validation.components.Button type="button" className="btn btn-primary btn-block" onClick={this.handleCreate}>
								 Criar
							 </Validation.components.Button>
						 </div>
					 </div>
				 </Validation.components.Form>
			 </div>
			   </div>
			</div>

		);
	}
}
