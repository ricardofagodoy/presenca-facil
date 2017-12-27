import React from 'react';
import WelcomeHeader from './WelcomeHeader'
import CurrentClasses from './CurrentClasses'
import NextClasses from './NextClasses'

export default class Dashboard extends React.Component {
	render() {
		return (
			<div>
	      		<WelcomeHeader/>
				<CurrentClasses/>
				<NextClasses/>
			</div>
		);
	}
}
