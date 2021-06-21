import './App.css';
import React from 'react';
import Form from '@rjsf/core';
import { dataschema } from '../src/draft7_schema.json';
import { uischema } from '../src/uischema.json';

function App() {
  return (
    <div className="App">
      <center>
        <Form 
          schema={dataschema}
          // uiSchema = {uischema}
        />
      </center>
    </div>
  );
}

export default App;
