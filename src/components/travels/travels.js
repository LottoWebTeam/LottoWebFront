import React, {useState, useEffect} from "react";
import Header from "../header/header";
import TravelsForm from './travelsForm';
import fbd from '../../firebase';
import RequestService from "../../services/requestService";
import PopUp from '../travels/PopUp';
import LoginService from "../../services/loginService";


import Map from "./map";

const Travels = () => {

    const [viajeObjects, setViajeObjects] = useState( {} )
    const [subastaObjects, setSubastaObjects] = useState( {} )
    const [encursoObjects, setEncursoObjects] = useState( {} )
    const [openPopUp, setOpenPopUp] = useState(false);
    const [selectedData] = useState({});
    const [currentId, setCurrentId] = useState( '' );


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

    useEffect(() => {
        verificarAutenticacion();

        function verificarAutenticacion(){
            let servicio = new LoginService();
            servicio.validate(validacionCorrecta, validacionIncorrecta);
        }

        function validacionCorrecta(){

        }
        function validacionIncorrecta() {
            console.log("redireccionando...");
            window.location = '/';
        }
    }, [])

    const [usuario, setUsuario] = useState({documento:'8984'});
    const [show] = useState(false);

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
                 ref.orderByChild("filtro").equalTo(parseInt(usuario.documento)+"En_subasta").on('value', snapshot => {

                     if (snapshot.val() != null) {
                             setViajeObjects({
                             ...snapshot.val()
                            })
                     } else {
                         setViajeObjects({})
                     }
            })

            var ref4 = fbd.child("viajes");
                 ref4.orderByChild("filtro").equalTo(usuario.documento+"En_curso").on('value', snapshot => {
                     if (snapshot.val() != null) {
                             setEncursoObjects({
                             ...snapshot.val()
                            })
                     } else {
                         setEncursoObjects({})
                     }
            })


            return () => {
                abortController.abort();
            }

        }, [usuario.documento])

    const ofertas = obj => {

        setOpenPopUp(true);
        console.log(obj)
        fbd.child("subasta").orderByChild("viajeId").equalTo(obj).on('value', snapshot => {

           if (snapshot.val() != null) {
               setSubastaObjects({
                ...snapshot.val()
           })
           } else {
               setSubastaObjects({})
           }
        })
    }

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
        {estado:'Aceptado_por_usuario', precio:key.precio,conductorId:key.conductorId,conductorNombre:key.nombreConductor,tipoVehiculo:key.tipoVehiculo,placa:key.placa,filtro:key.clienteId+"Aceptado_por_usuario",filtro2:key.conductorId+"Aceptado_por_usuario"},
        err => {
           if (err)
              console.info(err);
           else
              setCurrentId('')
           }
        )
        setOpenPopUp(false);
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
        <div className="row">
            <Header/>
        </div>
        <div className="row">
            <div className="col-xs-4 col-md-6">
                <center>
                    <Map
                          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZG1saaxMgH3fp2PgHpf5ogz6V2FvC3VQ&v=3.exp&libraries=geometry,drawing,places"
                          loadingElement={<div style={{ height: `100%` }} />}
                          containerElement={<div style={{ height: `550px` }} />}
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
                <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
                <h4>2. Revisa las ofertas para tus viajes y acepta la mejor:</h4>
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
                                      <button className="btn btn-primary btn-block" onClick={() => ofertas(id)}>Ver ofertas</button>
                                    </td>
                                    <td>
                                      <button className="btn btn-danger btn-block" onClick={() => {onDelete(id)}}>Cancelar viaje</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                {show && <PopUp details={selectedData} />}
                </table>
                <PopUp openPopUp = {openPopUp} setOpenPopUp={setOpenPopUp}>
                    <div align="center">
                        <br/><h4>Ofertas para este viaje</h4><br/>
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
                             </td>
                          </tr>
                        })
                      }
                      </tbody>
                   </table>
                </div>
              </div>
              <div align="center">
                       <button className="btn btn-danger btn-block" onClick={() => setOpenPopUp(false)}>
                            Cerrar
                       </button>
               </div>
              </PopUp>
            </div>
        </div>

      <div>
        <center>
           <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
           <br/><h4>3. Verifica el estado de tus viajes en curso:</h4><br/>
        </center>
      </div>
      <div className="row">
           <div className="col-xs-4 col-md-12">
              <table className="table">
                 <thead>
                    <tr>
                      <th scope="col">Código</th>
                      <th scope="col">Punto origen</th>
                      <th scope="col">Punto destino</th>
                      <th scope="col">Conductor</th>
                      <th scope="col">Tipo vehículo</th>
                      <th scope="col">Placa</th>
                      <th scope="col">Precio</th>
                    </tr>
                 </thead>
              <tbody>
              {
                Object.keys(encursoObjects).map(id => {
                  return <tr key={id}>
                     <td>{id}</td>
                     <td>{encursoObjects[id].latitudPartida},{encursoObjects[id].longitudPartida}</td>
                     <td>{encursoObjects[id].latitudLlegada},{encursoObjects[id].latitudLlegada}</td>
                     <td>{encursoObjects[id].conductorNombre}</td>
                     <td>{encursoObjects[id].tipoVehiculo}</td>
                     <td>{encursoObjects[id].placa}</td>
                     <td>{encursoObjects[id].precio}</td>
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