import './App.css';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';

import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const schema = require('../src/draft7');
const uischema = require("../src/uischema");

const initialdata = require('../src/weimarnetz-api');

function App() {
  const [data, setData] = useState({});
  return (
    <div className="App">
      <h1>API Generator</h1>
      <div className="container">
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ errors, data }) => setData(data)}
        />

        <Button onClick={()=> setData(initialdata)}> Initiate </Button>
        <Button onClick={()=> setData({})}> Clear </Button>
      </div>
    </div>
  );
}

export default App;