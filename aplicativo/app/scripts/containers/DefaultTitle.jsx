import React from 'react';

import Title from 'views/components/Title'

import SessionService from 'services/SessionService'
import DataUtils from "utils/DataUtils"

export default class DefaultTitle extends React.Component {

	constructor() {

		super();

		this.state = {
			title: 'Olá, ' + SessionService.loggedUser().nome,
			data: DataUtils.dataAtualExtenso()
		};
	}

	render() {

		return React.createElement(Title, {
			title: this.state.title, 
			data: this.state.data, 
		});
	}
}