import React, {Component} from 'react';

import BienvenidaConductor from '../bienvenida/bienvenidaConductor';
import HeaderConductor from '../header/headerConductor';

export default class HomeConductor extends Component{


    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <HeaderConductor/>
                </div>
                <div className="row">
                    <BienvenidaConductor/>
                </div>
            </div>
        );
    }
}