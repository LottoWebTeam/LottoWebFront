import React, {Component} from 'react';
import Header from "../header/header";
import LoginService from "../../services/loginService";

export default class MenuViaje extends Component{
    constructor(props) {
         super(props);
         this.verPerfil = this.verPerfil.bind(this);
         this.iniciarViaje = this.iniciarViaje.bind(this);
    }

    verPerfil= function (event) {
         event.preventDefault();
         window.location = "/perfil";
    }

    iniciarViaje= function (event) {
         event.preventDefault();
         window.location = "/crearViaje";
    }

    verRanking= function (event) {
         event.preventDefault();
         window.location = "/ranking";
    }

    render(){
        return (
            <div className="flex-container">
                <div className="row">
                   <Header/>
                </div>
                <div className="row">
                    <div className="col-xs-6 col-md-4">
                        <div>
                            <center>
                                <br/><br/><br/><br/>
                                <img alt="logo" src="/img/2.jpg" width='300px' height='300px'/>
                                <br/><br/>
                                <button className="btn btn-outline btn-light col-lg-8" onClick={this.verPerfil}>Ver perfil</button>
                            </center>
                        </div>
                  </div>
                  <div className="col-xs-6 col-md-4">
                        <div>
                            <center>
                                <br/><br/><br/><br/>
                                <img alt="logo" src="/img/4.jpg" width='340px' height='300px'/>
                                <br/><br/>
                                <button className="btn btn-outline btn-light col-lg-8" onClick={this.iniciarViaje}>Iniciar un nuevo viaje</button>
                            </center>
                        </div>
                  </div>
                  <div className="col-xs-6 col-md-4">
                        <div>
                            <center>
                                <br/><br/><br/><br/>
                                <img alt="logo" src="/img/3.png" width='300px' height='300px'/>
                                <br/><br/>
                                <button className="btn btn-outline btn-light col-lg-8" onClick={this.verRanking}>Ver ranking de conductores</button>
                            </center>
                        </div>
                  </div>
                </div>
            </div>
        );
    }
}