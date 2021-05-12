import React, {useState, useEffect} from "react";

const TravelsForm = (props) => {
    const initialFields = {
        duracion: '',
        precio: 0.00,
        especificaciones:'',
        puntoPartida: '',
        puntoLlegada: '',
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
            <div className="form-group input-group col-md-12">
                <input onChange={handleInputChange} className="form-control" type="number" placeholder="Duracion del viaje (en horas)" name="duracion" value={values.duracion}/>
            </div>
            <div className="form-group input-group col-md-12" hidden>
                <input onChange={handleInputChange}  className="form-control" type="number" placeholder="precio del viaje" name="precio" value={values.precio}/>
            </div>
            <div className="form-group input-group col-md-12">
                <textarea onChange={handleInputChange} className="form-control" name="especificaciones" placeholder="Especificaciones del envio" value={values.especificaciones} rows="3"></textarea>
            </div>
            <div className="form-group input-group col-md-12">
                <input onChange={handleInputChange} className="form-control" type="text" placeholder="Punto de partida" name="puntoPartida" value={values.puntoPartida}/>
            </div>
            <div className="form-group input-group col-md-12">
                <input onChange={handleInputChange} className="form-control" type="text" placeholder="Punto de llegada" name="puntoLlegada" value={values.puntoLlegada}/>
            </div>
            <div className="form-group input-group col-md-12" hidden>
                <input onChange={handleInputChange} className="form-control" type="text" placeholder="Punto de llegada" name="conductorId" value={values.conductorId}/>
            </div>
            <div className="form-group input-group col-md-12">
                <button type="submit" className="btn btn-primary mb-2">Solicitar viaje</button>
            </div>
        </form>
    );
}
 
export default TravelsForm;