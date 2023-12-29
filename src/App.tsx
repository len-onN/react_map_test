import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from './Components/LocationMarker';
import './App.css';

function App() {
  const [lockMarker, setLockMarker] = useState(false);
  const toggleLockMarker = () => {
    setLockMarker(!lockMarker);
    // setLockMarker(true); 
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker lockMarker={lockMarker} />
        </MapContainer>
        <button onClick={toggleLockMarker}>
          {lockMarker ? 'Desbloquear Marcador' : 'Bloquear Marcador'}
        </button>
      </div>
    </div>
  );
}

export default App;
