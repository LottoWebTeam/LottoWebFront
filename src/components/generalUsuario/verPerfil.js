import React, {useEffect, useState} from "react";
import Header from "../header/header";
import { TOKEN } from '../../constants/index';
import RequestService from "../../services/requestService";

import './verPerfil.css';

export default function VerPerfil(){
    const [usuarios, setUsuarios] = useState([]);
    const [flag, setFlag] = useState(false);
    const [usuario, setUsuario] = useState({nombre:'', cedula:'', email: '', telefono:''});

    useEffect(() => {
            const abortController = new AbortController();
            const signal = abortController.signal;

            let request = new RequestService();
            request.request(correcto, incorrecto, 'GET', '/clients/whoami', null, signal);

            function correcto(data) {
                setUsuario(data);
            }

            function incorrecto(error) {
                console.error(error);
            }

            return () => {
                abortController.abort();
            }
        }, [])



        return (
            <div className="flex-container">
            {console.log(usuario)}
                <div className="row">
                   <Header/>
                </div>
                <div className="row">
                    <div className="col-xs-6 col-md-4">
                        <center>
                            <br/><br/><br/><br/>
                            <img alt="logo" src="/img/2.jpg" width='300px' height='300px'/>
                        </center>
                    </div>

                    <div className="col-xs-6 col-md-4">
                        <br/><br/><br/><br/><br/>
                        <h4 align={'center'}>Nombre</h4>
                        <br/><br/>
                        <h4 align={'center'}>Cédula</h4>
                        <br/><br/>
                        <h4 align={'center'}>Email</h4>
                        <br/><br/>
                        <h4 align={'center'}>Teléfono</h4>
                    </div>

                    <div className="col-xs-6 col-md-4" align={'center'}>
                        <br/><br/><br/><br/><br/>
                        <titulo>{usuario.nombre}</titulo>
                        <br/><br/><br/>
                        <titulo>{usuario.documento}</titulo>
                        <br/><br/><br/>
                        <titulo>{usuario.correo}</titulo>
                        <br/><br/><br/>
                        <titulo>{usuario.telefono}</titulo>
                    </div>
                </div>
            </div>
        )
}