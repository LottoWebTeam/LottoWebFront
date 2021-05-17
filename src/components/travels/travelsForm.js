import React, {useState, useEffect} from "react";
import RequestService from "../../services/requestService";

const TravelsForm = (props) => {
    const [values, setValues] = useState({
        clienteId: 0,
        clienteNombre: 'h',
        latitudPartida: 4.6002316766777955,
        longitudPartida: -74.077247046032,
        latitudLlegada: 4.6002316766777955,
        longitudLlegada: -74.077247046032,
        precio: 0.00,
        estado: 'En_subasta',
        tipo: '',
        descripcion:'',
        conductorId: '',
        conductorNombre: '',
    });

    const [usuario, setUsuario] = useState({documento:'732872',nombre:'h'});

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

               setValues({...values,clienteId:parseInt(usuario.documento),clienteNombre:usuario.nombre});

               return () => {
                  abortController.abort();
               }


            }, [usuario.documento,usuario.nombre])

    useEffect(() => {
        if (props.currentId !== ''){
            setValues({
                ...props.viajeObjects[props.currentId]
            })
        }
    }, [props.currentId, props.viajeObjects]);



    const handleInputChange = e => {
        var {name , value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
        props.setPlaces([
          {
             lat: parseFloat(values.latitudPartida),
             lng: parseFloat(values.longitudPartida),
          },
          {
            lat: parseFloat(values.latitudLlegada),
            lng: parseFloat(values.longitudLlegada),
          }
        ])
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }
    return (

        <form autoComplete='off' onSubmit={handleFormSubmit}>
        {console.log(values)}
            <br/>
            <div className="form-group input-group col-md-12" hidden>
                <input onChange={handleInputChange} className="form-control" type="number" placeholder="cliente cedula" name="clienteId" value={values.clienteId}/>
            </div>
            <div className="form-group input-group col-md-12">
                <h6>Punto origen:</h6>
            </div>
            <div className="form-group input-group col-md-12">
                <input onChange={handleInputChange} className="form-control" type="number" placeholder="Latitud de partida" name="latitudPartida" value={parseFloat(values.latitudPartida)}/>
                <input onChange={handleInputChange} className="form-control" type="number" placeholder="Longitud de partida" name="longitudPartida" value={parseFloat(values.longitudPartida)}/>
            </div>
            <div className="form-group input-group col-md-12">
                <h6>Punto destino:</h6>
            </div>
            <div className="form-group input-group col-md-12">
                 <input onChange={handleInputChange} className="form-control" type="number" placeholder="Latitud de llegada" name="latitudLlegada" value={parseFloat(values.latitudLlegada)}/>
                 <input onChange={handleInputChange} className="form-control" type="number" placeholder="Longitud de llegada" name="longitudLlegada" value={parseFloat(values.longitudLlegada)}/>
            </div>
            <div className="form-group input-group col-md-12" hidden>
                <input onChange={handleInputChange}  className="form-control" type="number" placeholder="precio del viaje" name="precio" value={values.precio}/>
            </div>
            <div className="form-group input-group col-md-12" hidden>
                 <input onChange={handleInputChange}  className="form-control" type="text" placeholder="estado" name="estado" value={values.estado}/>
            </div>
            <div className="form-group input-group col-md-12">
                <select name="tipo" onChange={handleInputChange} value={values.tipo}>
                <option value={""}>-Selecciona una opción-</option>
                <option value={"trasteo"}>Trasteo</option>
                <option value={"acarreo"}>Acarreo</option>
                </select>
            </div>
            <div className="form-group input-group col-md-12">
                <textarea onChange={handleInputChange} className="form-control" name="descripcion" placeholder="Descripción" value={values.especificaciones} rows="3"></textarea>
            </div>
            <div className="form-group input-group col-md-12" hidden>
                <input onChange={handleInputChange} className="form-control" type="text" placeholder="conductorId" name="conductorId" value={values.conductorId}/>
            </div>
            <div className="form-group input-group col-md-12">
                <button type="submit" className="btn btn-primary mb-2">Solicitar viaje</button>
            </div>
        </form>
    );
}

export default TravelsForm;