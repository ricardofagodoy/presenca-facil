import React from 'react';

import Nofification from 'utils/Notifications'

import AttendanceControl from 'views/components/AttendanceControl'
import { hashHistory } from 'react-router';

import AttendanceService from 'services/AttendanceService'
import SessionService from 'services/SessionService'

export default class AttendanceMaker extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			attendanceAvailable: false
		}
	}

	onLockClick = () => {

		let attendanceAvailable = !this.state.attendanceAvailable;

		AttendanceService.openAttendance(this.props.classId,
			(response) => {

				this.setState({
					attendanceAvailable: attendanceAvailable
				});

				if (attendanceAvailable)
					Nofification.success('Presença aberta.')
				else
					Nofification.error('Presença fechada.')
			},
			
			(errorMsg) => Nofification.error('Fail open attendance: ' + errorMsg)
		)
	}
	onListClick= () => {
		hashHistory.push('/listaAluno/' + this.props.classId);
	}

	render() {
		return React.createElement(AttendanceControl, {
			onLockClick: this.onLockClick,
			onListClick: this.onListClick,
			attendanceAvailable: this.state.attendanceAvailable
		});
	}
}