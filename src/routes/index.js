import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/login/login';
import Registro from '../components/registro/registro';
import RegistroVehiculo from '../components/registro/registroVehiculo';
import Home from '../components/home/home';
import MenuUsuario from '../components/generalUsuario/menuUsuario';
import MenuConductor from '../components/generalUsuario/menuConductor';
import VerPerfil from '../components/generalUsuario/verPerfil';
import Ranking from '../components/ranking/ranking';

export default ()=>(
    <Router>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/iniciarSesion" exact component={Login}/>
            <Route path="/registro" exact component={Registro}/>
            <Route path="/registroVehiculo" exact component={RegistroVehiculo}/>
            <Route path="/menu" exact component={MenuUsuario}/>
            <Route path="/perfil" exact component={VerPerfil}/>
            <Route path="/ranking" exact component={Ranking}/>
        </Switch>
    </Router>
);

