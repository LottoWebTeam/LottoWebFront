import React, {Component} from 'react';
import { TOKEN } from '../../constants/index';
import LoginServiceConductor from '../../services/loginServiceConductor';

import './login.css';

export default class LoginConductor extends Component{

    constructor(){
        super();
        this.state = {
            correo: "",
            password: "",
            cargando: false,
            sesionIniciada : false
        };
        this.hadleChange = this.hadleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cerrarModal = this.cerrarModal.bind(this);
        this.validarAutenticacion = this.validarAutenticacion.bind(this);
        this.loginOk = this.loginOk.bind(this);
        this.loginNoOk = this.loginNoOk.bind(this);

        this.validarAutenticacion();

    }

    validarAutenticacion = function(e){
        var servicio = new LoginServiceConductor();
        servicio.validate(this.loginOk,this.loginNoOk);
    }

    loginOk = function(){
        console.log("redireccionando...");
        this.window.location="/menuConductor";
    }

    loginNoOk = function(){
    }

    cerrarModal = function(){
        this.setState({
            correo: this.state.correo,
            password: this.state.password,
            cargando: false,
            sesionIniciada: this.state.sesionIniciada
        });
    }

    hadleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    iniciarSesion(){
        this.setState({
            correo: this.state.correo,
            password: this.state.password,
            sesionIniciada: true
        });
    }

    handleSubmit = (event) => {
        this.setState({
            correo: this.state.correo,
            password: this.state.password,
            sesionIniciada: this.state.sesionIniciada
        });
        event.preventDefault();

        var miInit = new Headers({
            method: 'POST'
        });

        var terminado = this.cerrarModal;

        var loginAceptado = function(token){
            localStorage.setItem( TOKEN, token);
            terminado();
            window.location="/menuConductor";
        }

        var loginRechazado = function(){
            terminado();
            alert("login no aceptado");
        }
        new LoginServiceConductor().login(this.state.correo,this.state.password, loginAceptado, loginRechazado, miInit);
    }

    render(){
        return (
            <React.Fragment>
                <div className="">
                    <form onSubmit={this.handleSubmit}>
                        <div className="contenido">
                        </div>
                        <div className="">
                            <center>
                                <p></p>
                                <h3>¡Bienvenido!</h3>
                                <p></p>
                            </center>
                        </div>
                        <div className="container" align="center">
                            <div className="form-group">
                                <h6>Correo:</h6>
                                <input name="correo" required onChange={this.hadleChange} type="email" className="form-control" placeholder="ejemplo@mail.com"></input>
                            </div>
                            <div className="form-group">
                                <h6>Contraseña:</h6>
                                <input name="password" required onChange={this.hadleChange} type="password" className="form-control" placeholder="********"></input>
                            </div>
                            <a href="/registroConductor"><h6 align="center">¿Aún no tienes una cuenta?</h6></a>
                            <p></p>
                            <button className="form-group" type={"submit"}>Iniciar sesión</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}