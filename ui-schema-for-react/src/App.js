import { draft7 } from '../src/schema.json';
import './App.css';
import "bootstrap";
import $ from "jquery";
import 'bootstrap/dist/css/bootstrap.css';

import React from "react";

import {
    UIGenerator,                  
    isInvalid,                    
    createEmptyStore, createStore,
    createMap, createOrderedMap, 
    storeUpdater,              
} from "@ui-schema/ui-schema";

import {widgets} from "@ui-schema/ds-material";

const schema = createOrderedMap(draft7);
// console.log(schema);
const values = {};

function App() {

   const [store, setStore] = React.useState(() => createStore(createOrderedMap(values)));

   const onChange = React.useCallback((storeKeys, scopes, updater, deleteOnEmpty, type) => {
       setStore(storeUpdater(storeKeys, scopes, updater, deleteOnEmpty, type))
   }, [setStore])


  return (
    <html>
      <body>
      <link rel="stylesheet" href="../node_modules/bootstrap/css/lib" />
      <div className="container">
      <UIGenerator
        schema={schema}

        store={store}
        onChange={onChange}

        widgets={widgets}
      />
      </div>
    </body>
    </html>
  );
}

export default App;
