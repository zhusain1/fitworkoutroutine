import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExerciseAccordian from './ExerciseAccordian';

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
  
  const handleBack = () => {
    sessionStorage.removeItem('workout');
    sessionStorage.removeItem('path');
    window.location.reload()
  }

  const classes = useStyles();
  return (
    <div>
      <br/>
      <Button variant="contained" className={classes.secondary} onClick={handleBack}>
          Back
      </Button>
      <ExerciseAccordian workout={props.workout}/> 
    </div>
  );
}