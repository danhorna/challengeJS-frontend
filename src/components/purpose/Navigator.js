import React from 'react';
import { Link } from 'react-router-dom';

function Navigator(props) {
    const logout = ()=>{
        localStorage.removeItem("loginToken")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">JavaScript Challenge</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/me/apps">{props.seccion}</Link>
                    <Link className="nav-item nav-link" to="/apps">Ver apps</Link>

                    <Link className="btn btn-outline-info" to="/signin" onClick={logout}>Cerrar sesion</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navigator