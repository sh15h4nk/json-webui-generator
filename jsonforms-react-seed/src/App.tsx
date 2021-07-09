import { Fragment, useState, useEffect } from 'react';
import { JsonForms } from '@jsonforms/react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from './logo.svg';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@material-ui/core/styles';
import { Text } from 'react-native';
import * as React from 'react';
import Select from 'react-select'     

const useStyles = makeStyles((_theme) => ({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
    padding: "1rem"
  },
  buttonLayout: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    marginBottom: '1rem',
    padding: "1rem"
  },
  button: {
    margin: 'auto',
    display: 'block',
  },
  form: {
    margin: 'auto',
    padding: '1rem',
  },
}));


//    Req. Parameters
//initial Data of the jsonform
const initialData = {};
//initla errors
let initialErrors: Array<{message: string, dataPath: string}> = [];

//    Renderer set
const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
];

//    Forms App
const App = () => {

  const classes = useStyles();  //for user defined css styles

  //    Form data hooks
  const [displayDataAsString, setDisplayDataAsString] = useState('');
  const [jsonformsData, setJsonformsData] = useState<any>(initialData);

  useEffect(() => {
    setDisplayDataAsString(JSON.stringify(jsonformsData, null, 2));
  }, [jsonformsData]);


  //   FormsData functions
  //To clear the form data
  const clearData = () => {
    setJsonformsData({});
  };
  //To set form data
  let setData = (community: string) => {
    var data = require("../src/apiFiles/"+community+"-api.json");
    setJsonformsData(data);
  }

  //    Validation Error Hooks
  const [validationErrors, setValidationErrors] = useState(initialErrors);

  //  ValidationErrors Functions
  //to record the errors from event emmiter
  let recordErrors = (errors: any) => {
    setValidationErrors(errors);
  }

  //creating a refernce for validation error div
  const errorToFocus = React.createRef<HTMLDivElement>();

  //to validate the data and generate the json file
  let generateFile = async () => {
    if (validationErrors.length === 0 && Object.keys(jsonformsData).length !== 0) {
      const fileName = "yourapi";
      const json = JSON.stringify(jsonformsData);
      const blob = new Blob([json],{type:'application/json'});
      const href = await URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + ".json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return console.log("generated");
    }
    if(errorToFocus.current) errorToFocus.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    console.log("Can't generate");
  }

  //fetching all the API files
  const [comminutiesFiles, setCommunitiesFiles ] = useState([]);
  const fetchApiFiles = () => {
    fetch("https://api.freifunk.net/data/ffSummarizedDir.json")
      .then(response => response.json())
      .then(data => setCommunitiesFiles(data))
  }
  useEffect( () => {
    fetchApiFiles()
  },[])
  
  //list of communities to select
  const communities: Array<{value: string, label: string}> = []
  Object.keys(comminutiesFiles).sort().forEach((comm)=> {
    communities.push({ value: comm, label: comm})
  })

  //to load the data into the form
  let loadData = (community: string) => {
    console.log(community)
    // setJsonformsData(comminutiesFiles[community]);
  }

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>API Generator</h1>
          <p className='App-intro'>More Forms. Less Code.</p>
        </header>
      </div>

      <Grid
        container
        justify={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>

          <Typography variant={'h3'} className={classes.title}>
            Load Data
          </Typography>

          <div className={classes.container}>
            <Select
              options={communities}
              onChange={() => {loadData(this.value)}}
            />
          </div>

          <Typography variant={'h3'} className={classes.title}>
            Bound data
          </Typography>

          <div id='boundData' className={classes.dataContent}>
            <Text>{displayDataAsString}</Text>
          </div>

          <div className={classes.buttonLayout}>
            <Button
              className={classes.button}
              onClick={()=> setData('weimarnetz')}
              color='primary'
              variant='contained'
            >
              Set data
            </Button>
            <br/>
            <Button
              className={classes.button}
              onClick={clearData}
              color='primary'
              variant='contained'
            >
              Clear data
            </Button>
          </div>

          <div ref={errorToFocus}>
            <Typography variant={'h3'} className={classes.title}>
              Validation
            </Typography>

            <div className={classes.dataContent}>
              <Text>{validationErrors.map(d => <li key= {d.dataPath}>{d.dataPath}:{d.message}</li>)}</Text>
            </div>
          </div>

        </Grid>

        <Grid item sm={6}>
          <Typography variant={'h3'} className={classes.title}>
            Generator form
          </Typography>
          <div className={classes.form}>
            <Button
              className={classes.button}
              onClick={generateFile}
              color='primary'
              variant='contained'
            >Generate API FILE</Button>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={jsonformsData}
              renderers={renderers}
              cells={materialCells}
              validationMode={"ValidateAndShow"}
              onChange={({ errors, data }) => {
                  setJsonformsData(data);
                  recordErrors(errors);
                  if (Object.keys(jsonformsData).length === 0) recordErrors([]);
                }
              }
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
