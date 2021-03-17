import React, {Component} from 'react';
import { ACCESS_TOKEN } from '../../constants/index';

import Logo from '../logoComponent/logo';
import ModalCargando from '../modalCargandoComponent/modalCargando';
import LoginService from '../../services/loginService';



import './login.css';

export default class Login extends Component{

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
        this.verificarAutenticacion = this.verificarAutenticacion.bind(this);
        this.validacionCorrecta = this.validacionCorrecta.bind(this);
        this.validacionIncorrecta = this.validacionIncorrecta.bind(this);

        this.verificarAutenticacion();
        
    }

    //Verificar login

    verificarAutenticacion = function(e){
        var servicio = new LoginService();
        servicio.validate(this.validacionCorrecta,this.validacionIncorrecta);
    }

    validacionCorrecta = function(){
        console.log("redireccionando...");
        window.location="/";
        
    }

    validacionIncorrecta = function(){
        // this.setClaseBoton("");
        
    }

    //Fin verificar login

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
            cargando: this.state.cargando,
            sesionIniciada: true
        });
    }

    handleSubmit = (event) => {
        // console.log(event.target);
        this.setState({
            correo: this.state.correo,
            password: this.state.password,
            cargando: true,
            sesionIniciada: this.state.sesionIniciada
        });
        event.preventDefault();

        var miInit = new Headers({
            method: 'POST'
        });

        var terminado = this.cerrarModal;

        var loginAceptado = function(token){
            localStorage.setItem(ACCESS_TOKEN, token);
            terminado();
            window.location="/";
        
        }

        var loginRechazado = function(){
            terminado();
            alert("login no aceptado");
        }

        new LoginService().login(this.state.correo,this.state.password, loginAceptado, loginRechazado, miInit);

        
    }

    render(){
        return (
            <React.Fragment>
                <ModalCargando
                modalIsOpen={this.state.cargando}
                />
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="">
                            <Logo/>
                        </div>
                        <div className="">
                            <center>
                                <h3>¡Bienvenido!</h3>
                                <p></p>
                            </center>
                        </div>
                        <div className="" align="center">
                            <div className="form-group">
                                <h6>Correo:</h6>
                                <input name="correo" required onChange={this.hadleChange} type="email" className="form-control" placeholder="ejemplo@mail.com"></input>
                            </div>
                            <div className="form-group">
                                <h6>Contraseña:</h6>
                                <input name="password" required onChange={this.hadleChange} type="password" className="form-control" placeholder="********"></input>
                            </div>
                            <a href="/registro"><h6 align="center">¿Aún no tienes una cuenta?</h6></a>
                            <p></p>
                            <button className="form-group">Iniciar sesión</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
            
        );
    }
}