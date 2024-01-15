import React, { useState, useEffect } from 'react';
import api from '../Utils/AxiosApi';
import '../App.css';
import MapDoneRaffles from '../Components/MapDoneRaffles';
import MarkerReference from '../Components/MarkerReference';

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
    drawnStart: Date,
    drawnEnd: Date,
}

function Raffles() {
    const [raffles, setRaffles] = useState<raffle[] | []>([]);
    useEffect(() => {
        async function getRaffles(){
            const response = await api.get('http://localhost:3001/raffle');
            console.log(response.data);
            setRaffles(response.data)
        };
        getRaffles();
    }, []);
    return (
      <div style={{display: 'flex'}}>
        <MarkerReference />
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
