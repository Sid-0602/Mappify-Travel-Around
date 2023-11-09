import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import axios from 'axios';
import Register from './components/Register';
import Login from './components/Login';
import './app.css';
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

function App() {
  const myStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [rating, setRating] = useState(0);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get('/pins');
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {

    if(!currentUser){
      alert("You must login to add Pins and Share Experience!");
      return;
    }
    const lat = e.lngLat.lat;
    const long = e.lngLat.lng;

    setNewPlace({
      lat: lat,
      long: long,
    });
    setTitle('');
    setDesc('');
    setRating(0);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title: title,
      desc: desc,
      rating: rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post('/pins', newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      alert("Something went wrong!");
      console.log(err);
    }
  };

  const handlelogout = ()=>{
    myStorage.removeItem("user");
    setCurrentUser(null);
    alert("Logged Out Successfully!!");
  }
  return (
    <div>
      <ReactMapGL
        {...viewState}
        mapboxApiAccessToken={TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onDblClick={handleAddClick}
        transitionDuration="300"
      >
        {pins.map((p) => (
          <div key={p._id}>
            <Marker
              longitude={p.long}
              latitude={p.lat}
              offsetLeft={-20}
              offsetTop={-10}
              anchor="bottom"
            >
              <LocationOnIcon
                style={{
                  color: p.username === currentUser ? 'red' : 'slateblue',
                  fontSize: viewState.zoom * 8,
                  cursor: 'pointer',
                }}
                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
              />
            </Marker>

            {p._id === currentPlaceId && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="left"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array.from({ length: Math.floor(p.rating) }, (_, index) => (
                      <StarRateIcon key={index} />
                    ))}
                  </div>
                  <label>Info</label>
                  <span className="username">
                    Created by <b>{p.username}</b>
                  </span>
                </div>
              </Popup>
            )}
          </div>
        ))}

        {newPlace && (
          <Popup
            longitude={newPlace.long}
            latitude={newPlace.lat}
            anchor="left"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="About this Place!"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <label>Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}

        {currentUser ? (
          <button className="button logout" onClick={handlelogout}>Log Out</button>
        ) : (
          <div className="buttons">
            <button
              className="button login"
              onClick={() => setShowLogin(true)}
            >
              Log In
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} myStorage={myStorage} />}
      </ReactMapGL>
    </div>
  );
}

export default App;
