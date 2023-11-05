import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import ReactMapGL from 'react-map-gl';
import * as React from 'react';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {

  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 12
  });
  return (
      <ReactMapGL
      {...viewState}
      mapboxApiAccessToken = {TOKEN}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      />

    )
}

export default App;
