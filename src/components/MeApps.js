import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Navigator from '../components/Navigator';

function MeApps() {
    const [cargando, setCargando] = useState({
        estado: 'cargando',
        rol: '',
        id: '',
    })
    const [render, setRender] = useState({
        estado: 'wait',
        appsToShow: null
    })

    useEffect(() => {
        let isMounted = true;
        function checkUser() {
            var tokenls = localStorage.getItem("loginToken");
            if (tokenls != null) {
                axios.post('http://localhost:3000/api/users/check', { tokenls })
                    .then(res => {
                        if (res.data.done === 'accept') {
                            if (isMounted)
                                setCargando({
                                    estado: res.data.done,
                                    rol: res.data.rol,
                                    id: res.data.id
                                })
                        } else {
                            if (res.data.done === 'invalid') {
                                if (isMounted)
                                    setCargando({
                                        estado: 'denied'
                                    })
                            }
                        }
                    })
            }
        }
        function devapps() {
            axios.post('http://localhost:3000/api/apps/getdevapps', cargando)
                .then(res => {
                    console.log('entro')
                    setRender({
                        estado: 'go',
                        appsToShow: res.data
                    })
                })
        }

        if (cargando.estado !== 'accept') {
            checkUser();
        }
        console.log(cargando.estado)
        if ((cargando.estado === 'accept') && (render.estado !== 'go')) {
            console.log('www')
            if (cargando.rol === 'dev') {
                devapps()
            }
        }

        return () => { isMounted = false };
    })

    function loading() {
        return (
            <div>
                cargando
            </div>
        )
    }

    function delApp(id,name){
        console.log(id)
        var apptodel = window.confirm("Realmente desea eliminar la aplicacion " + name + " ?");
        if (apptodel === true){
            axios.post('http://localhost:3000/api/apps/deleteapp', {id})
                .then(res => {
                    console.log(res)
                })
        }
    }

    function elMe() {
        if (render.estado === 'go') {
            return (
                <div>
                    <Navigator/>
                    <div className="card-columns m-5">{
                        render.appsToShow.map(function (item, i) {
                            var goTo ={
                                pathname: '/me/edit/',
                                param1: item
                            }
                            return <div className="card text-center" key={i}>
                                <img className="card-img-top mt-3" src={item.logo} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Precio: {item.price}</p>
                                    <Link className="btn btn-primary" to={goTo}>Editar</Link>
                                    <button className="btn btn-danger ml-5" onClick={(e)=>delApp(item.id,item.name)}>Eliminar</button>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    return (
        <div>
            {cargando.estado === 'cargando' ? loading() :
                cargando.estado === 'accept' ? elMe() :
                    (<Redirect push to="/signin" />)

            }
        </div>
    )
}

export default MeApps