import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { getUser } from '../../../js/helpers';
import Navigator from '../../purpose/Navigator'

function NewApp() {
    const [user, setUser] = useState({
        loaded: false,
        id: ''
    });

    const [actual, setActual] = useState({
        price: '',
        logo: '',
        name: '',
        category: 'Juego',
        salert: false,
        scont: true

    })

    useEffect(() => {
        if (!user.loaded) {
            getUser()
                .then(async res => {
                    setUser({
                        loaded: true,
                        id: res.id
                    })
                })
        }
    })

    const refresh = (e) => {
        const { value, name } = e.target;
        setActual({
            ...actual,
            [name]: value
        });
    }

    const theSubmit = (e) => {
        e.preventDefault();
        const data = {
            price: actual.price,
            logo: actual.logo,
            name: actual.name,
            category: actual.category,
            creator: user.id
        }
        axios.post(process.env.REACT_APP_BACK_URL + '/api/apps',  data )
            .then(res => {
                setActual({
                    ...actual,
                    salert: true,
                    scont: false
                })
            })
            .catch((e)=>{
                console.log(e)
            })
    }

    const alert = () => {
        return (
            <div className="alert alert-success text-center" role="alert">
                <h4>App creada</h4>
                <Link className="noacclink" to="/me/apps">Volver</Link>
            </div>

        )
    }

    const cont = () => {
        return (
            <div className="container d-flex h-100 mt-5">
                <div className="align-self-center w-100">
                    <div className="col-lg-4 mx-auto">
                        <div className="card text-center p-4 shadow-lg p-3 mb-5 bg-white rounded">
                            <div className="card-header">Crear App</div>
                            <div className="card-body">
                                <form className="mt-5" onSubmit={theSubmit}>
                                    <label htmlFor="name" className="col-form-label">Nombre:</label>
                                    <input type="text" className="form-control" id="name" name="name" value={actual.name || ''} placeholder="Nombre" step="0.01" onChange={refresh} required/>
                                    <br />
                                    <label htmlFor="category" className="col-form-label">Categoria:</label>
                                    <select className="form-control" id="category" name="category" onChange={refresh}>
                                        <option>Juego</option>
                                        <option>Aplicacion</option>
                                        <option>Utilidad</option>
                                    </select>
                                    <br />
                                    <label htmlFor="price" className="col-form-label">Precio:</label>
                                    <input type="number" className="form-control" id="price" name="price" value={actual.price || ''} placeholder="Precio" step="0.01" onChange={refresh} required/>
                                    <br />
                                    <label htmlFor="logo" className="col-form-label">Logo URL:</label>
                                    <input type="text" className="form-control" id="logo" name='logo' placeholder="Logo URL" value={actual.logo || ''} onChange={refresh} required />
                                    <br />
                                    <button type="submit" className="btn btn-info rounded-pill">Publicar</button>
                                    <br />
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    function body() {
        return (
            <React.Fragment>
                <Navigator />
                {actual.scont ? cont() : null}
                {actual.salert ? alert() : null}
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {
                body()
            }
        </React.Fragment>
    )
}

export default NewApp