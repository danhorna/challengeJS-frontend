import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './purpose/Loading';
import { comprobarLogin } from '../js/helpers';
import Aprobado from './purpose/Aprobado';
import NoAprobado from './purpose/NoAprobado'

function SignUp() {
    const [campos, setCampos] = useState({
        email: '',
        password: '',
        rol: '',
    })

    const [acceso, setAcceso] = useState({
        estado: 'esperando',
        aprobado: null
    });

    const theSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: campos.email,
            password: campos.password,
            rol: campos.rol
        }
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        .test(data.email)) {
            axios.post('http://localhost:3000/api/users', { data })
                .then(res => {
                    setAcceso({
                        ...acceso,
                        estado: 'registered'
                    })
                })
        }else {
            alert("La dirección de email es incorrecta.");
        }
    }

    const refresh = (e) => {
        const { value, id, name } = e.target;
        if (name !== 'rol') {
            setCampos({
                ...campos,
                [name]: value
            });
        } else {
            setCampos({
                ...campos,
                [name]: id
            });
        }
    }

    useEffect(() => {
        let isMounted = true;
        function comp() {
            comprobarLogin()
                .then(res => {
                    if (isMounted)
                        if (res !== null)
                            setAcceso({
                                estado: 'listo',
                                aprobado: res.done
                            })
                        else {
                            setAcceso({
                                estado: 'listo',
                                aprobado: false
                            })
                        }
                })
        }
        comp()
        return () => { isMounted = false };
    }, [])

    function bodySignup() {
        return (
            <div className="align-self-center w-100">
                <div className="col-lg-4 mx-auto">
                    <div className="card text-center p-4 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h5 className="card-title">Registrate</h5>
                            <h6 className="card-subtitle text-muted mt-1">Completa los datos</h6>
                            <form className="mt-5" onSubmit={theSubmit}>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={campos.email} onChange={refresh} />
                                <br />
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={campos.password} onChange={refresh} required/>
                                <br />
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="client" name="rol" className="custom-control-input" onChange={refresh} required/>
                                    <label className="custom-control-label" htmlFor="client">Cliente</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="dev" name="rol" className="custom-control-input" onChange={refresh} />
                                    <label className="custom-control-label" htmlFor="dev">Desarrollador</label>
                                </div>
                                <br /><br />
                                <button type="submit" className="btn btn-info rounded-pill">Registrarse</button>
                            </form>
                            <br />
                            <span className="noacc">¿Ya tenés una cuenta? </span>
                            <Link className="noacclink" to="/signin">Iniciar Sesion</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container d-flex h-100">
            {acceso.estado === 'cargando' ? <Loading /> :
                acceso.estado === 'registered' ? <NoAprobado /> :
                    acceso.aprobado ? <Aprobado /> :
                        bodySignup()
            }
        </div>
    )
}

export default SignUp