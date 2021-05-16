import React, {useState, useEffect} from "react";
import RequestService from "../../services/requestService";

const TravelsForm = (props) => {
    const initialFields = {
        clienteId: '',
        latitudPartida: 4.674248433971412,
        longitudPartida: -74.10649427198778,
        latitudLlegada: 4.674248433971412,
        longitudLlegada: -74.10649427198778,
        precio: 0.00,
        estado: 'En_subasta',
        tipo: '',
        descripcion:'',
        conductorId: '',
    }

    var [values, setValues] = useState(initialFields)

    useEffect(() => {
        if (props.currentId === '')
            setValues({
                ...initialFields
            })
        else
            setValues({
                ...props.viajeObjects[props.currentId]
            })
    }, [props.currentId, props.viajeObjects]);

    const handleInputChange = e => {
        var {name , value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }
    return (

        <form autoComplete='off' onSubmit={handleFormSubmit}>
            <br/>
            <div className="form-group input-group col-md-12" hidden>
                <input onChange={handleInputChange} className="form-control" type="number" placeholder="cliente cedula" name="clienteId" value={values.clienteId}/>
            </div>
            <div className="form-group input-group col-md-12">
                <input onChange={handleInputChange} className="form-control" type="number" placeholder="Latitud de partida" name="latitudPartida" value={values.latitudPartida}/>
                <input onChange={handleInputChange} className="form-control" type="text" placeholder="Longitud de partida" name="longitudPartida" value={values.longitudPartida}/>
            </div>
            <div className="form-group input-group col-md-12">
                 <input onChange={handleInputChange} className="form-control" type="number" placeholder="Latitud de llegada" name="latitudLlegada" value={values.latitudLlegada}/>
                 <input onChange={handleInputChange} className="form-control" type="number" placeholder="Longitud de llegada" name="longitudLlegada" value={values.longitudLlegada}/>
            </div>
            <div className="form-group input-group col-md-12" hidden>
                <input onChange={handleInputChange}  className="form-control" type="number" placeholder="precio del viaje" name="precio" value={values.precio}/>
            </div>
            <div className="form-group input-group col-md-12" hidden>
                 <input onChange={handleInputChange}  className="form-control" type="text" placeholder="estado" name="estado" value={values.estado}/>
            </div>
            <div className="form-group input-group col-md-12">
                <select name="tipo" onChange={handleInputChange} value={values.tipo}>
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