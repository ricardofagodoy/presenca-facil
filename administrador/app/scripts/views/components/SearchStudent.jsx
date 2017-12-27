import React from 'react';
import { hashHistory } from 'react-router';

import SessionService from '../../services/SessionService'
import ResultTable from './ResultTable'

export default class SearchStudent extends React.Component {

	render() {
		return (
      <ResultTable/>
		);
	}
}
