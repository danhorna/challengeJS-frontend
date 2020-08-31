import React, {useState} from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

// agregar caso de si el parametro es null al entrar a /edit
import Navigator from '../components/purpose/Navigator'
function EditApp(props) {
    const [actual, setActual] = useState({
        price: props.location.param1.price,
        logo: props.location.param1.logo,
        salert: false,
        scont: true,
        redirect: false
    })

    const refresh = (e) => {
        const {value, name} = e.target;
        setActual({
            ...actual,
            [name] : value
        });
    }

    const theSubmit = (e) => {
        e.preventDefault();
        const data = {
            price: actual.price,
            logo: actual.logo,
            id: props.location.param1.id
        }
        axios.post('http://localhost:3000/api/apps/updateapp', {data})
            .then(res =>{
                setActual({
                    ...actual,
                    salert: true,
                    scont: false
                })
            })
    }

    const alert = ()=>{
        return (
            <div className="alert alert-success text-center" role="alert">
                <h4>App actualizada</h4>
                <Link className="noacclink" to="/me/apps">Volver</Link>
            </div>
            
        )
    }

    const cont = ()=>{
        return (
            <div className="container d-flex h-100 mt-5">
            <div className="align-self-center w-100">
                <div className="col-lg-4 mx-auto">
                    <div className="card text-center p-4 shadow-lg p-3 mb-5 bg-white rounded">
                    <div className="card-header">Editor de App</div>
                        <div className="card-body">
                            <h5 className="card-title">{props.location.param1.name}</h5>
                            <h6 className="card-subtitle text-muted mt-1">{props.location.param1.category}</h6>
                            <form className="mt-5" onSubmit={theSubmit}>
                                <label htmlFor="price" className="col-form-label">Precio:</label>
                                <input type="number" className="form-control" id="price" name="price" value={actual.price || ''} placeholder="Precio" step="0.01" onChange={refresh}/>
                                <br />
                                <label htmlFor="logo" className="col-form-label">Logo URL:</label>
                                <input type="text" className="form-control" id="logo" name='logo' placeholder="Logo URL" value={actual.logo || ''} onChange={refresh}/>
                                <br />
                                <button type="submit" className="btn btn-info rounded-pill">Actualizar</button>
                                <br />
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
            </div>
        )
    }

    return (
        <div>
            {actual.redirect ? (<Redirect push to="/me/apps"/>) : null}
            <Navigator />
            {actual.scont ? cont() : null}
            {actual.salert ? alert() : null}
            {console.log((props.location.param1))}
        </div>
    )
}

export default EditApp