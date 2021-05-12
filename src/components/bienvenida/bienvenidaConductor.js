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

    verRanking = function (event) {
             event.preventDefault();
             window.location = "/ranking";
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
                        <br/><br/>
                        <h1 align="center">¿Quieres ser uno de nuestros transportadores?</h1>
                        <br/>
                        <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
                        <br/><br/><br/>
                        <div class="row">
                           <div class="col-sm-6">
                             <br/>
                             <h5 align="left">Se uno de nuestros transportadores y encuentra viajes fácilmente. Tú estableces la tarifa</h5>
                             <br/>
                             <h3 align="left"> Regístrate para hacer parte de esta familia</h3>
                             <br/><br/>
                             <button onClick={this.unirmeClick} className="btn btn-outline btn-light col-lg-12">Unirme</button>
                             <br/><br/><br/><br/><br/>
                           </div>
                           <div class="col-sm-6">
                              <img alt="logo" src="/img/10.jpg" className="img img-responsive col-lg-12" />
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}