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

        async function dev(userid) {
            let apps = await axios.get( process.env.REACT_APP_BACK_URL + '/api/users/' + userid + '/apps')
            return apps.data
        }

        async function client(userid){
            let data = []
            let purchases = await axios.get( process.env.REACT_APP_BACK_URL + '/api/users/' + userid + '/purchases')
            if (purchases.length !== 0) {
                for (const item of purchases.data) {
                    let app = await axios.get(process.env.REACT_APP_BACK_URL + '/api/apps/' + item.app_id)
                    app.data[0].purchaseid = item.id
                    data.push(app.data[0])
                }
            }
            return data
        }

        if (!user.loaded) {
            getUser()
                .then(async res => {
                    let apps = null
                    if (res.rol === 'dev'){
                        apps = await dev(res.id)
                    }
                    else {
                        apps = await client(res.id)
                    }
                    setUser({
                        loaded: true,
                        rol: res.rol,
                        id: res.id,
                        appsToShow: apps
                    })
                })
        }
    })

    function cancel(item) {
        axios.delete(process.env.REACT_APP_BACK_URL + '/api/purchases/' + item.purchaseid)
            .then(res => {
                setUser({
                    ...user,
                    loaded: false
                })
            })
    }

    function deleteApp(item) {
        axios.delete(process.env.REACT_APP_BACK_URL + '/api/apps/' + item.id)
            .then(res => {
                setUser({
                    ...user,
                    loaded: false
                })
            })
    }

    function body() {
        if (user.loaded) {
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
                                return <div className="card text-center" key={i}>
                                    <img className="card-img-top mt-3" src={item.logo} alt="logo" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="text-info">Categoria: {item.category}</p>
                                        <p className="card-text">Precio: ${item.price}</p>
                                        <Link className="btn btn-primary" to={goTo}>Editar</Link>
                                        <button type="button" className="btn btn-danger ml-5" onClick={() => deleteApp(item)}>Eliminar</button>
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
                                return <div className="card text-center" key={i}>
                                    <img className="card-img-top mt-3" src={item.logo} alt="logo" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="text-info">Categoria: {item.category}</p>
                                        <p className="card-text">Precio: ${item.price}</p>
                                        <button type="button" className="btn btn-danger" onClick={() => cancel(item)}>Cancelar compra</button>
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