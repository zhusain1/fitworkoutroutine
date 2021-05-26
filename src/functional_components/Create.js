import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ReactQuill from 'react-quill';
import Button from '@material-ui/core/Button';
import apiVideo from '../util/apiVideo';
import api from '../util/api';
import Success from './Success';
import ErrorMessage from './ErrorMessage';
import MainTabs from './MainTabs';
import 'react-quill/dist/quill.snow.css';

const textEditor = {
    justifyContent: 'center',
    maxWidth: '450px',
    margin: 'auto'
}

const useStyles = makeStyles({
  root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
    },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    minWidth: '250px',
    height: '15px',
    textAlign: 'left'
  },
  container: {
      marginTop: '32px',
      paddingTop: '4px',
      textAlign: 'center',
      backgroundColor: '#131416',
      height: 'auto',
      color: 'white'
  },
  select: {
    color: 'white',
    minWidth: '250px',
    textAlign: 'left',
    '& .MuiInput-underline::before': {
      borderBottom: '1px solid #F4F3EE',
    },
    '& .MuiInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled)::before': {
      borderBottom: '1px solid #6F0C16'
    },
    '& .MuiSvgIcon-root': {
      color: 'white'
    }
  },
  button: {
    color: 'white',
    backgroundColor: '#292929',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:focus': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:active': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:disabled': {
      color: 'white'
    },
  }
});

export default function Create() {

  const classes = useStyles();
  const [workoutId, setWorkoutId] = React.useState('');
  const [workoutName, setWorkoutName] = React.useState('');
  const [workoutType, setWorkoutType] = React.useState('');
  const [workoutDescription, setWorkoutDescription] = React.useState('');
  const [workoutUrl, setWorkoutUrl] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // refactor to createWorkoutVideoCall
    // Then make a call to vide server to upload video and assoociate with workout
    if (workoutUrl === null){
      console.log('Not submitting request, there is no video present')
      setSuccess(false);
      setError(true);
    } else{
      const workout = {
        workout_name: workoutName,
        workout_description: workoutDescription,
        workout_type: workoutType
      }

      api({
        method: 'post',
        url: '/workout/createWorkout',
        data: workout
      }).then( res => {
        console.log(res.data);
        setWorkoutId(res.data.workoutId);
        createVideoCall()
      })
      .catch((error) => {
        console.log(error);
        setSuccess(false);
        setError(true);
      });
    }
  }

  const createVideoCall = () => {

    setSuccess(false);
    var formData = new FormData();

    formData.append('workout_id', workoutId);
    formData.append('file', workoutUrl);

    console.log(formData)

    apiVideo({
      method: 'post',
      url: '/api/upload',
      data: formData
    }).then( res => {
      console.log(res.data);
      setWorkoutName('');
      setWorkoutDescription('');
      setWorkoutType('');
      setWorkoutUrl(null);
      setSuccess(true);
      setError(false);
    })
    .catch((error) => {
      console.log(error);
      setSuccess(false);
      setError(true);
      setWorkoutUrl(null);
    });

  }

  const disabled = () => {
    return !workoutName || !workoutDescription || !workoutType
  }

  const renderSuccess = () => {
    if(success){
      return(
        <Success/>
      );
    } else if(error){
      return(
        <ErrorMessage error="Could not upload workout"/>
      );
    }
  }

  return (
    <div>
      <MainTabs/>
      <CssBaseline />
      <React.Fragment>
        <Container maxWidth="md" className={classes.container}>
          {renderSuccess()}
          <h2> Create Exercise</h2> 
          <form onSubmit={handleSubmit}>
            <TextField id="title" label="Exercise Title" variant="filled" type="text" value={workoutName}
            color="primary" className={classes.root} onChange={e => setWorkoutName(e.target.value)}
                inputProps={{
                    className: classes.root
                }}
                InputLabelProps={{
                  className: classes.root
                }}
            />
            <br/>
            <br/>
            <br/>
            <br/>
            <FormControl className={classes.select}>
              <InputLabel id="workout-type" className={classes.select}>
                Focus Workout On
              </InputLabel>
              <Select
                labelId="workout-type"
                id="workout-type-select"
                value={workoutType}
                onChange={e => setWorkoutType(e.target.value)}
                className={classes.select}
                inputProps={{
                  className: classes.select
                }}
              >
                <MenuItem value={'Chest'}>Chest</MenuItem>
                <MenuItem value={'Arms'}>Arms</MenuItem>
                <MenuItem value={'Legs'}>Legs</MenuItem>
                <MenuItem value={'Back'}>Back</MenuItem>
                <MenuItem value={'Abs'}>Abs</MenuItem>
                <MenuItem value={'Cardio'}>Cardio</MenuItem>
              </Select>
            </FormControl>
            <br/>
            <br/>
            <br/>
            <br/>
              <div className='editor' style={textEditor}>
                <ReactQuill theme="snow" value={workoutDescription} onChange={setWorkoutDescription}/>
              </div>
            <br/>
            <br/>
            <input type="file" id="upload" name="filename" onChange={e => setWorkoutUrl(e.target.files[0])}/>
            <br/>
            <br/>
            <Button variant="contained" type="submit" className={classes.button} disabled={disabled()}>
                Create
            </Button>
          </form>
          <br/>
          <br/>
        </Container>
      </React.Fragment>
    </div>
  );
}