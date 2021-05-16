import React, {useState, useEffect} from "react";
import Header from "../header/header";
import TravelsForm from './travelsForm';
import fbd from '../../firebase';

import Map from './crearMapa';

const Travels = () => {

    const [viajeObjects, setViajeObjects] = useState( {} )
    const [currentId, setCurrentId] = useState( '' )

    useEffect(() => {
        fbd.child('viajes').on('value', snapshot => {
            if (snapshot.val() != null) {
                setViajeObjects({
                    ...snapshot.val()
                })
            } else {
                setViajeObjects({})
            }
        })
    }, []);

    const addOrEdit = obj => {
        if (currentId === '') {
            fbd.child('viajes').push(
                obj,
                err => {
                    if (err) {
                        console.info(err);
                    }
                }
            )
        } else {
            fbd.child(`viajes/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.info(err);
                    else
                        setCurrentId('')
                }
            )
        }
    }

    const onDelete = key => {
        if (window.confirm('¿Estas seguro de cancelar este viaje?')){
            fbd.child(`viajes/${key}`).remove(
                err => {
                    if (err)
                        console.info(err);
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
    <div className="flex-container">
        <div className="row">
            <Header/>
        </div>
        <div className="row">
            <div className="col-xs-4 col-md-6">
                <center>
                    <Map/>
                </center>
            </div>
            <div className="col-xs-4 col-md-6">
                <TravelsForm {...({addOrEdit,currentId,viajeObjects})}></TravelsForm>
            </div>
        </div>
        <div>
            <center>
                <br/>
                <h2>Tu viaje es:</h2>
                <br/>
            </center>
        </div>
        <div className="row">
            <div className="col-xs-4 col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Punto de partida</th>
                            <th scope="col">Punto de llegada</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Descripción</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(viajeObjects).map(id => {
                                return <tr key={id}>
                                    <td>{viajeObjects[id].latitudPartida},{viajeObjects[id].longitudPartida}</td>
                                    <td>{viajeObjects[id].latitudLlegada},{viajeObjects[id].longitudLlegada}</td>
                                    <td>{viajeObjects[id].tipo}</td>
                                    <td>{viajeObjects[id].descripcion}</td>
                                    <td>
                                      <button className="btn btn-danger btn-block" onClick={() => {onDelete(id)}}>Cancelar viaje</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div>
           <center>
              <br/>
              <h2>Las ofertas para tu viaje son:</h2>
              <br/>
           </center>
        </div>
        <div className="row">
           <div className="col-xs-4 col-md-12">
              <table className="table">
                 <thead>
                    <tr>
                      <th scope="col">Conductor</th>
                      <th scope="col">Tipo vehículo</th>
                      <th scope="col">Placa</th>
                      <th scope="col">Precio</th>
                      <th scope="col"></th>
                    </tr>
                 </thead>
              <tbody>
              {
                Object.keys(viajeObjects).map(id => {
                  return <tr key={id}>
                     <td>{viajeObjects[id].latitudPartida},{viajeObjects[id].longitudPartida}</td>
                     <td>{viajeObjects[id].latitudLlegada},{viajeObjects[id].longitudLlegada}</td>
                     <td>{viajeObjects[id].tipo}</td>
                     <td>{viajeObjects[id].descripcion}</td>
                     <td>
                       <button className="btn btn-primary btn-block" onClick={() => {onDelete(id)}}>Aceptar</button>
                     </td>
                  </tr>
                })
              }
              </tbody>
           </table>
        </div>
      </div>
    </div>
    );
}

export default Travels;