import React from 'react';
import { hashHistory } from 'react-router';
import CourseService from '../../services/CourseService';
import ImportCourse from './ImportCourse';
import './rules.js';

import Validation from 'react-validation';


export default class createCourse extends React.Component {

	constructor(props) {
		super(props);

		this.state = { id: '', name: '', success: 0, error: '' };

		this.handleIdChange = this.handleIdChange.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);

		this.handleCreate = this.handleCreate.bind(this);
	}

	handleIdChange(e) {
		this.setState({ id: e.target.value });
	}

	handleNameChange(e) {
		this.setState({ name: e.target.value });
	}

	handleCreate(e) {
		e.preventDefault();
		CourseService.createCourse(this.state.id, this.state.name)
			.then((response) => {
				console.log('Materia Criada!');
				this.setState({ id: '', name: '', success: 1, error: '' });
			})
			.catch((error) => {
				this.setState({ success: 0, error: error.message });
				console.log(error.message);
			});
	}

	render() {
		return (
			<div className="container">
				<div className="form-horizontal">
					<div className="search-form" id="search-form">
						<Validation.components.Form>
							<div className="form-group">
								<h3>Criar Materia</h3>
							</div>



							<div className="modal fade" id="myModal" role="dialog">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header">
											<button type="button" className="close" data-dismiss="modal">&times;</button>
											<h4 className="modal-title">Importar Materias</h4>
										</div>
										<div className="modal-body">
											<ImportCourse />
										</div>
										<div className="modal-footer">
											<button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
										</div>
									</div>
								</div>
							</div>



							<div className={this.state.success ? '' : 'hidden'}>
								<div className="alert alert-success">
									Materia criada com sucesso.
                 				</div>
							</div>
							<div className={this.state.error ? '' : 'hidden'}>
								<div className="alert alert-danger">
									{this.state.error}
								</div>
							</div>


							<div className="form-group">

								<label className="control-label col-sm-1">
									Id*
										</label>
								<div className="col-sm-3">
									<Validation.components.Input className="form-control" value={this.state.id} name='id' validations={['required', 'alphaNumeric']} onChange={this.handleIdChange} />
								</div>
							</div>
							<div className="form-group">
								<label className="control-label col-sm-1">
									Nome*
								</label>
								<div className="col-sm-3">
									<Validation.components.Input className="form-control" value={this.state.name} name='name' validations={['required', 'alphaNumericWithSpaces']} onChange={this.handleNameChange} />
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
