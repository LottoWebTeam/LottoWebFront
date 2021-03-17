import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../components/loginComponent/login';
import Registro from '../components/registroComponent/registro';
import Home from '../components/homeComponent/home';

export default ()=>(
    
    <Router>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/iniciarSesion" exact component={Login}/>
            <Route path="/registro" exact component={Registro}/>
        </Switch>
    </Router>
);

