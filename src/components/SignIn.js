import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './purpose/Loading';
import { comprobarLogin } from '../js/helpers';
import Aprobado from './purpose/Aprobado';

function SignIn() {
    const [acceso, setAcceso] = useState({
        estado: 'esperando',
        aprobado: null
    });

    const [campos, setCampos] = useState({
        email: '',
        password: '',
    })

    const theSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: campos.email,
            password: campos.password
        }
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        .test(data.email)) {
            axios.post('http://localhost:3000/api/users/login', { data })
                .then(res => {
                    localStorage.setItem("loginToken", res.data);
                    setAcceso({
                        ...acceso,
                        aprobado: true
                    })
                })
        } else {
            alert("La dirección de email es incorrecta.");
        }

    }

    const refresh = (e) => {
        const { value, name } = e.target;
        setCampos({
            ...campos,
            [name]: value
        });
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

    function bodySignin() {
        return (
            <div className="align-self-center w-100">
                <div className="col-lg-4 mx-auto">
                    <div className="card text-center p-4 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h5 className="card-title">¡Bienvenido!</h5>
                            <h6 className="card-subtitle text-muted mt-1">Inicia sesion para acceder</h6>
                            <form className="mt-5" onSubmit={theSubmit}>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={campos.email} onChange={refresh} />
                                <br />
                                <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={campos.password} onChange={refresh} required/>
                                <br />
                                <button type="submit" className="btn btn-info rounded-pill">Iniciar Sesion</button>
                                <br />
                            </form>
                            <br />
                            <span className="noacc">¿No tenés una cuenta? </span>
                            <Link className="noacclink" to="/signup">Registrate</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container d-flex h-100">
            {acceso.estado === 'esperando' ? <Loading /> :
                acceso.aprobado ? <Aprobado /> :
                    bodySignin()
            }

        </div>
    )
}

export default SignIn