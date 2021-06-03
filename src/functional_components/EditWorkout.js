import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import ReactQuill from 'react-quill';
import Button from '@material-ui/core/Button';
import api from '../util/api';
import Success from './Success';
import ErrorMessage from './ErrorMessage';
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
  },
  secondary: {
    color: 'white',
    backgroundColor: 'black',
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

export default function EditWorkout(props) {
  const classes = useStyles();
  const workoutId = props.workout.workoutId;
  const [workoutName, setWorkoutName] = React.useState(props.workout.workoutName);
  const [workoutType, setWorkoutType] = React.useState(props.workout.workoutType);
  const [workoutDescription, setWorkoutDescription] = React.useState(props.workout.workoutDescription);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const workout = {
      workout_id : workoutId,
      workout_name : workoutName,
      workout_description : workoutDescription,
      workout_type : workoutType
    }

    api({
      method: 'patch',
      url: '/workout/editWorkout',
      data: workout
    }).then( res => {
      console.log(res.data);
      setSuccess(true);
    })
    .catch((error) => {
      console.log(error);
      setSuccess(false);
      setError(true);
    });

  }

  const disabled = () => {
    return !workoutName || !workoutDescription || !workoutType
  }

  const renderSuccess = () => {
    if(success){
      return(
        <Success message='Exercise updated'/>
      );
    } else if(error){
      return(
        <ErrorMessage error="Could not edit workout"/>
      );
    }
  }

  return (
    <div>
      <React.Fragment>
          {renderSuccess()}
          <h2> Edit Exercise</h2> 
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
            <Button variant="contained" type="submit" className={classes.button} disabled={disabled()}>
              Edit
            </Button>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <Button variant="contained" className={classes.secondary} onClick={() => window.location.reload()}>
              Back
            </Button>
          </form>
          <br/>
          <br/>
      </React.Fragment>
    </div>
  );
}