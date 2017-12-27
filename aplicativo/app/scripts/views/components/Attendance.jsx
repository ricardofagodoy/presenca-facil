import React from 'react';
import PropTypes from 'prop-types'

const Attendance = ({ done }) => (

	<div>
		<hr />

		<div >
			<span className="card-left">Presença: </span>
			<span className="card-right"> {done ? "Feita!" : "Pendente"}</span>
		</div>
	</div>
)

Attendance.propTypes = {
    done: PropTypes.bool
};

export default Attendance