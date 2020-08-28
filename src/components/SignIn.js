import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function SignIn(){
    const [campos,setCampos] = useState({
        email: '',
        password: '',
    })

    const [cargando,setCargando] = useState({estado : 'cargando'})

    const theSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: campos.email,
            password: campos.password
        }
        axios.post('http://localhost:3000/api/users/login', {data})
            .then(res =>{
                localStorage.setItem( "loginToken", res.data);
                setCargando({
                    estado : 'logged'
                })
            })
    }
    
    const refresh = (e) => {
        const {value, name} = e.target;
        setCampos({
            ...campos,
            [name] : value
        });
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

    function bodySignin(){
        return(
            <div className="align-self-center w-100">
                <div className="col-lg-4 mx-auto">
                    <div className="card text-center p-4 shadow-lg p-3 mb-5 bg-white rounded">
                        <div className="card-body">
                            <h5 className="card-title">¡Bienvenido!</h5>
                            <h6 className="card-subtitle text-muted mt-1">Inicia sesion para acceder</h6>
                            <form className="mt-5" onSubmit={theSubmit}>
                                <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={campos.email} onChange={refresh}/>
                                <br/>
                                <input type="password" className="form-control" id="password" name='password' placeholder="Password" value={campos.password} onChange={refresh}/>
                                <br/>
                                <button type="submit" className="btn btn-info rounded-pill">Iniciar Sesion</button>
                                <br/>
                            </form>
                            <br/>
                            <span className="noacc">¿No tenés una cuenta? </span>
                            <Link className="noacclink" to="/signup">Registrate</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="container d-flex h-100">
            {   cargando.estado === 'cargando'? loading() : 
                cargando.estado === 'notlogged'? bodySignin() : 
                (<Redirect push to="/"/>)
            }
            
	    </div>
    )
}

export default SignIn