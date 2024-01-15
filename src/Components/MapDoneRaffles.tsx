import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLng, LatLngBoundsExpression } from 'leaflet';
import LocationMarker from '../Components/LocationMarker';
import api from '../Utils/AxiosApi';
import '../App.css';
import MarkerPoint from './MarkerPoint';
import DrawnedMarker from './DrawnedMarker';


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

type prop = {
    raffle: raffle,
}

function MapDoneRaffles({ raffle }: prop) {
  useEffect(() => {
    console.log("lat: ", raffle.drawnLat, "lng: ", raffle.drawnLng);
    console.log(typeof raffle.drawnLat, typeof raffle.drawnLng);
  })
  const maxBounds: LatLngBoundsExpression = [
    [90, -180], // Nordeste
    [-90, 180], // Sudoeste
  ];

  return (
    <div>
      <h2>Resultado para o periodo entre:</h2>
      <h3>{ `Inicio: ${raffle.drawnStart}`}</h3>
      <h3>{ `Fim: ${raffle.drawnEnd}`}</h3>
      <MapContainer center={[0, 0]} zoom={0.9} scrollWheelZoom={true} maxBounds={maxBounds}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          raffle.competingPoints && raffle.competingPoints.map((point: point) => {
            const isWinnerPoint = point.id === raffle.winnerPointId;
            return (
              <MarkerPoint
              pointLat={point.lat}
              pointLng={point.lng}
              isWinner={isWinnerPoint}
              />
              )
            })
          }
          <DrawnedMarker
            pointLat={raffle.drawnLat}
            pointLng={raffle.drawnLng}
          />
      </MapContainer>
    </div>
  );
}

export default MapDoneRaffles;
