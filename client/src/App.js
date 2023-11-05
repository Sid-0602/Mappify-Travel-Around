import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
import ReactMapGL, {Marker, Popup } from 'react-map-gl';
import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css";
import axios from 'axios';



const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {

  const currentUser = "john";
  const[pins,setPins] = useState([]);
  const[currentPlaceId, setCurrentPlaceId] = useState(null);

  const [viewState, setViewState] = React.useState({
    latitude: 18.516726,
    longitude: 73.856255,
    zoom: 7
  });

  const [showPopup, setShowPopup] = useState(true);

  useEffect(()=>{
    const getPins = async()=>{
      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getPins()
  }, []);

  const handleMarkerClick=(id)=>{
    setCurrentPlaceId(id);
  }
  return (
      <ReactMapGL  
      {...viewState}
      mapboxApiAccessToken = {TOKEN}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      >

      {pins.map(p=>(
      <>
        <Marker longitude={p.lat} latitude={p.long} offsetLeft={-20} offsetTop={-10} anchor="bottom" >
            <LocationOnIcon 
              style={{ color: "red", fontSize: viewState.zoom*8, color: p.username===currentUser ? "red" : "slateblue",cursor:"pointer" }} 
              onClick={()=>handleMarkerClick(p._id)}
            />
        </Marker>
        
        {p._id === currentPlaceId && (
          <Popup longitude={p.lat} latitude={p.long}
          anchor="left" closeButton={true} closeOnClick={false} onClose={()=>setCurrentPlaceId(null)}> 
          <div className="card">
            <label>Place</label>
            <h4 className="place">{p.title}</h4>
            <label>Review</label>
            <p className="desc">{p.desc}</p>
            <label>Rating</label>
            <div className="stars">
              <StarRateIcon />
              <StarRateIcon />
              <StarRateIcon />
              <StarRateIcon />
              <StarRateIcon />
            </div>
            <label>Info</label>
            <span className="username">Created by <b>{p.username}</b></span>
          </div>
        </Popup>
      )}
      </>
      ))}
      
      </ReactMapGL>

    )
}

export default App;
