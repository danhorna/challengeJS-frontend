import React, { useState } from 'react';
import Navigator from '../components/purpose/Navigator'
import { Link } from 'react-router-dom';
import axios from 'axios';


function CancelBuy(props) {
    const [cargando, setCargando] = useState({
        salert: false,
        scont: true
    })

    const theSubmit = () => {
        const data = props.location.param1;
        axios.post('http://localhost:3000/api/buy/cancel', { data })
            .then(res => {
                setCargando({
                    salert: true
                })
            })
    }

    const cont = () => {
        return (
            <div className="container d-flex h-100 mt-5 text-center">
                <div className="align-self-center w-100">
                    <div className="col-lg-4 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                Cancelar compra
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{props.location.param1.name}</h5>
                                <p className="card-text">¿Realmente desea cancelar la compra?</p>

                                <button className="btn btn-danger" onClick={theSubmit}>Eliminar</button>
                                <Link className="btn btn-primary ml-5" to='/me/apps'>Cancelar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const alert = ()=>{
        return (
            <div className="alert alert-success text-center" role="alert">
                <h4>Compra cancelada</h4>
                <Link className="noacclink" to="/me/apps">Volver</Link>
            </div>
            
        )
    }

    return (
        <div>
            <Navigator />
            {cargando.scont ? cont() : null}
            {cargando.salert ? alert() : null}
        </div>

    )
}

export default CancelBuy