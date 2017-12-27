import React from 'react';

import ClassCard from 'views/components/ClassCard'

import ClassService from 'services/ClassService'
import SessionService from 'services/SessionService'

export default class NextClass extends React.Component {

	constructor() {

		super();

		this.state = {
			title: 'Próxima aula',
			style: "card-warning",
			nextClass: {
				error: {
					title: 'Carregando...',
					message: ''
				}
			}
		};

		this.loadNextClass();
	}

	loadNextClass = () => {
		ClassService.findNextClass(SessionService.loggedUser(),
			(response) => this.setState({
				nextClass: ClassService.prepareToView(response)
			}),
			(errorMsg) => this.setState({
				nextClass: {
					error: { title: "Próxima aula", message: errorMsg }
				}
			})
		);
	}

	render() {
		return React.createElement(ClassCard, {
			title: this.state.title,
			style: this.state.style,
			classData: this.state.nextClass
		});
	}
}