import React, {useState, useEffect} from "react";
import Header from "../header/header";
import TravelsForm from './travelsForm';
import fbd from '../../firebase';

import Map from './map';

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
        if (window.confirm('¿Estas seguro de eliminar este viaje?')){
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
                    <Map></Map>
                </center>
            </div>
            <div className="col-xs-4 col-md-6">
                <TravelsForm {...({addOrEdit,currentId,viajeObjects})}></TravelsForm>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-4 col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Duracion</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Especificaciones</th>
                            <th scope="col">Punto de partida</th>
                            <th scope="col">Punto de llegada</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(viajeObjects).map(id => {
                                return <tr key={id}>
                                    <td>{viajeObjects[id].duracion}</td>
                                    <td>{viajeObjects[id].precio}</td>
                                    <td>{viajeObjects[id].especificaciones}</td>
                                    <td>{viajeObjects[id].puntoPartida}</td>
                                    <td>{viajeObjects[id].puntoLlegada}</td>
                                    <td>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <button className="btn btn-primary btn-block" onClick={() => {setCurrentId(id)}}>
                                                    Editar
                                                </button>
                                            </div>
                                            <div className="col-md-6">
                                                <button className="btn btn-danger btn-block" onClick={() => {onDelete(id)}}>
                                                    Borrar
                                                </button>
                                            </div>
                                        </div>
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