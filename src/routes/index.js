import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/login/login';
import LoginConductor from '../components/login/loginConductor';
import Registro from '../components/registro/registro';
import RegistroConductor from '../components/registro/registroConductor';
import Home from '../components/home/home';
import HomeConductor from '../components/home/homeConductor';
import Inicio from '../components/home/inicio';
import MenuUsuario from '../components/generalUsuario/menuUsuario';
import MenuConductor from '../components/generalUsuario/menuConductor';
import VerPerfil from '../components/generalUsuario/verPerfil';
import VerPerfilConductor from '../components/generalUsuario/verPerfilConductor';
import Ranking from '../components/ranking/ranking';
import Travels from '../components/travels/travels';
import Subasta from '../components/travels/subasta';

export default ()=>(
    <Router>
        <Switch>
            <Route path="/home" exact component = {Home}/>
            <Route path="/homeConductor" exact component = {HomeConductor}/>
            <Route path="/iniciarSesion" exact component={Login}/>
            <Route path="/iniciarSesionConductor" exact component={LoginConductor}/>
            <Route path="/registro" exact component={Registro}/>
            <Route path="/registroConductor" exact component={RegistroConductor}/>
            <Route path="/menu" exact component={MenuUsuario}/>
            <Route path="/menuConductor" exact component={MenuConductor}/>
            <Route path="/perfil" exact component={VerPerfil}/>
            <Route path="/perfilConductor" exact component={VerPerfilConductor}/>
            <Route path="/ranking" exact component={Ranking}/>
            <Route path="/crearViaje" exact component = {Travels}/>
            <Route path="/subastaViaje" exact component = {Subasta}/>
            <Route path="/" exact component = {Inicio}/>
        </Switch>
    </Router>
);

