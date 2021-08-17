import * as React from 'react';
import { withJsonFormsControlProps } from "@jsonforms/react";
import { MapContainer, TileLayer } from 'react-leaflet';
import { Location }  from './Location';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface LocationControlProps {
	data: any;
	handleChange(path: string, value: any): void;
	path: string;
}

let center = {
  lat: 51.1657,
  lng: 10.4515
}

const LocationControl: React.FC<LocationControlProps> = ({ data, handleChange, path }) => {
  const [mapCenter, setMapcenter] = useState(center);

  if(data && !(mapCenter.lat === data.lat && mapCenter.lng === data.lon)){
    const t = {lat: data.lat, lng: data.lon }
    setMapcenter(t);
  }

  return(
  	<MapContainer center={mapCenter} zoom={7} scrollWheelZoom={false} style={{ height: '50vh', width: '100wh' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Location 
      	value = {data}
      	updateCords={(newValue: Object) => handleChange(path, newValue)}
      />
  	</MapContainer>
  )
};

export default withJsonFormsControlProps(LocationControl);