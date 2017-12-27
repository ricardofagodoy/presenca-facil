import React from 'react';

import ClassCard from 'views/components/ClassCard'

import ClassService from 'services/ClassService'
import SessionService from 'services/SessionService'

export default class CurrentClass extends React.Component {

	constructor() {

		super();

		this.state = {
			title: 'Aula atual',
			style: 'card-info',
			currentClass: {
				error: {
					title: 'Carregando...',
					message: ''
				}
			},
			attendanceDone: false
		};

		this.loadCurrentClass();
	}

	loadCurrentClass() {
		ClassService.findCurrentClass(SessionService.loggedUser(),
			(response) => this.setState({
				currentClass: ClassService.prepareToView(response)
			}),
			(errorMsg) => this.setState({
				currentClass: {
					error: {
						title: 'Aula atual',
						message: errorMsg
					}
				}
			})
		);
	}

	onChildChange = (done) => {
		this.setState({ style: done ? "card-success" : "card-info" });
	}

	render() {
		return React.createElement(ClassCard, {
			title: this.state.title,
			style: this.state.style,
			classData: this.state.currentClass,
			onChildChange: this.onChildChange,
			child: this.props.children
		});
	}
}