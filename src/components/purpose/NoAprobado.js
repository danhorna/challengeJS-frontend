import React from 'react'
import {Redirect} from 'react-router-dom'


function NoAprobado() {
    return (
        <div>
            (<Redirect push to="/signin" />)
        </div>
    )
}

export default NoAprobado