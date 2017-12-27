import React from 'react'

import DefaultTitle from 'containers/DefaultTitle'
import CurrentClass from 'containers/CurrentClass'
import AttendanceMaker from 'containers/AttendanceMaker'
import NextClass from 'containers/NextClass'

export default () => (
	<div>
		<DefaultTitle/>
		<CurrentClass>
			<AttendanceMaker/>
		</CurrentClass>
		<NextClass/>
	</div>
)