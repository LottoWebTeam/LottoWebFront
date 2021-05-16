import React from "react";
import ReactDOM from "react-dom";
import Map from "./map";

const places = [
  {
    name: "Origen",
    title: "Origen",
    lat: 4.752475,
    lng: -74.086443,
    id: 1
  },
  {
    name: "Destino",
    title: "Destino",
    lat: 4.677674,
    lng: -74.102749,
    id: 2
  }
];

const App = () => {
  return (
    <Map
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZG1saaxMgH3fp2PgHpf5ogz6V2FvC3VQ&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      center={{ lat: 4.674248433971412, lng: -74.10649427198778 }}
      zoom={11}
      places={places}
    />
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;