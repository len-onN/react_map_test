import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLng } from 'leaflet';

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
      fetchData(pointLat, pointLng);
    }
  }, [pointLat, pointLng]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>{locationName}</Popup>
    </Marker>
  );
}

export default MarkerPoint;
