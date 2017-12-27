import React from 'react';

import Nofification from 'utils/Notifications'

import Attendance from 'views/components/Attendance'

import BluetoothService from 'services/BluetoothService'
import AttendanceService from 'services/AttendanceService'
import SessionService from 'services/SessionService'

export default class AttendanceStatus extends React.Component {

	constructor() {

		super();

		this.state = {
			done: false
		};
	}

	componentWillReceiveProps(nextProps) {

		const classId = nextProps.classId;

		// Se a aula mudou, verificar novamente!
		if (this.props.classId != classId)
			this.checkAttendance(classId)
	}

	checkAttendance(classId) {
		AttendanceService.findAttendances(SessionService.loggedUser().id,
			(response) => {

				const attendedClasses = response

				// Aluno já está presente na aula
				if (attendedClasses[classId] != undefined) {

					this.setState({ done: true });
					this.props.onChange(true);

					this.stopClassCheck(classId)

					//Nofification.success('Você está presente!')
					Nofification.native('Presença Fácil','Você está presente!')

				} else {
					// Verifica quando a aula abrir
					this.startClassCheck(classId)
				}
			},
			(errorMsg) => {}//Nofification.error('Falha na presença: ' + errorMsg)
		)
	}

	startClassCheck(classId) {

		AttendanceService.startClassStatusCheck(classId,
			(deviceId) => {

				if (!deviceId)
					return;

				console.log('Class is open!')

				// Se aluno estiver proximo ao beacon, presente!
				this.scanDevices(deviceId, (device) =>
					this.makeAttendance(classId, deviceId))
			})
	}

	scanDevices(targetDevice, onDeviceFound) {
		BluetoothService.scanDevices(60,
			(deviceId) => {
				console.log('Device found: ' + JSON.stringify(deviceId))
				if (deviceId.name == targetDevice)
					onDeviceFound(deviceId)
			},
			(error) => Nofification.error("Falha ao encontrar beacon: " + error)
		)
	}

	makeAttendance(classId, deviceId) {
		AttendanceService.makeAttendance(classId, deviceId, SessionService.loggedUser().id,
			(response) => this.checkAttendance(classId),
			(errorMsg) => {}//Nofification.error('Falha na presença: ' + errorMsg)
		)
	}

	stopClassCheck(classId) {
		AttendanceService.stopClassStatusCheck(classId)
	}

	render() {
		return React.createElement(Attendance, {
			done: this.state.done
		});
	}
}