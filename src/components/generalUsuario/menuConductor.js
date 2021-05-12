import React, {Component} from 'react';
import Header from "../header/header";
import LoginService from "../../services/loginService";

export default class MenuConductor extends Component {
    constructor(props) {
       super(props);
       this.verPerfil = this.verPerfil.bind(this);
    }

    verPerfil= function (event) {
      event.preventDefault();
      window.location = "/perfilConductor";
    }

    verVehiculo= function (event) {
       event.preventDefault();
       window.location = "/registroVehiculo";
    }

    render() {
        return(
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
                            <button className="btn btn-outline btn-light col-lg-8">Ver viajes disponibles</button>
                        </center>
                    </div>
              </div>
              <div className="col-xs-6 col-md-4">
                    <div>
                        <center>
                            <br/><br/><br/><br/>
                            <img alt="logo" src="/img/11.jpg" width='300px' height='300px'/>
                            <br/><br/>
                            <button className="btn btn-outline btn-light col-lg-8" onClick={this.verVehiculo}>Registrar o actualizar vehículo</button>
                        </center>
                    </div>
              </div>
            </div>
        </div>
        );
        }
    }