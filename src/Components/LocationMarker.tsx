import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';

type LocationMarkerProps = {
    lockMarker: boolean,
}

function LocationMarker({ lockMarker }: LocationMarkerProps) {
    const [position, setPosition] = useState<LatLng | null>(null);
    const [locationName, setLocationName] = useState<string | null>(null);
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
  };

export default LocationMarker;