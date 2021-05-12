import React, {Component} from 'react';
import SectionLoginConductor from '../loginHeader/sectionLoginConductor';
import './header.css';

export default class Header extends Component{

    render(){
        return (
            <React.Fragment>
                <div className="main-header">
                    <SectionLoginConductor/>
                </div>
            </React.Fragment>
        );
    }
}