import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLng } from 'leaflet';
import ConfirmEmail from '../Components/ConfirmEmail';
import LocationMarker from '../Components/LocationMarker';
import api from '../Utils/AxiosApi';
import '../App.css';


function Geolucky() {
  const [lockMarker, setLockMarker] = useState(false);
  const [uId, setUid] = useState<number | null>(null);
  const [position, setPosition] = useState<LatLng | null>(null);
  const [lat, setLat] = useState<number | null>(0);
  const [lng, setLng] = useState<number | null>(0);
  const [tokenState, setTokenState] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  
  useEffect(() => {
    const userIdP = JSON.parse(localStorage.getItem('userId') as string);
    console.log(userIdP, typeof userIdP, "iogogogo");
    if (userIdP !== null) {
      const uid = parseInt(userIdP);
      setUid(uid);
    }
    console.log("uid:", uId);
    async function checkIsUserConfirmed() {
      const response = await api.get(`http://localhost:3001/user/${userIdP}`);
      const { data } = response;
      console.log("user encontrado:", data);
      setTokenState(data.token);
      console.log(data.user.isConfirmed);
      setIsConfirmed(data.user.isConfirmed);
      // console.log(response.status);
    };
    checkIsUserConfirmed();
    async function apiGet() {
      const response = await api.post('http://localhost:3001/point/check', { userId: userIdP });
      if(response.data) {
        console.log(response.data);
        setLat(response.data.lat);
        setLng(response.data.lng);
        setLockMarker(true);
      } else if (!response.data) {
        console.log('Escolha um local no mapa para concorrer ao sorteio');
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


  return isConfirmed ? (
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
          // toggleLockMarker();
          // savePoint();
          }}>
          {lockMarker ? 'Coordenadas escolhidas' : 'Escolher lugar'}
        </button>
        <p style={{margin: "0px"}}>Atenção: apenas uma escolha por sorteio</p>
      </div>
    </div>
  ) : (<ConfirmEmail token={tokenState} />)
}

export default Geolucky;
