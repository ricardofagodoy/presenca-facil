import React from 'react';

import ClassesList from 'views/components/ClassesList'
import ClassService from 'services/ClassService'

import Nofification from 'utils/Notifications'
import SessionService from 'services/SessionService'

export default class UserClasses extends React.Component {

	constructor() {

		super();

		this.state = {
			classes: []
		};

		this.getAllClasses(SessionService.loggedUser().id);
	}

	getAllClasses(userId) {
		ClassService.findAllClasses(userId,
			(response) => this.setState({ classes: response }),
			(errorMsg) =>  Nofification.error('Fail open attendance: ' + errorMsg)
		);
	}

	render() {
		return React.createElement(ClassesList, {
			classes: this.state.classes
		});
	}
}