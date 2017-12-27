import React from 'react';

const CardError = ({ error }) => (

    <div className={"panel center-block " + (error ? '' : 'hidden')}>
        <div className="panel-body">
            <h1>{(error ? error.title : '')}</h1>
            <h4 style={{ textAlign: "center" }} >{(error ? error.message : '')}</h4>
        </div>
    </div >
)

export default CardError