import React from 'react';
import PropTypes from 'prop-types'
import StudentService from '../services/StudentService';
import AttendanceService from '../services/AttendanceService';
import Nofification from 'utils/Notifications'

export default class ShowStudents extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			studentList: [],
			attendanceList: []
		};

		this.toggleSelection = this.toggleSelection.bind(this);
		this.checkAttendance = this.checkAttendance.bind(this);
		this.getStudents = this.getStudents.bind(this);
		this.getStudents();
		this.getAttendance = this.getAttendance.bind(this);
		this.getAttendance();
		this.makeAttendance = this.makeAttendance.bind(this);
	}

	checkAttendance() {

		let attList = this.state.attendanceList;
		let studList = this.state.studentList;

		for (let i = 0; i < studList.length; i++) {
			if (attList.indexOf(studList[i].id) != -1) {
				studList[i].checked = "list-group-item active";
			} else {
				studList[i].checked = "list-group-item";
			}
		}

		this.setState({ studentList: studList });
	}


	makeAttendance(classId, studentId) {
		AttendanceService.makeNoDeviceAttendance(classId, studentId,
			(response) => {
				let newAttendanceList = this.state.attendanceList;
				newAttendanceList.push(parseInt(studentId))

				this.checkAttendance();
			},
			(errorMsg) => Nofification.error('Falha na presença - A aula não está aberta')
		)
	}

	removeAttendance(classId, studentId) {
		AttendanceService.removeAttendance(classId, studentId,
			(response) => {
				this.checkAttendance();
			},
			(errorMsg) => Nofification.error('Falha ao remover presença')
		)
	}

	toggleSelection(e) {
		let newAttendanceList = [];
		newAttendanceList = this.state.attendanceList;
		let index = newAttendanceList.indexOf(parseInt(e.target.id));

		if (index == -1) {
			this.makeAttendance(this.props.params.classId, e.target.id);
		}
		else {
			this.removeAttendance(this.props.params.classId, e.target.id);
			newAttendanceList.splice(index, 1);
		}

		this.checkAttendance();
	}

	getStudents() {
		StudentService.getAllStudents()
			.then((response) => {

				if (response.data.object) {
					this.setState({ studentList: response.data.object })
					this.checkAttendance();
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getAttendance() {
		StudentService.getAttendance(this.props.params.classId)
			.then((response) => {
				let newAttendanceList = [];
				for (let key in response.data)
					newAttendanceList.push(parseInt(key))

				this.setState({ attendanceList: newAttendanceList })
				this.checkAttendance();
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {

		let listContent = [];

		this.state.studentList.forEach((student) => {
			listContent.push(
				<ul key={student.id}>
					<li className={student.checked} id={student.id} onClick={this.toggleSelection}>{student.nome} ({student.id})</li>
				</ul>

			);
		});

		return (
			<div className="panel panel-default center-block">
				<div className="panel-heading">Lista de Alunos</div>
				<ul className="list-group">
					{listContent}
				</ul>
			</div>
		)
	}
}