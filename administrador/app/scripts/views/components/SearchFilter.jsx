import React from 'react';

export default class SearchFilter extends React.Component {

	render() {
		return (
			<div className="form-group">
				<label className="control-label col-sm-1" htmlFor="ra">RA: </label>
				<div className="col-sm-3">
					<input type="text" className="form-control" id="ra"></input>
				</div>
				<div className="col-sm-3"></div>
				<label className="control-label col-sm-1" htmlFor="class">Turma:</label>
				<div className="col-sm-4">
					<select className="form-control" id="class">
						<option>1º A</option>
						<option>1º B</option>
						<option>1º C</option>
						<option>Biologia Avançada</option>
					</select>
				</div>
			</div>
		);
	}
}
