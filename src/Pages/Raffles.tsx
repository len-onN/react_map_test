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
      <div style={{display: 'flex'}}>
      <div style={{position: 'fixed', left: '5vh'}}>
        <p>Ponto sorteado:</p>
        <div style={{ width: '5vh', height: '5vh', backgroundColor: 'rgb(155, 40, 0)' }} />
        <p>Ponto vencedor:</p>
        <div style={{ width: '5vh', height: '5vh', backgroundColor: 'rgb(44, 120, 55)' }}/>
        <p>Pontos competidos:</p>
        <div style={{ width: '5vh', height: '5vh', backgroundColor: 'rgb(150, 210, 120)' }}/>
      </div>
    <div style={{ display: 'block', position: 'relative', left: '50vh' }}>
      { raffles && raffles.map((raffle: raffle) => {
        return (
          <div key={raffle.id} style={{ display: 'flex', flexDirection: "row"}} >
              <MapDoneRaffles raffle={raffle}/>
          </div>
        )
      })}
    </div>
    </div>
  );
}

export default Raffles;
