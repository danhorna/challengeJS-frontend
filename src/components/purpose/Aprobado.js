import React from 'react'
import {Redirect} from 'react-router-dom'


function Aprobado() {
    return (
        <div>
            (<Redirect push to="/me/apps" />)
        </div>
    )
}

export default Aprobado