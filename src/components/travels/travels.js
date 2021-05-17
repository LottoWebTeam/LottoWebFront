import React, {useState, useEffect} from "react";
import Header from "../header/header";
import TravelsForm from './travelsForm';
import fbd from '../../firebase';
import RequestService from "../../services/requestService";


import Map from "./map";

const Travels = () => {

    const [viajeObjects, setViajeObjects] = useState( {} )
    const [subastaObjects, setSubastaObjects] = useState( {} )
    const [currentId, setCurrentId] = useState( '' )

    const [places,setPlaces] = useState([
      {
        lat: 0,
        lng: 0,
      },
      {
        lat: 0,
        lng: 0,
      }
    ]);

    const [usuario, setUsuario] = useState({documento:'8984'});

    useEffect(() => {
            const abortController = new AbortController();
            const signal = abortController.signal;

            let request = new RequestService();
            request.request(correcto, incorrecto, 'GET', '/clients/whoami', null, signal);

            function correcto(data) {
                setUsuario(data);
            }

            function incorrecto(error) {
               console.error(error);
            }

            var ref = fbd.child("viajes");
                 ref.orderByChild("clienteId").equalTo(parseInt(usuario.documento)).on('value', snapshot => {
                    var temp = snapshot.val();

                     if (snapshot.val() != null) {
                        if (temp.estado = "En_subasta"){
                             setViajeObjects({
                             ...snapshot.val()
                            })
                        }
                     } else {
                         setViajeObjects({})
                     }
                 })

            var ref2 = fbd.child("subasta");
                 ref2.orderByChild("clienteId").equalTo(parseInt(usuario.documento)).on('value', snapshot => {
                     if (snapshot.val() != null) {
                          setSubastaObjects({
                          ...snapshot.val()
                     })
                     } else {
                         setSubastaObjects({})
                     }
                 })

            return () => {
                abortController.abort();
            }

        }, [usuario.documento])


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

    const actualizar = key => {
        fbd.child(`viajes/${key.viajeId}`).update(
        {estado:'Aceptado_por_usuario', precio:key.precio,conductorId:key.conductorId,conductorNombre:key.nombreConductor},
        err => {
           if (err)
              console.info(err);
           else
              setCurrentId('')
           }
        )
    }

    const onDelete = key => {
        if (window.confirm('¿Estás seguro de cancelar este viaje?')){
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
    {console.log(usuario.documento)}
    {console.log(usuario.nombre)}
        <div className="row">
            <Header/>
        </div>
        <div className="row">
            <div className="col-xs-4 col-md-6">
                <center>
                    <Map
                          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZG1saaxMgH3fp2PgHpf5ogz6V2FvC3VQ&v=3.exp&libraries=geometry,drawing,places"
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `400px` }} />}
                          mapElement={<div style={{ height: `100%` }} />}
                          center={{ lat: 4.674248433971412, lng: -74.10649427198778 }}
                          zoom={11}
                          places={places}
                        />
                </center>
            </div>
            <div className="col-xs-4 col-md-6">
                <TravelsForm {...({addOrEdit,currentId,viajeObjects,setPlaces})}></TravelsForm>
            </div>
        </div>
        <div>
            <center>
                <br/>
                <h2>Tus viajes pendientes por subastar son:</h2>
                <br/>
            </center>
        </div>
        <div className="row">
            <div className="col-xs-4 col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Punto de partida</th>
                            <th scope="col">Punto de llegada</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Estado</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(viajeObjects).map(id => {
                                return <tr key={id}>
                                    <td>{id}</td>
                                    <td>{parseFloat(viajeObjects[id].latitudPartida)},{parseFloat(viajeObjects[id].longitudPartida)}</td>
                                    <td>{parseFloat(viajeObjects[id].latitudLlegada)},{parseFloat(viajeObjects[id].longitudLlegada)}</td>
                                    <td>{viajeObjects[id].tipo}</td>
                                    <td>{viajeObjects[id].descripcion}</td>
                                    <td>{viajeObjects[id].estado}</td>
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
              <h2>Las ofertas para tus viajes son:</h2>
              <br/>
           </center>
        </div>
        <div className="row">
           <div className="col-xs-4 col-md-12">
              <table className="table">
                 <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Conductor</th>
                      <th scope="col">Tipo vehículo</th>
                      <th scope="col">Placa</th>
                      <th scope="col">Precio</th>
                      <th scope="col"></th>
                    </tr>
                 </thead>
              <tbody>
              {
                Object.keys(subastaObjects).map(id => {
                  return <tr key={id}>
                     <td>{subastaObjects[id].viajeId}</td>
                     <td>{subastaObjects[id].nombreConductor}</td>
                     <td>{subastaObjects[id].tipoVehiculo}</td>
                     <td>{subastaObjects[id].placa}</td>
                     <td>{subastaObjects[id].precio}</td>
                     <td>
                       <button className="btn btn-primary btn-block" onClick={() => {actualizar(subastaObjects[id])}}>Aceptar</button>
                       {console.log(subastaObjects[id])}
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
           <br/><h2>Tus viajes en curso:</h2><br/>
        </center>
      </div>
    </div>
    );
}

export default Travels;