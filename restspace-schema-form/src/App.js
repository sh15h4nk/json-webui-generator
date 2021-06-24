import logo from './logo.svg';
import './App.css';
import SchemaForm from "schema-form";
import "@restspace/schema-form/build/index.css";
import { dataschema } from '../src/draft7_schema.json';
import Container from '@material-ui/core/Container';

function App() {
  var value = {};
  return (
    <div className="App">
      <Container>
      <h3>RESTSPACE Schema Forms</h3>
      <SchemaForm
        schema={dataschema}
        value={value}
      />
      </Container>
    </div>
  );
}

export default App;
