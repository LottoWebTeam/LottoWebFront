import React, {Component} from 'react';
import './bienvenida.css';

export default class Bienvenida extends Component{

    constructor(props) {
         super(props);
         this.iniciarViajeClick = this.iniciarViajeClick.bind(this);
    }

    iniciarViajeClick = function (event) {
         event.preventDefault();
         window.location = "/iniciarSesion";
    }

    verRanking = function (event) {
             event.preventDefault();
             window.location = "/ranking";
    }

    render(){
        return (
            <div className="flex-container">
                <div className="row">
                    <div className="imagen-logo">
                        <center>
                            <img alt="logo" src="/img/logo2.PNG" className="img img-responsive col-lg-12"/>
                        </center>
                    </div>
                    <div className="col-sm-8">
                        <br/><br/>
                        <h1 align="center">¿Necesitas programar un viaje?</h1>
                        <br/>
                        <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
                        <br/><br/>
                        <div className="row">
                        <div className="col-sm-6">
                            <br/><br/>
                            <img alt="logo" src="/img/10.jpg" className="img img-responsive col-lg-12"/>
                            <br/>
                        </div>

                        <div className="col-sm-6">
                            <br/><br/><br/><br/>
                            <h5 align="center">Regístrate y programa tus viajes fácil y rápido, encontrarás ofertas increíbles</h5>
                            <h3 align="center">Además, ¡puedes ver el ranking con los mejores conductores!</h3>
                            <div className="row">
                                   <div className="col-sm-6">
                                   <button onClick={this.iniciarViajeClick} className="btn btn-outline btn-light col-lg-12">Iniciar viaje</button>
                                   <br/><br/><br/><br/><br/>
                                   </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}