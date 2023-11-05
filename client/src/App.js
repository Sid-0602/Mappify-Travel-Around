import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import Map from 'react-map-gl';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {

  const [viewPort,setViewPort] = useState({
    width:"100vw",
    height:"100vh",
    latitude: 28.6448,
    longitude: 77.216,
    zoom: 4,
  });
  return <div>
    <Map
    
    {...viewPort}
    mapboxAccessToken = {TOKEN}
    onViewportChange = {nextViewport=> setViewPort(nextViewport)}
    mapStyle="mapbox://styles/sid-jadhav/clokzow98007p01o46vlt9vfj"
    />
  </div>
}

export default App;
