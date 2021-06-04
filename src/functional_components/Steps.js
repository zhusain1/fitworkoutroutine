import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CreateWorkout from './CreateWorkout';
import CreateVideo from './CreateVideo';

const useStyles = makeStyles(() => ({
  steps: {
    width: '100%',
    '& .MuiButton-root.Mui-disabled': {
        color: 'white'
    },
    '& .MuiButton-root': {
        color: 'white',
        backgroundColor: 'black'
    },
    '& .MuiStepper-root': {
        color: 'white',
        backgroundColor: '#131416'
    },
    '& .MuiStepIcon-root': {
        color: 'white'
    },
    '& .MuiStepLabel-label': {
        color: 'white'
    }
  }
}));

function getSteps() {
  return ['Create Workout', 'Upload Video'];
}

export default function Steps() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [workout_id, setWorkout_id] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleCallback = (workout_id) => {
    console.log(workout_id);
    if(workout_id > 0){
      setWorkout_id(workout_id);
      handleNext();
    }
  }

  const handleCallbackVideo = () => {
    console.log("Callback from video advance next");
    handleNext();
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <CreateWorkout callback={handleCallback}/>
        );
      case 1:
        return(
          <CreateVideo callback={handleCallbackVideo} workout_id={workout_id}/>
        );
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className={classes.steps}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div className={classes.steps}>
        {activeStep === steps.length ? (
          <div>
            <h2> Workout Created </h2>
            <br/>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
          </div>
        )}
      </div>
    </div>
  );
}
