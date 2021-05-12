import React, {useEffect, useState} from "react";
import LoginServiceConductor from "../../services/loginServiceConductor";
import {TOKEN} from "../../constants";

import './registro.css';

export default function Registro() {

    const [person, setPerson] = useState(null);
    const [charging, setCharging] = useState(false);

    useEffect(() => {
        function verificarAutenticacion() {
            let servicio = new LoginServiceConductor();
            servicio.validate(validacionCorrecta, validacionIncorrecta);
        }

        function validacionCorrecta() {
            console.log('Redireccionando...');
            window.location='/menuConductor';
        }

        function validacionIncorrecta() {
        }

        verificarAutenticacion();
    },[])

    function handle(event) {
        setPerson({...person, [event.target.name]: event.target.value});
    }

    function registrar(event) {
        console.log(person.nombre + " "+ person.password + " " + person.rePassword);

        if(person.password === person.rePassword){
            setCharging(true);
            let servicio = new LoginServiceConductor();
            servicio.registrar(person.correo, person.password, person.nombre, person.cedula, person.telefono, registroCorrecto, registroIncorrecto);
        }else{
            alert("Las contraseñas no son iguales");
        }
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
                        <h3>Registro</h3>
                        <p></p>
                    </center>
                </div>
                <div className="container">
                <div align="center">

                <form onSubmit={registrar}>
                    <div className="form-group">
                        <input type="text" className="form-control"  name={'nombre'} placeholder="Nombre" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name={'cedula'} placeholder="Cedula" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="correo" className="form-control" name={'correo'} placeholder="Correo" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" name={'telefono'} placeholder="Teléfono" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name={'password'} placeholder="Contraseña" onChange={handle} required></input>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name={'rePassword'} placeholder="Confirmar contraseña" onChange={handle} required></input>
                    </div>

                    <p></p>
                    <a href="/iniciarSesionConductor"><h6>¿Ya tienes una cuenta creada?</h6></a>
                    <button type={"submit"} variant={"contained"}>Registrarme</button>
                    </form>
                </div>
                </div>
            </div>
        )
}