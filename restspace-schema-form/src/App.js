import logo from './logo.svg';
import './App.css';
import SchemaForm from "@restspace/schema-form";
import "@restspace/schema-form/build/index.css";
import { dataschema } from '../src/draft7_schema.json';

function App() {
  var value = {};
  return (
    <div className="App">
      <SchemaForm
        schema={dataschema}
        value={value}
      />
    </div>
  );
}

export default App;
