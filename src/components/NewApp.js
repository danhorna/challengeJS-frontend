import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { comprobarLogin } from '../js/helpers';

import Navigator from '../components/purpose/Navigator'
import Loading from './purpose/Loading';
import NoAprobado from './purpose/NoAprobado';
import SinPermiso from './purpose/SinPermiso';

function NewApp() {
    const [acceso, setAcceso] = useState({
        estado: 'esperando',
        aprobado: null,
        rol: '',
        id: ''
    });

    useEffect(() => {
        let isMounted = true;
        function comp() {
            comprobarLogin()
                .then(res => {
                    if (isMounted)
                        if (res !== null)
                            setAcceso({
                                rol: res.rol,
                                id: res.id,
                                estado: 'listo',
                                aprobado: res.done
                            })
                        else {
                            setAcceso({
                                ...acceso,
                                estado: 'listo',
                                aprobado: false
                            })
                        }
                })
        }
        if (acceso.estado !== 'listo') {
            comp();
        }
        return () => { isMounted = false };
    })

    const [actual, setActual] = useState({
        price: '',
        logo: '',
        name: '',
        category: 'Juego',
        salert: false,
        scont: true

    })

    const refresh = (e) => {
        const { value, name } = e.target;
        setActual({
            ...actual,
            [name]: value
        });
        console.log(actual)
    }

    const theSubmit = (e) => {
        e.preventDefault();
        const data = {
            price: actual.price,
            logo: actual.logo,
            name: actual.name,
            category: actual.category,
            creator: acceso.id
        }
        axios.post('http://localhost:3000/api/apps/newapp', { data })
            .then(res => {
                setActual({
                    ...actual,
                    salert: true,
                    scont: false
                })
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
                                    <input type="text" className="form-control" id="name" name="name" value={actual.name || ''} placeholder="Nombre" step="0.01" onChange={refresh} />
                                    <br />
                                    <label htmlFor="category" className="col-form-label">Categoria:</label>
                                    <select className="form-control" id="category" name="category" onChange={refresh}>
                                        <option>Juego</option>
                                        <option>Aplicacion</option>
                                        <option>Utilidad</option>
                                    </select>
                                    <br />
                                    <label htmlFor="price" className="col-form-label">Precio:</label>
                                    <input type="number" className="form-control" id="price" name="price" value={actual.price || ''} placeholder="Precio" step="0.01" onChange={refresh} />
                                    <br />
                                    <label htmlFor="logo" className="col-form-label">Logo URL:</label>
                                    <input type="text" className="form-control" id="logo" name='logo' placeholder="Logo URL" value={actual.logo || ''} onChange={refresh} />
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

    function elMe() {
        return (
            <div>
                <Navigator />
                {actual.scont ? cont() : null}
                {actual.salert ? alert() : null}
            </div>
        )
    }

    return (
        <div>
            {console.log(acceso)}
            {
                acceso.estado === 'esperando' ? <Loading /> :
                    !acceso.aprobado ? <NoAprobado /> :
                        acceso.rol === 'dev' ? elMe() :
                            <SinPermiso />
            }

        </div>
    )
}

export default NewApp