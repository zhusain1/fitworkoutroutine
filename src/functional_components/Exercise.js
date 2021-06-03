import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Stream } from "@cloudflare/stream-react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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
  }
});

export default function Exercise(props) {
  const handleBack = () => {
    sessionStorage.removeItem('workout');
    window.location.reload()
  }

  const classes = useStyles();
  return (
    <div>
      <br/>
      <Button variant="contained" className={classes.secondary} onClick={handleBack}>
          Back
      </Button>
      <h2>{props.workout.workoutName}</h2>
      { ReactHtmlParser(props.workout.workoutDescription) }
      <Stream controls src={props.workout.workoutUrl} />
      <small> Created by: {props.workout.email} </small>
      <br/>
    </div>
  );
}