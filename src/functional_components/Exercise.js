import React from 'react';
import Button from '@mui/material/Button';
import ExerciseAccordian from './ExerciseAccordian';
import RepInfo from './RepInfo';

const button = {
    color: 'white',
    float: 'left',
    width: '120px'
};

export default function Exercise(props) {

  sessionStorage.setItem('workoutType', props.workout.workoutType)
  
  const handleBack = () => {
    sessionStorage.removeItem('workout');
    sessionStorage.removeItem('path');
    window.location.reload()
  }

  return (
    <div>
      <br/>
      <Button variant="contained" style={button} onClick={handleBack}>
          Back
      </Button>
      <RepInfo/>
      <ExerciseAccordian workout={props.workout}/> 
    </div>
  );
}