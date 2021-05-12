import React, {Component} from 'react';
import Header from '../header/header';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

class Map extends Component{
    render(){
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
          <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: 4.7110, lng: -74.0721 }}
          >
            <Marker
              position={{ lat: 4.7110, lng: -74.0721 }}
            />
          </GoogleMap>
        ));

        return (

            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZG1saaxMgH3fp2PgHpf5ogz6V2FvC3VQ&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />

        );
    }
}

export default Map;