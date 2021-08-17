import * as React from 'react';
import { Marker } from 'react-leaflet';
import { useState, useRef, useMemo } from 'react';

import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';

import L from 'leaflet';


L.Icon.Default.imagePath='leaflet_images/';

interface LocationProps {
  id?: string;
  value: {lat: number, lon: number};
  updateCords: (newValue: Object) => void;
}

let center = {
  lat: 51,
  lng: 8
}

export const Location: React.FC<LocationProps> = ({ id, value, updateCords }) => {
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          var cords = marker.getLatLng();
          setPosition(cords);
          // console.log("The marker", cords);
          updateCords({lat: cords.lat, lon: cords.lng});
        }
      },
    }),
    [updateCords],
  )
  if (value && !(value.lat === position.lat && value.lon === position.lng)){
    const t = {lat: value.lat, lng: value.lon};
    setPosition(t);
  }

  return (
    <Marker
    draggable={true}
    eventHandlers={eventHandlers}
    position={position}
    ref={markerRef}>
    </Marker>
  )
}
