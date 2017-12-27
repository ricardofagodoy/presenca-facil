import React from 'react';

import Menu from 'views/components/Menu';

export default class App extends React.Component {
	
	render() {
		return (
			<div>

				<Menu/>
				
				<div className="page-space">
					{this.props.children}
				</div>
			</div>
		);
	}
}