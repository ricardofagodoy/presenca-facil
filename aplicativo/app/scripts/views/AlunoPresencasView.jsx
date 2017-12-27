import React from 'react';

import Title from 'views/components/Title'
import StudentAttendances from 'containers/StudentAttendances'

import DataUtils from "utils/DataUtils"
import SessionService from 'services/SessionService'

export default () => (

	<div>

		<Title title='Frequências do semestre'
			data={'Atualizado em ' + DataUtils.dataAtualCompacta()} />

		<br />

		<StudentAttendances
			studentId={SessionService.loggedUser().id} />

	</div>
)