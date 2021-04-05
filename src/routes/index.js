import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/loginComponent/login';
import Registro from '../components/registroComponent/registro';
import RegistroVehiculo from '../components/registroComponent/registroVehiculo';
import Home from '../components/homeComponent/home';
import MenuViaje from '../components/quieroViaje/menuQuieroViaje';
import MenuConductor from '../components/quieroViaje/menuConductor';
import VerPerfil from '../components/quieroViaje/verPerfil';

export default ()=>(
    
    <Router>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/iniciarSesion" exact component={Login}/>
            <Route path="/registro" exact component={Registro}/>
            <Route path="/registroVehiculo" exact component={RegistroVehiculo}/>
            <Route path="/menu" exact component={MenuViaje}/>
            <Route path="/menuConductor" exact component={MenuConductor}/>
            <Route path="/perfil" exact component={VerPerfil}/>
        </Switch>
    </Router>
);

