import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Navigator from '../components/purpose/Navigator';
import {checkLogin} from '../js/helpers';
import Loading from './purpose/Loading';

function MeApps() {
    const [acceso, setAcceso] = useState({
        estado: 'esperando',
        aprobado : null,
        rol: '',
        id: '',
    });

    const [render, setRender] = useState({
        estado: 'wait',
        appsToShow: null,

    })

    useEffect(() => {
        let isMounted = true;
        function comp (){
            checkLogin()
                .then(res =>{
                    if (isMounted)
                        setAcceso({
                            rol: res.rol,
                            id: res.id,
                            estado: 'listo',
                            aprobado : res.done
                        })
                })
        }

        function devapps() {
            axios.post('http://localhost:3000/api/apps/getdevapps', acceso)
                .then(res => {
                    setRender({
                        estado: 'go',
                        appsToShow: res.data
                    })
                })
        }

        if (acceso.estado !== 'listo') {
            comp();
        }

        function appsCompradas(){
            var forTheBoys = [];
            axios.post('http://localhost:3000/api/purchases', acceso)
                .then( async (res) => {
                    if (res.data !== null){
                        for (const item of res.data){
                            var prod = await axios.post('http://localhost:3000/api/apps/getbyid',item)
                            prod.data.idcompra = item.id;
                            forTheBoys.push(prod.data)
                        }
                    }
                    setRender({
                        estado: 'go',
                        appsToShow: forTheBoys
                    })
                    
                })
        }

        if ((acceso.estado === 'listo') && (render.estado !== 'go')) {
            if (acceso.rol === 'dev') {
                devapps()
            } else {
                appsCompradas()
            }
        }

        return () => { isMounted = false };
    })

    function elMe() {
        if (render.estado === 'go') {
            if (acceso.rol === 'dev') {
                return (
                    <div>
                        <Navigator seccion= "Mis apps"/>
                        <div className="m-5">
                            <Link className="btn btn-outline-secondary" to="/me/new">Nueva aplicacion</Link>
                        </div>
                        <div className="card-columns m-5">{
                            render.appsToShow.map(function (item, i) {
                                var goTo ={
                                    pathname: '/me/edit/',
                                    param1: item
                                }
                                var del ={
                                    pathname: '/me/delete',
                                    param1: item
                                }
                                return <div className="card text-center" key={i}>
                                    <img className="card-img-top mt-3" src={item.logo} alt="logo" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="text-info">Categoria: {item.category}</p>
                                        <p className="card-text">Precio: ${item.price}</p>
                                        <Link className="btn btn-primary" to={goTo}>Editar</Link>
                                        <Link className="btn btn-danger ml-5" to={del}>Eliminar</Link>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Navigator seccion= "Mis compras"/>
                        <div className="card-columns m-5">
                            {
                            render.appsToShow.map(function (item, i) {
                                var del ={
                                    pathname: '/me/cancel',
                                    param1: item
                                }
                                return <div className="card text-center" key={i}>
                                    <img className="card-img-top mt-3" src={item.logo} alt="logo" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="text-info">Categoria: {item.category}</p>
                                        <p className="card-text">Precio: ${item.price}</p>
                                        <Link className="btn btn-danger" to={del}>Cancelar compra</Link>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                )
            }
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }

    return (
        <div>
            {
                acceso.estado === 'esperando' ? <Loading/> :
                acceso.aprobado ? elMe() :
                <Redirect push to="/signin" />

            }
        </div>
    )
}

export default MeApps