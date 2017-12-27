import React from 'react';

import FrequencyList from 'views/components/FrequencyList'
import AttendanceService from 'services/AttendanceService'

import Nofification from 'utils/Notifications'
import SessionService from 'services/SessionService'

export default class StudentAttendances extends React.Component {

	constructor() {

		super();

		this.state = {
			frequency: []
		};

		this.getClassesFrequency(SessionService.loggedUser().id);
	}

	getClassesFrequency(studentId) {
		AttendanceService.findClassesFrequency(studentId,
			(response) => this.setState({ frequency: response }),
			(errorMsg) =>  Nofification.error('Fail open attendance: ' + errorMsg)
		);
	}

	render() {
		return React.createElement(FrequencyList, {
			frequency: this.state.frequency
		});
	}
}