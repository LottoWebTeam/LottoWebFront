import React, {useEffect, useState} from "react";
import Header from "../header/header";
import { TOKEN } from '../../constants/index';
import RequestService from "../../services/requestService";

export default function VerRanking(){
    const [conductores, setConductores] = useState([]);
    const [flag, setFlag] = useState(false);
    const [conductor, setConductor] = useState(null);

    return (
                <div className="flex-container">
                    <div className="row">
                       <Header/>
                    </div>

                    <div>
                            <table class="table table-hover">
                              <center>
                              <thead>
                                <tr>
                                  <th scope="col">Nombre</th>
                                  <th scope="col">Correo</th>
                                  <th scope="col">Teléfono</th>
                                  <th scope="col">Calificación</th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr>
                                  <th scope="row">Brayan Buitrago</th>
                                  <td>brayan@hotmail.com</td>
                                  <td>3128859663</td>
                                  <td>5</td>
                                </tr>
                              </tbody>
                              </center>
                            </table>


                    </div>
                </div>
            )
    }