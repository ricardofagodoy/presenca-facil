import React from 'react';

export default class CurrentClasses extends React.Component {

	render() {
		return (
			<div>
				<div className="panel panel-custom panel-user">
					<div className="panel-body">
						<h3>Aulas atuais:</h3>
						<div className="card card-inverse card-info col-md-4 col-sm-4 col-xs-4" style={{ maxWidth: '20 rem' }}>
							<div className="card-block">
								<div className="card-left col-md-6 col-sm-6 col-xs-6">Turma:</div>
								<div className="card-right col-md-6 col-sm-6 col-xs-6">1º A</div>

								<div className="card-left col-md-6 col-sm-6 col-xs-6">Professor:</div>
								<div className="card-right col-md-6 col-sm-6 col-xs-6">João Silva</div>

								<div className="card-left col-md-6 col-sm-6 col-xs-6">Matéria:</div>
								<div className="card-right col-md-6 col-sm-6 col-xs-6">Matemática</div>
							</div>
							<hr></hr>

							<center>
								<i className="fa fa-clock-o"></i>
								&nbsp; &nbsp;
							03 de Maio 09:30 - 11:00
						</center>

							<br></br>
						</div>
					</div>
				</div>
				<div className="col-md-1 col-sm-1 col-xs-1"></div>
			</div>
		);
	}
}
