import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navigator from '../../purpose/Navigator';
import { getUser } from '../../../js/helpers';
import Loading from '../../purpose/Loading';

function Apps() {
    const [user, setUser] = useState({
        loaded: false,
        rol: '',
        id: '',
        appsToShow: null
    });

    useEffect(() => {

        async function dev() {
            return await axios.get( process.env.REACT_APP_BACK_URL + '/api/users/' + user.id + '/apps')
        }

        async function client(){
            return await await axios.get( process.env.REACT_APP_BACK_URL + '/api/users/' + user.id + '/purchases')
                // .then( async (res) => {
                //     if (res.data !== null){
                //         for (const item of res.data){
                //             var prod = await axios.post('http://localhost:3000/api/apps/getbyid',item)
                //             prod.data.idcompra = item.id;
                //             forTheBoys.push(prod.data)
                //         }
                //     }
                //     setRender({
                //         estado: 'go',
                //         appsToShow: forTheBoys
                //     })
                    
                // })
        }

        if (!user.loaded) {
            getUser()
                .then(async res => {
                    let apps = null
                    if (res.rol === 'dev'){
                        apps = await dev()
                    }
                    else {
                        apps = await client()
                    }
                    setUser({
                        loaded: true,
                        rol: res.rol,
                        id: res.id,
                        appsToShow: apps.data
                    })
                })
        }
    })

    function body() {
        if (user.loaded === true) {
            if (user.rol === 'dev') {
                return (
                    <div>
                        <Navigator seccion= "Mis apps"/>
                        <div className="m-5">
                            <Link className="btn btn-outline-secondary" to="/me/new">Nueva aplicacion</Link>
                        </div>
                        <div className="card-columns m-5">{
                            user.appsToShow.map(function (item, i) {
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
                            user.appsToShow.map(function (item, i) {
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
                <Loading />
            )
        }
    }

    return (
        <React.Fragment>
            {
                body() 
            }
        </React.Fragment>
    )
}

export default Apps