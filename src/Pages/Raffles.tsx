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
import MapDoneRaffles from '../Components/MapDoneRaffles';

type point = {
    lat: number,
    lng: number,
    id: number,
    userId: number,
}

type raffle = {
    winnerPointId: number,
    drawnLat: number,
    drawnLng: number,
    id: number,
    competingPoints: point[],
}

function Raffles() {
    const [raffles, setRaffles] = useState<raffle[] | []>([]);
    useEffect(() => {
        async function getRaffles(){
            const response = await api.get('http://localhost:3001/raffle');
            // console.log(response.data);
            setRaffles(response.data)
        };
        getRaffles();
    }, []);
    return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      { raffles && raffles.map((raffle: raffle) => {
        return (
          <div key={raffle.id} >
              <MapDoneRaffles raffle={raffle}/>
          </div>
        )
      })}
    </div>
  );
}

export default Raffles;
