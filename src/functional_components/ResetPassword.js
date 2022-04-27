import React, { useRef } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router';
import api from '../util/api'
import ErrorMessage from './ErrorMessage';
import logo from '../img/logo-transparent.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityIconOff from '@mui/icons-material/VisibilityOff';
import {Helmet} from "react-helmet";
import MainCard from './MainCard';

function getSteps() {
  return ['Enter Email', 'Enter Email Code', 'Reset Password'];
}

export default function ResetPassword() {
  const inputRef = useRef();

  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [emailCode, setEmailCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const steps = getSteps();
  const history = useHistory();
  const [togglePassword, setTogglePassword] = React.useState(false);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setTogglePassword(!togglePassword);

    if(togglePassword){
      inputRef.current.type = "password"
    } else{
      inputRef.current.type = "text"
    }
  }

  const renderError = () => {
      if(error.length > 0){
          return <ErrorMessage error={error}/>
      }
  }

 
 const initiatePasswordReset = (advance) => {
    const req = {
        email: email
    }

    apiCall(req, '/user/initiateForgotPassword', 'Email not found')

  }

  const validateCode = () =>{
      const req = {
          email: email,
          code: emailCode
      }

      apiCall(req, '/user/validateEmailCode', 'Invalid code')
  }

  const resetPassword = () => {

    const req = {
        email: email,
        password: password
    }

    apiCall(req, '/user/resetPassword',  'Could not update password')
  }


  const apiCall = async (request, endpoint, errorMessage) => {

    console.log('api req')
    try{
      let res = await api.post(endpoint, request);

      console.log(res)
      setError('');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch(error){
      console.log(error)
      setError(errorMessage);
    }
  }


  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <form onSubmit={handleSubmitInitiate}>
                {renderError()}
                <br/>
                <h2> Enter Email </h2>
                <TextField id="email" label="Email" variant="outlined" type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    color="primary" 
                />
                <br/>
                <br/>
                <br/>
                <Button type="submit" disabled={!email}> Next </Button>
            </form>
          </div>
        );
      case 1:
        return (
            <div>
                <form onSubmit={handleSubmitCode}>
                    {renderError()}
                    <br/>
                    <h2> Enter Email Code </h2>
                    <TextField id="emailCode" label="Email Code" variant="outlined" value={emailCode}
                        onChange={e => setEmailCode(e.target.value)}
                        color="primary" 
                    />
                    <br/>
                    <br/>
                    <br/>
                    <Button type="submit" disabled={!emailCode}> Next </Button>
                </form>
            </div>
        );
      case 2:
        return(
            <div>
                <form onSubmit={handleReset}>
                    <br/>
                    <h2> Reset Password</h2>
                    <TextField id="password" label="Password" variant="outlined" type="password" value={password} 
                      onChange={e => setPassword(e.target.value)}
                      color="primary"  inputRef={inputRef}
                          InputProps={{
                            endAdornment: visibility
                      }}
                    />
                    <br/>
                    <br/>
                    <br/>
                    <Button type="submit" disabled={!password}> Reset </Button>
                </form>
            </div>
        );
      default:
        return 'Unknown step';
    }
  }

  let visibility =  !togglePassword ? <VisibilityIcon onClick={handleTogglePassword}/>  
    : <VisibilityIconOff onClick={handleTogglePassword}/>

  const handleSubmitInitiate = (e) => {
    e.preventDefault();
    initiatePasswordReset(true);
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
    validateCode();
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetPassword();
  };

  const redirect = () => {
    history.push('/');
  };

  return (
    <MainCard>
      <div>
        <Helmet>
          <title>Fit Workout Routine | Forgot Password</title>
          <meta name="description" content="Workout tutorials to help you get a Fit Workout Routine | fitworkoutroutine" />
        </Helmet>
        <img src={logo} alt="logo" width="250" height="140"/>
        <br/>
        <br/>
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
          {activeStep === steps.length ? (
            <div>
              <br/>
              <br/>
                Password reset successful
              <br/>
              <br/>
              <Button onClick={redirect}>
                Back To Login
              </Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
            </div>
          )}
        </div>
      </div>
    </MainCard>
  );
}