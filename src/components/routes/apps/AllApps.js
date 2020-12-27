import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navigator from '../../purpose/Navigator';
import { getUser } from '../../../js/helpers';
import Loading from '../../purpose/Loading';

function SeeApps() {
    const [acceso, setAcceso] = useState({
        loaded: false,
        aprobado: null,
        rol: '',
        id: '',
        apps: [],
        appscargadas: false,
        idComprados: [],
        cargado: false
    });

    useEffect(() => {
        if (!acceso.loaded) {
            getUser()
                .then(async res => {
                    setAcceso({
                        ...acceso,
                        loaded: true,
                        rol: res.rol,
                        id: res.id,
                    })
                })
        }
        let isMounted = true;

        async function cargar() {
            const appsToShow = await axios.get(process.env.REACT_APP_BACK_URL + '/api/apps');
            if (isMounted)
                setAcceso({
                    ...acceso,
                    appscargadas: true,
                    apps: appsToShow.data
                })
        }

        function appsCompradas() {
            var appCom = [];
            axios.get(process.env.REACT_APP_BACK_URL + '/api/users/' + acceso.id + '/purchases')
                .then(res => {
                    if (res.data !== null) {
                        res.data.forEach(element => {
                            appCom.push(element.app_id)
                        });
                    }
                    if (isMounted)
                        setAcceso({
                            ...acceso,
                            idComprados: appCom,
                            cargado: true
                        })
                })
        }

        if (!acceso.appscargadas) {
            cargar()
        }
        else {
            if (!acceso.cargado) {
                appsCompradas();
            }
        }
        
        return () => { isMounted = false };
    })


    function comprar(item) {
        const data = {
            appId: item.id,
            userId: acceso.id
        }
        axios.post(process.env.REACT_APP_BACK_URL + '/api/purchases', data)
            .then(req => {
                setAcceso({
                    ...acceso,
                    cargado: false
                })
            })
    }

    function renderButtonNo() {
        return (
            <button type="button" className="btn btn-secondary" disabled>Comprado</button>

        )
    }

    function renderButtonSi(item) {
        return (
            <button type="button" className="btn btn-warning" onClick={() => comprar(item)}>Comprar</button>
        )
    }

    function elMe() {
        var tipo;
        if (acceso.rol === 'dev') tipo = "Mis apps"
        else tipo = "Mis compras"
        return (
            <div>
                <Navigator seccion={tipo} />
                <div className="card-columns m-5">{
                    acceso.apps.map(function (item, i) {
                        return <div className="card text-center" key={i}>
                            <img className="card-img-top mt-3" src={item.logo} alt="logo" />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="text-info">Categoria: {item.category}</p>
                                <p className="card-text">Precio: ${item.price}</p>
                                {
                                    acceso.idComprados.includes(item.id) ? renderButtonNo() :
                                        renderButtonSi(item)
                                }
                            </div>
                        </div>
                    })}
                </div>
            </div>
        )
    }

    return (
        <div>
            {
                !acceso.loaded? <Loading /> : elMe()
            }
        </div>
    )
}

export default SeeApps