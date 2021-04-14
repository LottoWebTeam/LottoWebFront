import React, {useEffect} from 'react';
import Header from "../header/header";
import LoginService from "../../services/loginService";

export default function MenuConductor() {

    return (
        <div className="flex-container">
            <div className="row">
               <Header/>
            </div>
            <div class="row">
                <div class="col-xs-6 col-md-4">
                    <div>
                        <center>
                            <br/><br/><br/><br/>
                            <img alt="logo" src="/img/2.jpg" width='300px' height='300px'/>
                            <br/><br/>
                            <button className="btn btn-outline btn-light col-lg-8">Ver perfil</button>
                        </center>
                    </div>
              </div>
              <div class="col-xs-6 col-md-4">
                    <div>
                        <center>
                            <br/><br/><br/><br/>
                            <img alt="logo" src="/img/4.jpg" width='340px' height='300px'/>
                            <br/><br/>
                            <button className="btn btn-outline btn-light col-lg-8">Ver viajes disponibles</button>
                        </center>
                    </div>
              </div>
              <div class="col-xs-6 col-md-4">
                    <div>
                        <center>
                            <br/><br/><br/><br/>
                            <img alt="logo" src="/img/3.png" width='300px' height='300px'/>
                            <br/><br/>
                            <button className="btn btn-outline btn-light col-lg-8">Ver ranking</button>
                        </center>
                    </div>
              </div>
            </div>
        </div>
    );
}