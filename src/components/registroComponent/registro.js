import React, {Component} from 'react';

import LoginService from '../../services/loginService';

import Logo from '../logoComponent/logo';

export default class Registro extends Component{

    constructor(){
        super();
        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);
        this.verificarAutenticacion();
    }

    //Verificar login

    verificarAutenticacion = function(e){
        var servicio = new LoginService();
        servicio.validate(this.validacionCorrecta,this.validacionIncorrecta);
    }

    validacionCorrecta = function(){
        // this.setClaseBoton("oculto");
        console.log("redireccionando...");
        window.location="/";
        
    }

    validacionIncorrecta = function(){
        // this.setClaseBoton("");
        
    }

    //Fin verificar login

    render(){
        return (
            <div className="container">
                <div className="">
                    <Logo/>
                </div>
                <div className="">
                    <center>
                        <h3>Registro</h3>
                        <p></p>
                    </center>
                </div>
                <div align="center">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Nombre"></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Cedula"></input>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email"></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Teléfono"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Contraseña"></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Confirmar contraseña"></input>
                    </div>
                    <a href="/iniciarSesion"><h6>¿Ya tienes una cuenta creada?</h6></a>
                    <button className="btn btn-light">Registrarme como usuario</button>
                    <button className="btn btn-light">Registrarme como conductor</button>
                </div>
            </div>
        );
    }
}