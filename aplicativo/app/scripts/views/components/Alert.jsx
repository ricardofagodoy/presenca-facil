import React from 'react';
import PropTypes from 'prop-types'

const Alert = ({message}) => (
    <div className={"center-block " + (message ? '' : 'hidden')}>
        <div className="alert alert-danger center" role="alert" >
            {message}
        </div>
    </div>
)

Alert.propTypes = {
    message: PropTypes.string
};

export default Alert