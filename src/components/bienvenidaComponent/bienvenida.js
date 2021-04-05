import React, {Component} from 'react';
import './bienvenida.css';

export default class Bienvenida extends Component{

    constructor(props) {
         super(props);
         this.iniciarViajeClick = this.iniciarViajeClick.bind(this);
         this.unirmeClick = this.unirmeClick.bind(this);
    }

    iniciarViajeClick = function (event) {
         event.preventDefault();
         window.location = "/iniciarSesion";
    }

    unirmeClick = function (event) {
         event.preventDefault();
         window.location = "/registro";
    }

    render(){
        return (
            <div className="flex-container">
                <div className="row">
                    <div class="imagen-logo">
                        <center>
                            <img alt="logo" src="/img/logo2.PNG" className="img img-responsive col-lg-12"/>
                        </center>
                    </div>
                    <div className="col-sm-8">
                        <p></p>
                        <h2 align="center">¿Quieres ser uno de nuestros transportadores?</h2>
                        <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
                        <p></p>
                        <div class="row">
                           <div class="col-sm-6">
                             <h5 align="left">Se uno de nuestros transportadores y encuentra viajes fácilmente. Tú estableces la tarifa</h5>
                             <p></p>
                             <h3 align="left"> Regístrate para hacer parte de esta familia</h3>
                             <p></p>
                             <button onClick={this.unirmeClick} className="btn btn-outline btn-light col-lg-12">Unirme</button>
                           </div>

                           <div class="col-sm-6">
                              <img alt="logo" src="/img/10.jpg" className="img img-responsive col-lg-12" />
                           </div>
                        </div>
                        <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
                        <h2 align="center">¿Necesitas programar un viaje?</h2>
                        <p></p>
                        <h5 align="center">Registrate y programa tus viajes fácil y rápido, encontrarás ofertas increíbles</h5>
                        <h3 align="center">Además, ¡puedes ver el ranking con los mejores conductores!</h3>
                        <div class="row">
                           <div class="col-sm-6">
                           <button className="btn btn-outline btn-light col-lg-12">Ver ranking</button>
                           </div>
                           <div class="col-sm-6">
                           <button onClick={this.iniciarViajeClick} className="btn btn-outline btn-light col-lg-12">Iniciar viaje</button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}