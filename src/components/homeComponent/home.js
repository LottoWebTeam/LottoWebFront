import React, {Component} from 'react';

import Bienvenida from '../bienvenidaComponent/bienvenida';
import Header from '../headerComponent/header';

export default class Home extends Component{


    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <Header/>
                </div>
                <div className="row">
                    <Bienvenida
                    />
                </div>
            </div>
        );
    }
}