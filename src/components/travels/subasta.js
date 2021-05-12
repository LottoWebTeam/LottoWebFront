import React, {useState, useEffect} from "react";
import Header from "../header/header";
import fbd from '../../firebase';

const Subasta = () => {
    const [viajeObjects, setViajeObjects] = useState( {} )
    var [values, setValues] = useState({precio: 0})

    const addOrEdit = id => {
        const subasta = {
            viajeId: id,
            precio: values.precio,
            conductorId: ''
        }
        fbd.child('subasta').push(
            subasta,
            err => {
                if (err) {
                    console.info(err);
                }
            }
        )
    }

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

    const handleInputChange = e => {
        var {name , value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    
    return (
        <div className="flex-container">
            <div className="row">
                <Header/>
            </div>
            <div className="row">
            <div className="col-xs-4 col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Duracion</th>
                            <th scope="col">Especificaciones</th>
                            <th scope="col">Punto de partida</th>
                            <th scope="col">Punto de llegada</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(viajeObjects).map(id => {
                                return <tr key={id}>
                                    <td>{viajeObjects[id].duracion}</td>
                                    <td>{viajeObjects[id].especificaciones}</td>
                                    <td>{viajeObjects[id].puntoPartida}</td>
                                    <td>{viajeObjects[id].puntoLlegada}</td>
                                    <td><input onChange={handleInputChange}  className="form-control" type="number" placeholder="precio del viaje" name="precio" value={values.precio}/></td>
                                    <td>
                                        <button className="btn btn-primary btn-block" onClick={() => {addOrEdit(id)}}>
                                            Editar
                                        </button>
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
 

export default Subasta;