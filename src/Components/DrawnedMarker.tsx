import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLng } from 'leaflet';
import L from 'leaflet';

const iconPath = require('../Icon/location-sign-svgrepo-com.svg').default;


const customIcon = new L.Icon({
  iconUrl: iconPath,
  iconSize: [36, 36],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

type MarkerProps = {
  pointLat: number | null;
  pointLng: number | null;
};

function MarkerPoint({ pointLat, pointLng }: MarkerProps) {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  const fetchData = async (lat: number, lng: number) => {
    const latLng = new LatLng(lat, lng);
    setPosition(latLng);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latLng.lat}&lon=${latLng.lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      console.log(data);

      let cityName = `Latitude: ${lat.toFixed(8)}, \nLongitude: ${lng.toFixed(8)}`;

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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (pointLat && pointLng) {
      console.log(process.env.PUBLIC_URL)
      fetchData(pointLat, pointLng);
    }
  }, [pointLat, pointLng]);

  return position === null ? null : (
    <Marker position={position} icon={customIcon}>
      <Popup>{locationName}</Popup>
    </Marker>
  );
}

export default MarkerPoint;
