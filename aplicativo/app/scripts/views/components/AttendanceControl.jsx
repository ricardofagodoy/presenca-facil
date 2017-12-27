import React from 'react';
import PropTypes from 'prop-types'

const AttendanceControl = ({onLockClick, onListClick, attendanceAvailable}) => (

	<div id="attendanceControl">
		<hr />
		<div className={"left glyphicon " + (attendanceAvailable ? "glyphicon-ok" : "glyphicon-lock")}
			 onClick={onLockClick} />

		<div className="right glyphicon glyphicon-list-alt" onClick={onListClick} />
	</div>
)

export default AttendanceControl