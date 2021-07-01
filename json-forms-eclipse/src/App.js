import logo from './logo.svg';
import './App.css';
import { dataschema } from "../src/draft7.json";
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { Generate } from '@jsonforms/core';
import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


var data = {}


function App() {
  const [data, setData] = useState({});
  return (
    <div className="App container">
      <br></br><br></br>
      <JsonForms
        schema={dataschema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ errors, data }) => setData(data)}
      />
      <Button onClick={() => setData(
        {
  "api": "0.4.14",
  "contact": {
    "email": "info@berlin.freifunk.net",
    "ml": "berlin@berlin.freifunk.net",
    "twitter": "@freifunk_berlin"
  },
  "location": {
    "address": {
      "Name": "Haus der Materialisierung",
      "Street": "Otto-Braun-Str. 70-72",
      "Zipcode": "10178"
    },
    "city": "Berlin",
    "country": "DE",
    "lat": 52.52315,
    "lon": 13.41957
  },
  "name": "Freifunk Berlin",
  "nodeMaps": [
    {
      "interval": "daily",
      "mapType": "geographical",
      "technicalType": "openwifimap",
      "url": "https://openwifimap.net"
    },
    {
      "interval": "daily",
      "mapType": "geographical",
      "technicalType": "hopglass",
      "url": "https://hopglass.berlin.freifunk.net"
    }
  ],
  "socialprojects": {
    "number": 38,
    "website": "https://wiki.freifunk.net/Berlin:Refugees"
  },
  "state": {
    "focus": [
      "infrastructure/backbone",
      "Public Free Wifi",
      "Free internet access"
    ],
    "lastchange": "2021-07-01T07:01:05+02:00",
    "nodes": 744
  },
  "techDetails": {
    "firmware": {
      "docs": "https://wiki.freifunk.net/Berlin:Firmware",
      "name": "hedy",
      "registrationurl": "https://config.berlin.freifunk.net/",
      "url": "https://berlin.freifunk.net/downloads/",
      "vpnaccess": "fwimage"
    },
    "legals": [
      "vpnnational",
      "institutions"
    ],
    "networks": {
      "ipv4": [
        {
          "network": "10.31.0.0/16"
        },
        {
          "network": "10.36.0.0/16"
        },
        {
          "network": "10.230.0.0/16"
        }
      ]
    },
    "routing": [
      "batman-adv",
      "OLSR"
    ],
    "updatemode": []
  },
  "url": "https://berlin.freifunk.net/"
      })} color='primary'>
        Initial Data
      </Button>
      <Button onClick={() => setData({})} color='primary'>
        Clear form data
      </Button>
    </div>
  );
}

export default App;
