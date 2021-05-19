import React, {Component} from 'react';
import Header from "../header/header";

export default class MenuConductor extends Component {

    constructor(props) {
       super(props);
       this.verPerfil = this.verPerfil.bind(this);
    }


    verPerfil= function (event) {
      event.preventDefault();
      window.location = "/perfilConductor";
    }

    verOfertas = function (event){
      event.preventDefault();
      window.location = "/subastaViaje";
    }

    verVehiculo= function (event) {
       event.preventDefault();
       window.location = "/vehiculos";
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
                            <button className="btn btn-outline btn-light col-lg-8" onClick={this.verPerfil}>Perfil</button>
                        </center>
                    </div>
              </div>
              <div className="col-xs-6 col-md-4">
                    <div>
                        <center>
                            <br/><br/><br/><br/>
                            <img alt="logo" src="/img/4.jpg" width='340px' height='300px'/>
                            <br/><br/>
                            <button className="btn btn-outline btn-light col-lg-8" onClick={this.verOfertas}>Viajes</button>
                        </center>
                    </div>
              </div>
              <div className="col-xs-6 col-md-4">
                    <div>
                        <center>
                            <br/><br/><br/><br/>
                            <img alt="logo" src="/img/11.jpg" width='300px' height='300px'/>
                            <br/><br/>
                            <button className="btn btn-outline btn-light col-lg-8" onClick={this.verVehiculo}>Mis vehículos</button>
                        </center>
                    </div>
              </div>
            </div>
        </div>
        );
        }
    }