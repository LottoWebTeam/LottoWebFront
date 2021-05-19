import React, {useState, useEffect} from "react";
import RequestService from "../../services/requestService";
import Header from "../header/header";
import fbd from '../../firebase';

const RegistroVehiculo = (props) => {
    const [values, setValues] = useState({
        conductorId: '',
        conductorNombre: '',
        tipoVehiculo: '',
        placa: '',
    });

    const [conductor, setConductor] = useState({documento:'732872',nombre:'h'});
    const [vehiculoObjects, setVehiculoObjects] = useState( {} )

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

        console.log(vehiculoObjects);
        setValues({...values,conductorId:parseInt(conductor.documento),conductorNombre:conductor.nombre});

        return () => {
            abortController.abort();
        }
    }, [conductor.documento,conductor.nombre])


    const handleInputChange = e => {
        var {name , value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleFormSubmit = e => {
        fbd.child('vehiculos').push(
           values,
           err => {
              if (err) {
                  console.info(err);
              }
           }
        )
    }

    const actualizar = e => {
    if (window.confirm('¿Estás seguro de eliminar este vehículo?')){
            fbd.child(`vehiculos/${e}`).remove(
                err => {
                    if (err){
                        console.info(err);
                   }
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
            <div className="col-xs-6 col-md-6">
                <div align="center">
                <br/><br/>
                <form autoComplete='off' onSubmit={handleFormSubmit}>
                        <br/>
                        <div className="form-group input-group col-md-12" hidden>
                            <input onChange={handleInputChange} className="form-control" type="number" placeholder="conductor cedula" name="clienteId" value={values.conductorId}/>
                        </div>
                        <div className="form-group input-group col-md-12" hidden>
                            <input onChange={handleInputChange} className="form-control" type="text" placeholder="conductor cedula" name="clienteId" value={values.conductorNombre}/>
                        </div>
                        <div className="form-group input-group col-md-12">
                            <input onChange={handleInputChange} className="form-control" type="text" placeholder="Tipo vehículo" name="tipoVehiculo" value={values.tipoVehiculo}/>
                        </div>
                        <div className="form-group input-group col-md-12">
                            <input onChange={handleInputChange} className="form-control" type="text" placeholder="Placa" name="placa" value={values.placa}/>
                        </div>
                        <div className="form-group input-group col-md-12">
                            <button type="submit" className="btn btn-primary mb-2">Registrar</button>
                        </div>
                    </form>
                    </div>
                </div>
            <div className="col-xs-6 col-md-6">
                <div align="center">
                    <br/><br/><br/>
                    <table className="table">
                         <thead>
                            <tr>
                              <th scope="col">Tipo</th>
                              <th scope="col">Placa</th>
                              <th scope="col"></th>
                            </tr>
                         </thead>
                      <tbody>
                      {
                        Object.keys(vehiculoObjects).map(id => {
                          return <tr key={id}>
                             <td>{vehiculoObjects[id].tipoVehiculo}</td>
                             <td>{vehiculoObjects[id].placa}</td>
                             <td>
                                <button className="btn btn-danger btn-block" onClick={() => {actualizar(id)}}>Eliminar</button>
                             </td>
                          </tr>
                        })
                      }
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}

export default RegistroVehiculo;