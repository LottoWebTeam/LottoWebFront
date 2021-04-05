import React, {useEffect, useState} from "react";
import LoginService from "../../services/loginService";
import Logo from "../logoComponent/logo";
import ModalCargando from "../modalCargandoComponent/modalCargando";
import {ACCESS_TOKEN} from "../../constants";

export default function Registro() {

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
            // this.setClaseBoton("");
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
            let servicio = new LoginService();
            servicio.registrar(person.nombre, person.cedula, person.email, person.telefono, registroCorrecto, registroIncorrecto);
        }else{
            alert("Las contraseñas no son iguales");
        }
    }

    function registroCorrecto(token) {
        localStorage.setItem(ACCESS_TOKEN, token);
        setCharging(false);
    }

    function registroIncorrecto() {
        setCharging(false);
        alert("No se pudo realizar el registro. Inténtelo más tarde");
    }

        return (
            <div className="">
                <div className="flex-container">
                    <Logo/>
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
                        <input type="email" className="form-control" name={'email'} placeholder="Email" onChange={handle} required></input>
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
                    <a href="/iniciarSesion"><h6>¿Ya tienes una cuenta creada?</h6></a>
                    <button type={"submit"} variant={"contained"}>Registrarme como usuario</button>
                    <button className="btn btn-light">Registrarme como conductor</button>
                    </form>
                </div>
                </div>
            </div>
        )
}