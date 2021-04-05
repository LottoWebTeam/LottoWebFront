import React, {Component} from 'react';
import SectionLogin from '../sectionLoginComponent/sectionLogin';
import './header.css';

export default class Header extends Component{

    render(){
        return (
            <React.Fragment>
                <div className="main-header">
                    <SectionLogin/>
                </div>
            </React.Fragment>
        );
    }
}