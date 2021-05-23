import React from "react";
import { geolocated } from "react-geolocated";
import Header from "../header/header";
import Map from "./map2";

class Demo extends React.Component {
    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Geolocation is not enabled</div>
        ) : this.props.coords ? (

            <div className="flex-container">
                    <div className="row">
                        <Header/>
                    </div>
                    <div className="row">
                        <div className="col-xs-4 col-md-6">
                            <center>
                                <Map
                                      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZG1saaxMgH3fp2PgHpf5ogz6V2FvC3VQ&v=3.exp&libraries=geometry,drawing,places"
                                      loadingElement={<div style={{ height: `100%` }} />}
                                      containerElement={<div style={{ height: `550px` }} />}
                                      mapElement={<div style={{ height: `100%` }} />}
                                      center={{ lat: this.props.coords.latitude, lng: this.props.coords.longitude }}
                                      zoom={17}
                                      places={[{
                                         lat: this.props.coords.latitude,
                                         lng: this.props.coords.longitude,
                                      }]}
                                    />
                            </center>
                        </div>
                    </div>
                </div>

        ) : (
            <div>Getting the location data&hellip; </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
    },
    watchPosition: false,
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    geolocationProvider: navigator.geolocation,
    isOptimisticGeolocationEnabled: true,
    watchPosition: true
})(Demo);