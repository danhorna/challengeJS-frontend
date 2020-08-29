import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';



function Home(){
    const [cargando,setCargando] = useState({estado : 'cargando'})

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
                                    estado: 'accept'
                                })
                        } else {
                            if(res.data.done === 'invalid'){
                                if (isMounted)
                                    setCargando({
                                        estado: 'denied'
                                    })
                            }
                        }
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

    function elHome(){
        return(
            <div>
                (<Redirect push to="/me/apps"/>)
            </div>
        )
    }

    return(
        <div>
            {   cargando.estado === 'cargando'? loading() : 
                cargando.estado === 'accept'? elHome() : 
                (<Redirect push to="/signin"/>)
            }
        </div>
    )
}

export default Home