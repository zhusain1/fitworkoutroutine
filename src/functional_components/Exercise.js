import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import ReactHlsPlayer from 'react-hls-player';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import api from '../util/api';
import Success from './Success';

const useStyles = makeStyles({
  secondary: {
    color: 'white',
    float: 'left',
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
  },
  icon: {
    color: 'white'
  }
});

export default function Exercise(props) {

  const [success, setSuccess] = React.useState("");

  const renderSuccess = () => {
    if(success === "added"){
      return (
        <Success message="Workout added to My Workouts"/>
      );
    }  
    
    if(success === "removed"){
      return(
        <Success message="Workout removed from My Workouts"/>
      );
    } 
  }

  const handleBack = () => {
    sessionStorage.removeItem('workout');
    sessionStorage.removeItem('path');
    window.location.reload()
  }

  const addExercise = (workoutId) => {
    const request = {
      email: props.workout.email,
      workout_id: workoutId
    }

    const url = '/workout/addWorkoutToUser'
    api({
        method: 'post',
        url: url,
        data: request
    }).then( res => {
      setSuccess("added");        
    })
    .catch((error) => {
      console.log(error);
      setSuccess("");
    });
  }

  const removeExercise = (workoutId) => {
    const request = {
      email: props.workout.email,
      workout_id: workoutId
    }

    const url = '/workout/removeWorkoutFromUser'
    api({
        method: 'delete',
        url: url,
        data: request
    }).then( res => {
      console.log(res.data)  
      setSuccess("removed");      
    })
    .catch((error) => {
      console.log(error);
      setSuccess("");
    });
  }

  const renderVideo = () => {
    return (
      <ReactHlsPlayer
          src= {`https://videodelivery.net/${props.workout.workoutUrl}/manifest/video.m3u8`}
          autoPlay={false}
          controls={true}
          width="100%"
          height="auto"
        />);
  }

  const classes = useStyles();
  return (
    <div>
      <br/>
      <Button variant="contained" className={classes.secondary} onClick={handleBack}>
          Back
      </Button>
      {renderSuccess()}
      <h2>{props.workout.workoutName}</h2>
        <div className='description' style={{textAlign:'left'}}>
          { ReactHtmlParser(props.workout.workoutDescription) }
        </div>
        <IconButton aria-label="add" className={classes.icon} value={props.workout.workoutId} onClick={() => addExercise(props.workout.workoutId)}>
          <AddIcon fontSize="large" color='primary' />
        </IconButton>
        <IconButton aria-label="remove" className={classes.icon} value={props.workout.workoutId} onClick={() => removeExercise(props.workout.workoutId)}>
          <RemoveIcon fontSize="large" color='primary' />
        </IconButton>
      <br/>
      <br/>
      <br/>
      {renderVideo()}
      <small> Created by: {props.workout.email} </small>
      <br/>
    </div>
  );
}