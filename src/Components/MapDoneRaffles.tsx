import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngBoundsExpression } from 'leaflet';
import '../App.css';
import MarkerPoint from './MarkerPoint';
import DrawnedMarker from './DrawnedMarker';
import InBetweenDates from './InBetweenDates';


type point = {
    lat: number,
    lng: number,
    id: number,
    userId: number,
};

export type raffle = {
    winnerPointId: number,
    drawnLat: number,
    drawnLng: number,
    id: number,
    competingPoints: point[],
    drawnStart: Date,
    drawnEnd: Date,
};

type prop = {
    raffle: raffle,
};

function MapDoneRaffles({ raffle }: prop) {
  const maxBounds: LatLngBoundsExpression = [
    [90, -180],
    [-90, 180],
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
      <InBetweenDates raffle={raffle} />
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
