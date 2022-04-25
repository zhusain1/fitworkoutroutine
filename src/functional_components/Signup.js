import React, { useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import { makeStyles } from '@mui/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import MainCard from './MainCard';
import logo from '../img/logo-transparent.png';
import CreateAccount from './CreateAccount';
import BillingInfo from './BillingInfo'
import CreateUserContext from '../global/CreateUserContext';


const useStyles = makeStyles(() => ({
  steps: {
    width: '100%',
    '& .MuiButton-root.Mui-disabled': {
        color: 'white'
    },
    '& .MuiStepper-horizontal': {
         backgroundColor: '#131416'
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
  },root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
      },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    minWidth: '250px',
    textAlign: 'left'
  },button: {
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
      }
  }
}));

function getSteps() {
  return ['Create Account', 'Billing Info'];
}

const stripePromise = loadStripe('pk_test_dWg4X4LaroVznfa7oAOwNoum00vzNnt3hI');

export default function Signup() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();

  const [ user, setUser ] = React.useState({});

  useEffect(() => {
    if(user.email && user.email.length > 0){
      setActiveStep(1)
    }
  });


  function getStepContent(step) {

    switch (step) {
      case 0:
        return (
          <div>
            <CreateAccount/>
          </div>
        );
      case 1:
        return (
            <div>

               <Elements stripe={stripePromise}>
                <BillingInfo user={user}/>
              </Elements>
            </div>
        );
      default:
        return 'Unknown step';
    }
  }

  return (
    <CreateUserContext.Provider value= {{user, setUser}}>
      <MainCard>
          <img src={logo} alt="logo" width="250" height="140"/>
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
            <div>
                <div>
                  <Typography className={classes.instructions}> </Typography>
                  {getStepContent(activeStep)}
                </div>
            </div>
          </div>
        </MainCard> 
      </CreateUserContext.Provider>
  );
}