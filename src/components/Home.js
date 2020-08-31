import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { comprobarLogin } from '../js/helpers';
import Loading from './purpose/Loading'
import NoAprobado from './purpose/NoAprobado'

function Home() {
    const [acceso, setAcceso] = useState({
        estado: 'esperando',
        aprobado: null
    });

    useEffect(() => {
        let isMounted = true;
        function comp() {
            comprobarLogin()
                .then(res => {
                    if (isMounted)
                        if (res !== null)
                            setAcceso({
                                estado: 'listo',
                                aprobado: res.done
                            })
                        else {
                            setAcceso({
                                estado: 'listo',
                                aprobado: false
                            })
                        }
                })
        }
        comp()
        return () => { isMounted = false };
    })

    function elHome() {
        return (
            <div>
                (<Redirect push to="/me/apps" />)
            </div>
        )
    }

    return (
        <div>
            {
                acceso.estado === 'esperando' ? <Loading /> :
                    acceso.aprobado ? elHome() :
                        <NoAprobado />
            }
        </div>
    )
}

export default Home