import React from 'react';

import Title from 'views/components/Title'
import UserClasses from 'containers/UserClasses'

import DataUtils from "utils/DataUtils"
import SessionService from 'services/SessionService'

export default () => (

	<div>

		<Title title='Grade de aulas'
			data={'Atualizado em ' + DataUtils.dataAtualCompacta()} />

		<br />

		<UserClasses />

	</div>
)