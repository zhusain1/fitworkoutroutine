import React, { useEffect } from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MainCard from './MainCard';
import logo from '../img/logo-transparent.png';
import CreateAccount from './CreateAccount';
import BillingInfo from './BillingInfo'
import CreateUserContext from '../global/CreateUserContext';

function getSteps() {
  return ['Create Account', 'Billing Info'];
}

const stripePromise = loadStripe('pk_test_dWg4X4LaroVznfa7oAOwNoum00vzNnt3hI');

export default function Signup() {

  const [activeStep, setActiveStep] = React.useState(0);

  const steps = getSteps();

  const [ user, setUser ] = React.useState({});

  useEffect(() => {
    if(user.email && user.email.length > 0){
      setActiveStep(1)
    }
  },[user.email]);


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
          <div>
            <Stepper activeStep={activeStep}>
              {steps.map((label) => {
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
                  {getStepContent(activeStep)}
                </div>
            </div>
          </div>
        </MainCard> 
      </CreateUserContext.Provider>
  );
}