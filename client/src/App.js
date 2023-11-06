import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import * as React from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import "./app.css";
import axios from 'axios';

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const currentUser = "Siddhant";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);

  const [viewState, setViewState] = React.useState({
    latitude: 18.516726, // Corrected: Latitude
    longitude: 73.856255, // Corrected: Longitude
    zoom: 7
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long }); // Corrected: Latitude and Longitude
  }

  const handleAddClick = (e) => {
    const lat = e.lngLat.lat;
    const long = e.lngLat.lng;

    setNewPlace({
      lat: lat,
      long: long
    });
    setTitle(""); // Initialize the title
    setDesc(""); // Initialize the description
    setRating(0); // Initialize the rating
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title: title,
      desc: desc,
      rating: rating,
      lat: newPlace.lat,
      long: newPlace.long
    }

    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]); // Add the new pin to the state
      setNewPlace(null);
      console.log(pins)
    } catch (err) {
      console.log(err);
    }
  }

  return (  
    <ReactMapGL
      {...viewState}
      mapboxApiAccessToken={TOKEN}
      onMove={evt => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onDblClick={handleAddClick}
      transitionDuration="300"
    >
      {pins.map(p => (
        <div key={p._id}>
          <Marker longitude={p.long} latitude={p.lat} offsetLeft={-20} offsetTop={-10} anchor="bottom">
            <LocationOnIcon
              style={{ color: "red", fontSize: viewState.zoom * 8, color: p.username === currentUser ? "red" : "slateblue", cursor: "pointer" }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>

          {p._id === currentPlaceId && (
            <Popup longitude={p.long} latitude={p.lat} // Corrected: Longitude and Latitude
              anchor="left" closeButton={true} closeOnClick={false} onClose={() => setCurrentPlaceId(null)}>
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
        </div>
      ))}

      {newPlace && (
        <Popup
          longitude={newPlace.long}
          latitude={newPlace.lat}
          anchor="left" closeButton={true}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}>
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input placeholder="Enter a title" onChange={(e) => setTitle(e.target.value)}></input>
              <label>Review</label>
              <textarea
                placeholder="About this Place!"
                onChange={(e) => setDesc(e.target.value)}>
              </textarea>
              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">Add Pin</button>
            </form>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default App;
