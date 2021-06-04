import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';
import api from '../util/api'
import ErrorMessage from './ErrorMessage';

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
    },
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
        }
    }
}));

function getSteps() {
  return ['Enter Email', 'Enter Email Code', 'Reset Password'];
}

export default function ResetPassword() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [email, setEmail] = React.useState('');
  const [emailCode, setEmailCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const steps = getSteps();
  const history = useHistory();

  const renderError = () => {
      if(error.length > 0){
          return <ErrorMessage error={error}/>
      }
  }

 
 const initiatePasswordReset = (advance) => {
    const req = {
        email: email
    }

    api({
        method: 'post',
        url: '/user/initiateForgotPassword',
        data: req
    }).then( res => {
            setError('');
            if(advance){
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        })
        .catch((error) => {
            setError('Email not found');
        })
  }

  const validateCode = () =>{
      const req = {
          email: email,
          code: emailCode
      }

      api({
        method: 'post',
        url: '/user/validateEmailCode',
        data: req
      }).then( res => {
            setError('');
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
            setError('Invalid code');
            initiatePasswordReset(false);
        })
  }

  const resetPassword = () => {
    const req = {
        email: email,
        password: password
    }

    api({
        method: 'post',
        url: '/user/resetPassword',
        data: req
      }).then( res => {
            setError('');
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
            setError('Could not update password');
        })
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <form onSubmit={handleSubmitInitiate}>
                {renderError()}
                <h2> Enter Email </h2>
                <TextField id="email" label="email" variant="filled" type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    color="primary" className={classes.root}
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
                <Button type="submit" disabled={!email}> Next </Button>
            </form>
          </div>
        );
      case 1:
        return (
            <div>
                <form onSubmit={handleSubmitCode}>
                    {renderError()}
                    <h2> Enter Email Code </h2>
                    <TextField id="emailCode" label="email code" variant="filled" value={emailCode}
                        onChange={e => setEmailCode(e.target.value)}
                        color="primary" className={classes.root}
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
                    <Button type="submit" disabled={!emailCode}> Next </Button>
                </form>
            </div>
        );
      case 2:
        return(
            <div>
                <form onSubmit={handleReset}>
                    <h2> Reset Password</h2>
                    <TextField id="reset_password" label="password" variant="filled" type="password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        color="primary" className={classes.root}
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
                    <Button type="submit" disabled={!password}> Reset </Button>
                </form>
            </div>
        );
      default:
        return 'Unknown step';
    }
  }

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
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Password reset successful
            </Typography>
            <br/>
            <Button onClick={redirect} className={classes.button}>
              Back To Login
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}> </Typography>
            {getStepContent(activeStep)}
          </div>
        )}
      </div>
    </div>
  );
}