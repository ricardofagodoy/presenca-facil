import React from 'react';
import PropTypes from 'prop-types'

const ClassesList = ({ classes }) => {

    const classesList = classes.map(element =>

        <li key={element.nomeMateria} id="grade" className={"list-group-item"}>

            {element.diasSemana.reverse().map(dia =>
                <span key={dia} className="badge">{dia}</span>)}

            {element.nomeMateria}<br />{element.local} ({element.horarioInicio} - {element.horarioFim})
        </li>
    )

    return (<div className="panel center-block">
        <div className="panel-body">
            <ul className="list-group">
                {classesList}
            </ul>
        </div>
    </div>)
}

ClassesList.propTypes = {
    classes: PropTypes.array
};

export default ClassesList