import React from 'react';
import PropTypes from 'prop-types'

import CardError from 'views/components/CardError'

const ClassCard = ({title, style, classData, onChildChange, child}) => (

	<div>

		<CardError error={classData.error} />

		<div className={classData.error ? 'hidden' : ''}>
			<div className="panel center-block">
				<div className="panel-body">

					<h3>{title}</h3>

					<div className={"card card-inverse " + style}>

						<div className="card-block center">
							<div>
								<span className="card-right"> {classData.local}</span>
							</div>
							<div>
								<span className="card-right"> {classData.materia}</span>
							</div>
							<div>
								<span className="card-right"> {classData.dataProxima}</span>
							</div>
							<div>
								<span className="card-right"> {classData.horarioInicio + " - " + classData.horarioFim}</span>
							</div>
							
							{child && React.cloneElement(child, { classId: classData.id, onChange: onChildChange })}

						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
)

ClassCard.propTypes = {
    classData: PropTypes.object.isRequired
};

export default ClassCard