import React from 'react';
import PropTypes from 'prop-types'

const FrequencyList = ({ frequency }) => {

    const classes = frequency.map(element =>

        <li key={element.nomeMateria} className={"list-group-item " + (element.porcentagem < 75 ? "list-group-item-danger" : "")}>
            <span className="badge">{element.porcentagem} %</span>
            {element.nomeMateria}
        </li>
    )


    return (<div className="panel center-block">
        <div className="panel-body">
            <ul className="list-group">
                {classes}
            </ul>
        </div>
    </div>)
}

FrequencyList.propTypes = {
    message: PropTypes.array
};

export default FrequencyList