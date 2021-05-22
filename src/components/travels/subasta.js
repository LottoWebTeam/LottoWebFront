import React, {useState, useEffect} from "react";
import Header from "../header/header";
import fbd from '../../firebase';
import PopUp from '../travels/PopUp';
import RequestService from "../../services/requestService";
import LoginService from "../../services/loginService";

const Subasta = () => {
    const [viajeObjects, setViajeObjects] = useState( {} )
    const [aceptadaObjects, setAceptadaObjects] = useState( {} )
    const [vehiculoObjects, setVehiculoObjects] = useState( {} )
    const [encursoObjects, setEncursoObjects] = useState( {} )
    const [openPopUp, setOpenPopUp] = useState(false);
    var [values, setValues] = useState({precio: 0});
    const [selectedData, setSelectedData] = useState({});
    const [show] = useState(false);
    const [setCurrentId] = useState( '' );
    const [flag, setFlag] = useState(false);
    const [conductor, setConductor] = useState({documento:'732872',nombre:'h'});
    const [placa, setPlaca] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState ('');

    const hanldeClick = (selectedRec) => {
        setSelectedData(selectedRec);
        setOpenPopUp(true);
    };

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

    const addOrEdit = id => {
        const subasta = {
            viajeId: id,
            precio: values.precio,
            conductorId: conductor.documento,
            nombreConductor: conductor.nombre,
            clienteId: viajeObjects[id].clienteId,
            tipoVehiculo: tipoVehiculo,
            placa: placa,
        }

        if(subasta.precio < 1000){
            alert("El valor del viaje debe ser mayor a $1000");
        }
        else if(subasta.tipoVehiculo === ""){
            alert("Selecciona un vehículo");
        }else{
            fbd.child('subasta').push(
                subasta,
                err => {
                    if (err) {
                        console.info(err);
                    }
                }
            )
            setOpenPopUp(false);
        }
    }

    const datosVehiculo = (key) => {
        setPlaca(key.placa);
        setTipoVehiculo(key.tipoVehiculo);
    }

    const actualizarEstado = (key,id) => {
        fbd.child(`viajes/${id}`).update(
        {estado:'En_curso',filtro:key.clienteId+"En_curso",filtro2:key.conductorId+"En_curso"},
        err => {
           if (err){
              console.info(err);
		}}
        )
    }

    const finalizarViaje = (key,id) => {
        fbd.child(`viajes/${id}`).update(
        {estado:'Finalizado',filtro:key.clienteId+"Finalizado",filtro2:key.conductorId+"Finalizado"},
        err => {
           if (err){
              console.info(err);
            }}
        )
    }

    useEffect(() => {
            const abortController = new AbortController();
            const signal = abortController.signal;

            let request = new RequestService();
            request.request(correcto, incorrecto, 'GET', '/conductores/whoami', null, signal);

            function correcto(data) {
                setConductor(data);
            }

            function incorrecto(error) {
                console.error(error);
            }

            var ref = fbd.child("vehiculos");
            ref.orderByChild("conductorId").on('value', snapshot => {
                if (snapshot.val() != null) {
                    setVehiculoObjects({
                    ...snapshot.val()
                })

                } else {
                    setVehiculoObjects({})
                }
            })

            return () => {
                abortController.abort();
            }
        }, [conductor.documento,conductor.nombre])


        useEffect(() => {
            const abortController = new AbortController();
            const signal = abortController.signal;

            let request = new RequestService();
            request.request(correcto, incorrecto, 'GET', '/conductores/whoami', null, signal);

            function correcto(data) {
                setConductor(data);
            }

            function incorrecto(error) {
                console.error(error);
            }

            return () => {
                abortController.abort();
            }
        }, [conductor.documento,conductor.nombre])

    useEffect(() => {
        var ref = fbd.child("viajes");
        ref.orderByChild("estado").equalTo("En_subasta").on('value', snapshot => {
            if (snapshot.val() != null) {
                setViajeObjects({
                    ...snapshot.val()
                })
            } else {
                setViajeObjects({})
            }
        })
    }, []);

    useEffect(() => {
            const abortController = new AbortController();
            const signal = abortController.signal;

            let request = new RequestService();
            request.request(correcto, incorrecto, 'GET', '/conductores/whoami', null, signal);

            function correcto(data) {
                setConductor(data);
            }

            function incorrecto(error) {
                console.error(error);
            }

            var ref = fbd.child("viajes");
            ref.orderByChild("filtro2").equalTo(conductor.documento+"Aceptado_por_usuario").on('value', snapshot => {
                if (snapshot.val() != null) {
                        setAceptadaObjects({
                             ...snapshot.val()
                        })
                } else {
                    setAceptadaObjects({})
                }
            })
    }, [conductor.documento]);

    useEffect(() => {
        const abortController = new AbortController();
            const signal = abortController.signal;

            let request = new RequestService();
            request.request(correcto, incorrecto, 'GET', '/conductores/whoami', null, signal);

            function correcto(data) {
                setConductor(data);
            }

            function incorrecto(error) {
                console.error(error);
            }

            var ref = fbd.child("viajes");
            ref.orderByChild("filtro2").equalTo(conductor.documento+"En_curso").on('value', snapshot => {
            if (snapshot.val() != null) {
                setEncursoObjects({
                 ...snapshot.val()
            })
                } else {
                    setEncursoObjects({})
                }
            })
    }, [conductor.documento]);

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
            <div align="center">
                <br/><h4>1. Revisa todos los viajes disponibles y oferta si estás interesado</h4><br/>
            <div className="col-xs-4 col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre cliente</th>
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
                                    <td>{id}</td>
                                    <td>{viajeObjects[id].clienteNombre}</td>
                                    <td>{viajeObjects[id].latitudPartida},{viajeObjects[id].longitudPartida}</td>
                                    <td>{viajeObjects[id].latitudLlegada},{viajeObjects[id].longitudLlegada}</td>
                                    <td>{viajeObjects[id].tipo}</td>
                                    <td>{viajeObjects[id].descripcion}</td>
                                    <td>
                                        <button className="btn btn-primary btn-block" onClick={() => hanldeClick(id)}>Ofertar</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                {show && <PopUp details={selectedData} />}
                <PopUp openPopUp = {openPopUp} setOpenPopUp={setOpenPopUp}>
                   <div>
                      <center>
                          <div><br/><h4>¿Por cuánto estás dispuesto a realizar este viaje?</h4><br/></div>
                          <input onChange={handleInputChange}  className="form-control" type="number" placeholder="precio del viaje" name="precio" value={values.precio}/>
                            <div><br/><h4>¿Qué vehículo vas a utilizar?</h4><br/></div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Placa</th>
                                        <th scope="col">Tipo</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        Object.keys(vehiculoObjects).map(id => {
                                            return <tr key={id}>
                                                <td>{vehiculoObjects[id].placa}</td>
                                                <td>{vehiculoObjects[id].tipoVehiculo}</td>
                                                <td>
                                                    <input type="checkbox" onChange={() => datosVehiculo(vehiculoObjects[id])}/>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                            <br/>
                          <button className="btn btn-primary btn-block" onClick = {() => {addOrEdit(selectedData)}}>
                              Enviar
                          </button>
                          <button className="btn btn-danger btn-block" onClick={() => setOpenPopUp(false)}>
                              Cancelar
                          </button>
                      </center>
                   </div>
                </PopUp>
            </div>
            </div>
            <div align="center">
                <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
               <div className="col-xs-4 col-md-12">
               <br/><h4>2. Revisa tus ofertas aceptadas e inicia el viaje:</h4>
               <h7>NOTA: Los viajes se deben realizar dentro de las siguientes 24 horas</h7><br/><br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre cliente</th>
                            <th scope="col">Punto de partida</th>
                            <th scope="col">Punto de llegada</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(aceptadaObjects).map(id => {
                                return <tr key={id}>
                                    <td>{id}</td>
                                    <td>{aceptadaObjects[id].clienteNombre}</td>
                                    <td>{aceptadaObjects[id].latitudPartida},{aceptadaObjects[id].longitudPartida}</td>
                                    <td>{aceptadaObjects[id].latitudLlegada},{aceptadaObjects[id].longitudLlegada}</td>
                                    <td>{aceptadaObjects[id].tipo}</td>
                                    <td>{aceptadaObjects[id].descripcion}</td>
                                    <td>{aceptadaObjects[id].precio}</td>
                                    <td>
                                         <button className="btn btn-primary btn-block" onClick = {() => {actualizarEstado(aceptadaObjects[id],id)}}>
                                             Iniciar
                                         </button>
                                    </td>
                            </tr>
                          })
                         }
                    </tbody>
                </table>
                </div>
            </div>
            <div align="center">
            <img alt="logo" src="/img/linea.PNG" className="img img-responsive col-lg-12" />
            <br/><h4>3. Actualiza el estado de tus viajes en curso</h4><br/>
            <div className="col-xs-4 col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Nombre cliente</th>
                            <th scope="col">Punto de partida</th>
                            <th scope="col">Punto de llegada</th>
                            <th scope="col">Tipo</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(encursoObjects).map(id => {
                                return <tr key={id}>
                                    <td>{id}</td>
                                    <td>{encursoObjects[id].clienteNombre}</td>
                                    <td>{encursoObjects[id].latitudPartida},{encursoObjects[id].longitudPartida}</td>
                                    <td>{encursoObjects[id].latitudLlegada},{encursoObjects[id].longitudLlegada}</td>
                                    <td>{encursoObjects[id].tipo}</td>
                                    <td>{encursoObjects[id].descripcion}</td>
                                    <td>{encursoObjects[id].precio}</td>
                                    <td>
                                         <button className="btn btn-primary btn-block" onClick = {() => {finalizarViaje(encursoObjects[id],id)}}>
                                             Finalizar
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