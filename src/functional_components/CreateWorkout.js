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
    '& .MuiPaper-root.MuiAlert-filledError': {
      backgroundColor: '#6F0C16'
    },
    minWidth: '250px',
    textAlign: 'left'
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

export default function CreateWorkout(props) {

  const classes = useStyles();
  const [workoutName, setWorkoutName] = React.useState('');
  const [workoutType, setWorkoutType] = React.useState('');
  const [workoutTag, setWorkoutTag] = React.useState('');
  const [workoutDescription, setWorkoutDescription] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const workout = {
      workout_name: workoutName,
      workout_description: workoutDescription,
      workout_type: workoutType,
      workout_tag: workoutTag
    }

    api({
      method: 'post',
      url: '/workout/createWorkout',
      data: workout
    }).then( res => {
      console.log(res.data);
      props.callback(res.data.workoutId);
    })
    .catch((error) => {
      console.log(error);
      setError(true);
    });
  }

  const disabled = () => {
    return !workoutName || !workoutDescription || !workoutType || !workoutTag
  }

  const renderError = () => {
    if(error){
      return(
        <>
          <ErrorMessage error="Exercise already created"/>
        </>);
    }
  }

  return (
    <div>
      <React.Fragment>
          {renderError()}
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
                <MenuItem value={'Shoulders'}>Shoulders</MenuItem>
                <MenuItem value={'Cardio'}>Cardio</MenuItem>
              </Select>
            </FormControl>
            <br/>
            <br/>
            <FormControl className={classes.select}>
              <InputLabel id="workout-tag" className={classes.select}>
                Equipment Needed
              </InputLabel>
              <Select
                labelId="workout-tag"
                id="workout-tag-select"
                value={workoutTag}
                onChange={e => setWorkoutTag(e.target.value)}
                className={classes.select}
                inputProps={{
                  className: classes.select
                }}
              >
                <MenuItem value={'Barbell'}>Barbell</MenuItem>
                <MenuItem value={'Dumbbell'}>Dumbbell</MenuItem>
                <MenuItem value={'Bodyweight'}>Bodyweight</MenuItem>
                <MenuItem value={'Machine'}>Machine</MenuItem>
                <MenuItem value={'Medicine Ball'}>Medicine Ball</MenuItem>
                <MenuItem value={'Kettlebell'}>Kettlebell</MenuItem>
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
                Create
            </Button>
          </form>
          <br/>
      </React.Fragment>
    </div>
  );
}