import React from 'react';
import PropTypes from 'prop-types'

const Title = ({title, data}) => (
	<div className="panel center-block">
		<div className="panel-body">
			<h1>{title}</h1>
			<h4>{data}</h4>
		</div>
	</div>
)

Title.propTypes = {
	title: PropTypes.string.isRequired,
	data: PropTypes.string.isRequired
};

export default Title