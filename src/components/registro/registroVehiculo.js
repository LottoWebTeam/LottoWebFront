import React, {useEffect, useState} from "react";
import LoginService from "../../services/loginService";
import {TOKEN} from "../../constants";

import './registro.css';

export default function RegistroVehiculo() {

    const [person, setPerson] = useState(null);
    const [charging, setCharging] = useState(false);

    useEffect(() => {
        function verificarAutenticacion() {
            let servicio = new LoginService();
            servicio.validate(validacionCorrecta, validacionIncorrecta);
        }

        function validacionCorrecta() {
            console.log('Redireccionando...');
            window.location='/';
        }

        function validacionIncorrecta() {
        }

        verificarAutenticacion();
    },[])

    function handle(event) {
        setPerson({...person, [event.target.name]: event.target.value});
    }

    function registrar(event) {
        let servicio = new LoginService();
        servicio.registrar(person.marca, person.tipo, person.modelo, person.color, person.placa, registroCorrecto, registroIncorrecto);
    }

    function registroCorrecto(token) {
        localStorage.setItem(TOKEN, token);
        setCharging(false);
    }

    function registroIncorrecto() {
        setCharging(false);
        alert("No se pudo realizar el registro. Inténtelo más tarde");
    }


        return (
            <div className="">
                <div className="contenido">
                </div>
                <div className="">
                    <center>
                        <p></p>
                        <h3>Registro vehículo</h3>
                        <p></p>
                    </center>
                </div>
                <div className="container">
                <div align="center">

                <form onSubmit={registrar}>
                    <div className="form-group">
                        <input type="text" className="form-control"  name={'marca'} placeholder="Marca" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name={'tipo'} placeholder="Tipo" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" name={'modelo'} placeholder="Modelo" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name={'color'} placeholder="Color" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name={'placa'} placeholder="Placa" onChange={handle} required></input>
                    </div>

                    <button type={"submit"} variant={"contained"}>Registrar vehículo</button>

                    </form>
                </div>
                </div>
            </div>
        )
}