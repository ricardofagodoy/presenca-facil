import React from 'react';
import { hashHistory } from 'react-router';
import GroupService from '../../services/GroupService';
import StudentService from '../../services/StudentService';
import ImportGroup from './ImportGroup';
import './rules.js';

import Validation from 'react-validation';

export default class CreateGroup extends React.Component {

	constructor(props) {

		super(props);

		this.state = { id: '', name: '', success: 0, error: '', students: [], studentsRight: [] };

		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.swapStudent = this.swapStudent.bind(this);

		this.loadStudents();
	}

	handleIdChange(e) {
		this.setState({ id: e.target.value });
	}

	handleNameChange(e) {
		this.setState({ name: e.target.value });
	}

	handleCreate(e) {
		e.preventDefault();
		GroupService.createGroup(this.state.id, this.state.name, this.state.studentsRight)
			.then((response) => {
				console.log('Turma Criada!');
				this.setState({ id: '', name: '', studentsRight: [], success: 1, error: '' });
				this.loadStudents();
			})
			.catch((error) => {
				this.setState({ success: 0, error: error.message });
				console.log(error.message);
			});
	}


	swapStudent(e) {
		let id = e.target.id
		let left = this.state.students
		let right = this.state.studentsRight
		let done = false

		for (var i = 0; i < left.length; i++) {
			if (left[i].id == id) {
				right.push(left[i])
				left.splice(i, 1)
				done = true
			}
		}

		if (!done) {
			for (var i = 0; i < right.length; i++) {
				if (right[i].id == id) {
					left.push(right[i])
					right.splice(i, 1)
				}
			}
		}
		this.setState({ students: left })
		console.log(id);
		console.log(left);
	}

	loadStudents() {
		StudentService.getAllStudents()
			.then((response) => {
				this.setState({ students: response.data.object })
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {

		const studentList = this.state.students.map((aluno) =>
			<tr key={aluno.id}>
				<td>{aluno.id}</td>
				<td>{aluno.nome}</td>
				<td>
					<a><span id={aluno.id} onClick={this.swapStudent} className="glyphicon glyphicon-arrow-right"></span></a>
				</td>
			</tr>
		);

		const groupList = this.state.studentsRight.map((aluno) =>
			<tr key={aluno.id}>
				<td>{aluno.id}</td>
				<td>{aluno.nome}</td>
				<td>
					<a><span id={aluno.id} onClick={this.swapStudent} className="glyphicon glyphicon-arrow-left"></span></a>
				</td>
			</tr>
		);

		return (
			<div className="container">
				<div className="form-horizontal">
					<Validation.components.Form>
						<div className="search-form" id="search-form">
							<div className="form-group">
								<h3>Criar Turma</h3>
							</div>

							<div className="modal fade" id="myModal" role="dialog">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header">
											<button type="button" className="close" data-dismiss="modal">&times;</button>
											<h4 className="modal-title">Importar Turmas</h4>
										</div>
										<div className="modal-body">
											<ImportGroup />
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
										</div>
									</div>
								</div>
							</div>


							<div className={this.state.success ? '' : 'hidden'}>
								<div className="alert alert-success">
									Turma criada com sucesso.
               					</div>
							</div>

							<div className={this.state.error ? '' : 'hidden'}>
								<div className="alert alert-danger">
									{this.state.error}
								</div>
							</div>

							<div className="form-group">
								<label className="control-label col-sm-1" htmlFor="id">ID: </label>
								<div className="col-sm-3">
									<Validation.components.Input validations={['required', 'numeric']} className="form-control" placeholder="Id" name="id" name="id" type="text" value={this.state.id} onChange={this.handleIdChange} />
								</div>

							</div>

							<div className="form-group">
								<label className="control-label col-sm-1" htmlFor="id">Nome: </label>
								<div className="col-sm-3">
									<Validation.components.Input validations={['required', 'alphaNumeric']} className="form-control" placeholder="Nome da Turma" name="name" type="text" value={this.state.name} onChange={this.handleNameChange} />
								</div>

							</div>

							<div className="row">
								<div className="col-md-4 col-sm-5 col-xs-5">
									<table className="table table-hover">
										<thead>
											<tr>
												<th>Alunos</th>
											</tr>
											<tr>
												<th width="15%">RA</th>
												<th width="35%">Nome</th>
												<th width="9%"></th>
											</tr>
										</thead>
										<tbody>
											{studentList}
										</tbody>
									</table>
								</div>

								<div className="col-md-4 col-sm-5 col-xs-5">
									<table className="table table-hover">
										<thead>
											<tr>
												<th>Turma</th>
											</tr>
											<tr>
												<th width="15%">RA</th>
												<th width="35%">Nome</th>
												<th width="9%"></th>
											</tr>
										</thead>
										<tbody>
											{groupList}
										</tbody>
									</table>
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
						</div>
					</Validation.components.Form>
				</div>
			</div>

		);
	}
}
