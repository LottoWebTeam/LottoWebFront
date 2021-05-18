import React, {useState, useEffect} from "react";
import Header from "../header/header";
import fbd from '../../firebase';
import PopUp from '../travels/PopUp';

const Subasta = () => {
    const [viajeObjects, setViajeObjects] = useState( {} )
    const [aceptadaObjects, setAceptadaObjects] = useState( {} )
    const [encursoObjects, setEncursoObjects] = useState( {} )
    const [openPopUp, setOpenPopUp] = useState(false);
    var [values, setValues] = useState({precio: 0});
    const [selectedData, setSelectedData] = useState({});
    const [show, setShow] = useState(false);
    const [currentId, setCurrentId] = useState( '' )

    const hanldeClick = (selectedRec) => {
        setSelectedData(selectedRec);
        setOpenPopUp(true);
    };

    const addOrEdit = id => {
        const subasta = {
            viajeId: id,
            precio: values.precio,
            conductorId: '894985',
            nombreConductor: 'pepito',
            clienteId: viajeObjects[id].clienteId,
            tipoVehiculo:'Camioneta',
            placa:'HGY456'
        }
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

    const actualizarEstado = (key,id) => {
        fbd.child(`viajes/${id}`).update(
        {estado:'En_curso',filtro:key.clienteId+"En_curso",filtro2:key.conductorId+"En_curso"},
        err => {
           if (err)
              console.info(err);
           else
              setCurrentId('')
           }
        )
    }

    const finalizarViaje = (key,id) => {
        fbd.child(`viajes/${id}`).update(
        {estado:'Finalizado',filtro:key.clienteId+"Finalizado",filtro2:key.conductorId+"Finalizado"},
        err => {
           if (err)
              console.info(err);
           else
              setCurrentId('')
           }
        )
    }

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
            var ref = fbd.child("viajes");
            ref.orderByChild("filtro2").equalTo("894985"+"Aceptado_por_usuario").on('value', snapshot => {
                if (snapshot.val() != null) {
                        setAceptadaObjects({
                             ...snapshot.val()
                        })
                } else {
                    setAceptadaObjects({})
                }
            })
    }, []);

    useEffect(() => {
            var ref = fbd.child("viajes");
            ref.orderByChild("filtro2").equalTo("894985"+"En_curso").on('value', snapshot => {
            if (snapshot.val() != null) {
                setEncursoObjects({
                 ...snapshot.val()
            })
                } else {
                    setEncursoObjects({})
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
            <div align="center">
                <br/><h2>Todos los viajes disponibles</h2><br/>
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
                {console.log(selectedData)}
                <PopUp openPopUp = {openPopUp} setOpenPopUp={setOpenPopUp}>
                   <div>
                      <center>
                          <div><h2>¿Por cuánto estás dispuesto a realizar este viaje?</h2></div>
                          <input onChange={handleInputChange}  className="form-control" type="number" placeholder="precio del viaje" name="precio" value={values.precio}/>
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
               <br/><h2>Tus ofertas aceptadas</h2><br/>
               {console.log(aceptadaObjects)}
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
                                         {console.log(aceptadaObjects[id])}
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
            <br/><h2>Tus viajes en curso</h2><br/>
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
                                         {console.log(id)}
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