import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Navigator from '../components/purpose/Navigator';
import { comprobarLogin } from '../js/helpers';
import Loading from './purpose/Loading';
import NoAprobado from './purpose/NoAprobado';

function SeeApps() {
    const [acceso, setAcceso] = useState({
        estado: 'esperando',
        aprobado: null,
        rol: '',
        id: '',
        apps: [],
        appscargadas: false,
        postCompra: false,
        idComprados: [],
        cargado: false
    });

    useEffect(() => {
        let isMounted = true;

        function comp() {
            comprobarLogin()
                .then(res => {
                    if (isMounted)
                        if (res !== null)
                            setAcceso({
                                ...acceso,
                                rol: res.rol,
                                id: res.id,
                                estado: 'listo',
                                aprobado: res.done
                            })
                        else {
                            setAcceso({
                                ...acceso,
                                estado: 'listo',
                                aprobado: false
                            })
                        }
                })
        }

        async function cargar() {
            const appsToShow = await axios.get('http://localhost:3000/api/apps');
            if (isMounted)
                setAcceso({
                    ...acceso,
                    appscargadas: true,
                    apps: appsToShow.data
                })
        }

        function appsCompradas() {
            var appCom = [];
            axios.post('http://localhost:3000/api/purchases', acceso)
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

        if (acceso.estado !== 'listo') {
            comp();
        }
        else {
            if (!acceso.appscargadas) {
                cargar()
            }
            else {
                if (!acceso.cargado) {
                    appsCompradas();
                }
            }
        }
        return () => { isMounted = false };
    })


    async function comprar(item) {
        const data = {
            appId: item.id,
            userId: acceso.id
        }
        axios.post('http://localhost:3000/api/buy', data)
            .then(req => {
                setAcceso({
                    ...acceso,
                    postCompra: true
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
                acceso.postCompra ? (<Redirect push to="/me/apps" />) :
                    acceso.estado === 'esperando' ? <Loading /> :
                        acceso.aprobado ? elMe() :
                            <NoAprobado />
            }
        </div>
    )
}

export default SeeApps