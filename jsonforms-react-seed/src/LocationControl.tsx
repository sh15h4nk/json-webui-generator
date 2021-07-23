import * as React from 'react';
import { withJsonFormsControlProps } from "@jsonforms/react";
import { MapContainer, TileLayer } from 'react-leaflet';
import { Location } from './Location';

import 'leaflet/dist/leaflet.css';

interface LocationControlProps {
	data: any;
	handleChange(path: string, value: any): void;
	path: string;
}
const center = {
  lat: 51.505,
  lng: -0.09,
}

const LocationControl = ({ data, handleChange, path }: LocationControlProps) => (
	<MapContainer center={center} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100wh' }}>
	    <TileLayer
	      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	    />
	    <Location />
  	</MapContainer>
);

export default withJsonFormsControlProps(LocationControl);