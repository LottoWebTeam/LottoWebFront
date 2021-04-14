import React, {useEffect, useState} from "react";
import Header from "../header/header";
import { TOKEN } from '../../constants/index';
import RequestService from "../../services/requestService";

export default function VerPerfil(){
    const [usuarios, setUsuarios] = useState([]);
    const [flag, setFlag] = useState(false);
    const [usuario, setusuario] = useState(null);

    useEffect(() => {
            const abortController = new AbortController();
            const signal = abortController.signal;

            let request = new RequestService();
            request.request(correcto, incorrecto, 'GET', '/clients/cliente/correo'+TOKEN , null, signal);

            function correcto(data) {
                setUsuarios(data);
            }

            function incorrecto(error) {
                console.error(error);
            }

            return () => {
                abortController.abort();
            }
        }, [usuarios])



        return (
            <div className="flex-container">
                <div className="row">
                   <Header/>
                </div>
                <div className="row">
                    <div class="col-xs-6 col-md-4">
                        <center>
                            <br/><br/><br/><br/>
                            <img alt="logo" src="/img/2.jpg" width='300px' height='300px'/>
                        </center>
                    </div>
                    <div class="col-xs-6 col-md-4">
                        <br/><br/><br/><br/><br/>
                        <h4 align={'center'}>Nombre</h4>
                        <br/><br/>
                        <h4 align={'center'}>Cedula</h4>
                        <br/><br/>
                        <h4 align={'center'}>Email</h4>
                        <br/><br/>
                        <h4 align={'center'}>Teléfono</h4>
                    </div>

                    <div class="col-xs-6 col-md-4">
                        {usuarios.map(usuario => (
                            <li key={usuario.id}>
                               <li align={'center'}>{usuario.documento}</li>
                               <li align={'center'}>{usuario.tipoDocumento}</li>
                               <li align={'center'}>{usuario.nombre}</li>
                               <li align={'center'}>{usuario.correo}</li>
                               <li align={'center'}>{usuario.telefono}</li>
                               <li align={'center'}>{usuario.password}</li>
                               <li align={'center'}>{usuario.rutas}</li>
                               <li align={'center'}>{usuario.ofertas}</li>
                               <li align={'center'}>{usuario.viajes}</li>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        )
}