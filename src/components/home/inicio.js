import React, {Component} from 'react';

import Bienvenida from '../bienvenida/bienvenida';
import Header from '../header/header';

import './inicio.css';

export default class inicio extends Component{

constructor(props) {
    super(props);
       this.conductorClick = this.conductorClick.bind(this);
       this.usuarioClick = this.usuarioClick.bind(this);
    }

    conductorClick = function (event) {
         event.preventDefault();
         window.location = "/homeConductor";
    }

    usuarioClick = function (event) {
         event.preventDefault();
         window.location = "/home";
    }

    render(){
        return (
           <div className="flex-container">
               <div className="main-header">
               </div>
               <div className="row">
                   <div class="imagen-logo">
                       <center>
                           <img alt="logo" src="/img/logo2.PNG" className="img img-responsive col-lg-12"/>
                       </center>
                   </div>
                   <div className="col-sm-8">
                       <br/>
                       <h2 align="center">¿CÓMO DESEAS ACCEDER?</h2>
                       <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
                       <div class="row">
                           <div class="col-sm-6">
                              <h5 align="center">Ingresar como usuario</h5>
                              <img alt="logo" src="/img/usuario.png" className="img img-responsive col-lg-12" />
                              <br/><br/>
                              <button onClick={this.usuarioClick} className="btn btn-outline btn-light col-lg-12">Usuario</button>
                           </div>
                           <div class="col-sm-6">
                                <h5 align="center">Ingresar como conductor</h5>
                                <br/>
                                <img alt="logo" src="/img/carro.jpg" className="img img-responsive col-lg-12" />
                                <br/><br/>
                                <button onClick={this.conductorClick} className="btn btn-outline btn-light col-lg-12">Conductor</button>
                           </div>
                       </div>

                   </div>
               </div>


           </div>

        );
    }
}