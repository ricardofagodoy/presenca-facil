import React from 'react';

import DefaultTitle from 'containers/DefaultTitle'
import CurrentClass from 'containers/CurrentClass'
import NextClass from 'containers/NextClass'
import AttendanceStatus from 'containers/AttendanceStatus'

export default () => (
	<div>
		<DefaultTitle/>
		<CurrentClass>
			<AttendanceStatus/>
		</CurrentClass>
		<NextClass/>
	</div>
)