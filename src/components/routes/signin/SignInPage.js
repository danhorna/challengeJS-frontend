import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { validateEmail } from '../../../js/helpers';

function SignIn(props) {

    const [campos, setCampos] = useState({
        email: '',
        password: '',
    })

    const theSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(campos.email)) {
            axios.post(process.env.REACT_APP_BACK_URL + '/api/users/login', campos )
                .then(res => {
                    localStorage.setItem("loginToken", res.data);
                    props.history.push('/')     //VERIFICAR FUNCIONAMIENTO
                })
                .catch((e)=>{
                    console.log(e)
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

    return (
        <div className="container d-flex h-100">
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
        </div>
    )
}

export default SignIn