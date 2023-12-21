import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import './App.css';

function App() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [lockMarker, setLockMarker] = useState(false);

  function LocationMarker() {
    useMapEvents({
      async click(e) {
        if (!lockMarker) {
          setPosition(e.latlng);
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          console.log(data);
          let cityName = `Latitude: ${e.latlng.lat.toFixed(4)}, \n
                          Longitude: ${e.latlng.lng.toFixed(4)}`;
          if (data.address) {
            const addressProperties = [
              { property: 'city', prefix: 'City' },
              { property: 'town', prefix: 'Town' },
              { property: 'village', prefix: 'Village' },
              { property: 'county', prefix: 'County' },
            ];

            addressProperties.forEach(({ property, prefix }) => {
              if (data.address[property]) {
                cityName = `${prefix}: ${data.address[property]}`;
              }
            });
          }
          setLocationName(cityName);
        }
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>{locationName}</Popup>
      </Marker>
    );
  }

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
          <LocationMarker />
        </MapContainer>
        <button onClick={toggleLockMarker}>
          {lockMarker ? 'Desbloquear Marcador' : 'Bloquear Marcador'}
        </button>
      </div>
    </div>
  );
}

export default App;
