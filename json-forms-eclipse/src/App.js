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



function App() {
  const [data, setData] = useState({});
  return (
    <div className="App">
      <br></br><br></br>
      <center>
      <JsonForms
        schema={dataschema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ errors, data }) => setData(data)}
      />
      </center>
    </div>
  );
}

export default App;
