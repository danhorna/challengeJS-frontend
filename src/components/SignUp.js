import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const [campos,setCampos] = useState({
        email: '',
        password: '',
        rol: '',
    })
    const [cargando,setCargando] = useState({estado : 'cargando'})

    const theSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: campos.email,
            password: campos.password,
            rol: campos.rol
        }
        axios.post('http://localhost:3000/api/users', {data})
            .then(res =>{
                setCargando({
                    estado : 'registered'
                })
            })
    }

    const refresh = (e) => {
        const {value, id, name} = e.target;
        if (name !== 'rol'){
            setCampos({
                ...campos,
                [name] : value
            });
        } else {
            setCampos({
                ...campos,
                [name] : id
            });
        }
    }

    useEffect(()=>{
        let isMounted = true;
        function checkUser(){
            var tokenls = localStorage.getItem("loginToken");
            if (tokenls != null){
                axios.post('http://localhost:3000/api/users/check', {tokenls})
                    .then(res =>{
                        console.log(res.data)
                        if (res.data.done === 'accept'){
                            if (isMounted)
                                setCargando({
                                    estado: 'logged'
                                })
                        } else {
                            if(res.data.done === 'invalid'){
                                if (isMounted)
                                    setCargando({
                                        estado: 'notlogged'
                                    })
                            }
                        }
                    })
            }
            else {
                setCargando({
                    estado : 'notlogged'
                })
            }
        }
        checkUser();
        return () => { isMounted = false };
    }, [])

    function loading(){
        return (
            <div>
                cargando
            </div>
        )
    }

    function bodySignup(){
        return(
            <div className="align-self-center w-100">
                <div className="col-lg-4 mx-auto">
                    <div className="card text-center p-4 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h5 className="card-title">Registrate</h5>
                            <h6 className="card-subtitle text-muted mt-1">Completa los datos</h6>
                            <form className="mt-5" onSubmit={theSubmit}>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={campos.email} onChange={refresh}/>
                                <br />
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={campos.password} onChange={refresh}/>
                                <br />
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="client" name="rol" className="custom-control-input" onChange={refresh}/>
                                    <label className="custom-control-label" htmlFor="client">Cliente</label>
                                </div>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <input type="radio" id="dev" name="rol" className="custom-control-input" onChange={refresh}/>
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
            {   cargando.estado === 'cargando'? loading() : 
                cargando.estado === 'registered'? (<Redirect push to="/signin"/>) : 
                cargando.estado === 'notlogged'? bodySignup() :
                (<Redirect push to="/"/>)
            }
        </div>
    )
}

export default SignUp