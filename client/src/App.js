import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import ReactMapGL, {Marker, Popup } from 'react-map-gl';
import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css";



const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {

  const [viewState, setViewState] = React.useState({
    latitude: 18.516726,
    longitude: 73.856255,
    zoom: 7
  });

  const [showPopup, setShowPopup] = useState(true);
  return (
      <ReactMapGL
      {...viewState}
      mapboxApiAccessToken = {TOKEN}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      >
      <Marker longitude={2.294694} latitude={48.858093} anchor="bottom" >
        <div style={{ position: "relative" }}>
          <LocationOnIcon style={{ color: "red", fontSize: viewState.zoom*6 }} />
        </div>
      </Marker>
      {showPopup && (
      <Popup longitude={2.294694} latitude={48.858093}
        anchor="left">
        <div className="card">
          <label>Place</label>
          <h4 className="place">Eiffle Tower</h4>
          <label>Review</label>
          <p className="desc">Beautiful Tower!</p>
          <label>Rating</label>
          <div className="stars">
            <StarRateIcon />
            <StarRateIcon />
            <StarRateIcon />
            <StarRateIcon />
            <StarRateIcon />
          </div>
          <label>Info</label>
          <span className="username">Created by <b>Sid J</b></span>
          <span className="date">1 hour ago!</span>
        </div>
      </Popup>)} 
      </ReactMapGL>

    )
}

export default App;
