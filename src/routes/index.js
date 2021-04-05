import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/loginComponent/login';
import Registro from '../components/registroComponent/registro';
import Home from '../components/homeComponent/home';
import MenuViaje from '../components/quieroViaje/menuQuieroViaje';
import MenuConductor from '../components/quieroViaje/menuConductor';

export default ()=>(
    
    <Router>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/iniciarSesion" exact component={Login}/>
            <Route path="/registro" exact component={Registro}/>
            <Route path="/menu" exact component={MenuViaje}/>
            <Route path="/menuConductor" exact component={MenuConductor}/>
        </Switch>
    </Router>
);

