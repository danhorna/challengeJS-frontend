import React from 'react';
import { Link } from 'react-router-dom';

function Navigator() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">JavaScript Challenge</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active" to="/me/apps">My Apps</Link>
                    <a className="nav-item nav-link" href="#">All Apps</a>
                </div>
            </div>
        </nav>
    )
}

export default Navigator