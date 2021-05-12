import React, {Component} from 'react';
import { TOKEN } from '../../constants/index';
import LoginServiceConductor from '../../services/loginServiceConductor';

import './sectionLogin.css';

export default class SectionLoginConductor extends Component{

    constructor(props){
        super();
        this.state = {
            claseBoton : "",
            botonRegistro: "Registrarse",
            linkRegistroLogout: "/registroConductor"
        }

        this.validacionNoOk = this.validacionNoOk.bind(this);
        this.cerrarSesion = this.cerrarSesion.bind(this);
        this.autenticacionOK = this.autenticacionOK.bind(this);
        this.validacionOK = this.validacionOK.bind(this);


        this.autenticacionOK();
    }

    autenticacionOK = function(e){
        var servicio = new LoginServiceConductor();
        servicio.validate(this.validacionOK,this.validacionNoOk);
    }
    validacionOK = function(){
         this.setState({
            claseBoton : "oculto",
            botonRegistro: "Cerrar Sesión",
            linkRegistroLogout: "/"
        });
        console.log("validacion OK "+this);
    }

    validacionNoOk = function(){
        this.setState({
            claseBoton : "",
            botonRegistro: "Registrarse",
            linkRegistroLogout: "/registroConductor"
        });
        console.log("validacion No OK");
    }

    cerrarSesion = function(event){
        if(this.state.botonRegistro === "Cerrar Sesión"){
            event.preventDefault();
            localStorage.removeItem(TOKEN);
            this.autenticacionOK();
            window.location="/";
        }
    }

    render(){
        return (
            <div className="col-lg-12">
                <center>
                    <div className="btnLogin">
                        <a href="/iniciarSesionConductor">
                            <button className={"btn btn-outline btn-light btn-block "+this.state.claseBoton}>Iniciar Sesión</button>
                        </a>
                    </div>
                    <div className="btnLogin">
                        <a href={this.state.linkRegistroLogout}>
                        <button onClick={this.cerrarSesion} className={"btn btn-outline btn-light btn-block "}>{this.state.botonRegistro}</button>
                        </a>
                    </div>
                </center>
            </div>
        );
    }
}