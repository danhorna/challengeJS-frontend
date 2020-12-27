import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignUp(props) {
    const [campos, setCampos] = useState({
        email: '',
        password: '',
        rol: '',
    })

    const theSubmit = (e) => {
        e.preventDefault();
        var data = {
            email: campos.email,
            password: campos.password,
            rol: campos.rol
        }
        let emailtest = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        if (emailtest.test(data.email)) {
            axios.post(process.env.REACT_APP_BACK_URL + '/api/users', data )
                .then(res => {
                    props.history.push('/signin')
                })
                .catch((e)=>{
                    console.log(e)
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

    return (
        <div className="container d-flex h-100">
            <div className="align-self-center w-100">
                <div className="col-lg-4 mx-auto">
                    <div className="card text-center p-4 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h5 className="card-title">Registrate</h5>
                            <h6 className="card-subtitle text-muted mt-1">Completa los datos</h6>
                            <form className="mt-5" onSubmit={theSubmit}>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={campos.email} onChange={refresh} />
                                <br />
                                <input type="password" autoComplete="on" className="form-control" id="password" name="password" placeholder="Password" value={campos.password} onChange={refresh} required/>
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
        </div>
    )
}

export default SignUp