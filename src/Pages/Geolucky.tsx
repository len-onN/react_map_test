// src/pages/home/index.tsx

// function Geolucky() {
//     return (
//       <h1>Geolucky</h1>
//     )
//   }
  
//   export default Geolucky;

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLng } from 'leaflet';
import LocationMarker from '../Components/LocationMarker';
import api from '../Utils/AxiosApi';
import '../App.css';

function Geolucky() {
  const [lockMarker, setLockMarker] = useState(false);
  const [uId, setUid] = useState<string | null>(null);
  const [position, setPosition] = useState<LatLng | null>(null);
  const [lat, setLat] = useState<number | null>(0);
  const [lng, setLng] = useState<number | null>(0);
  // const isPositionSet = !position ? false : true;

  const toggleLockMarker = () => {
    // setLockMarker(!lockMarker);
    // setLockMarker(true); 
  };
  useEffect(() => {
    async function apiGet() {
      const userId = localStorage.getItem('userId');
      if (typeof userId === 'string') {
        setUid(userId)
        console.log(uId);
      }
      const response = await api.post('http://localhost:3001/point/check', { userId });
      if(response.data) {
        console.log(response.data);
        setLat(response.data.lat);
        setLng(response.data.lng);
        setLockMarker(true);
      } else if (!response.data) {
        console.log('sem um ponto escolhido para o próximo sorteio')
      }
    }
    apiGet();
  }, []);

  const savePoint = async () => {
    try {
      setLockMarker(true);
      const response = await api.post('http://localhost:3001/point', {lat: position?.lat, lng: position?.lng, userId: uId });
      console.log(response);
    } catch (err) { console.log(err); }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <MapContainer center={[lat || 0, lng || 0]} zoom={0.9} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            lockMarker={lockMarker}
            pointLat={lat}
            pointLng={lng}
            position={position}
            setPosition={setPosition}
          />
        </MapContainer>
        <button disabled={ lockMarker } onClick={() => {
          savePoint();
          toggleLockMarker();
          // savePoint();
          }}>
          {lockMarker ? 'Já escolheu' : 'Escolher Lugar'}
        </button>
        <p style={{margin: "0px"}}>Atenção: apenas uma escolha por sorteio</p>
      </div>
    </div>
  );
}

export default Geolucky;
