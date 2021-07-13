import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import api from '../util/api';
import ErrorMessage from './ErrorMessage';
import { useHistory } from 'react-router';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
      },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    '& .MuiDialog-paper':{
      backgroundColor: '#131416',
      color: 'white',
      marginTop: '-80px'
    },
  },
  textField: {
    minWidth: '250px',
    color: 'white'
  },
  button: {
    color: 'white',
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
      color: 'white',
      backgroundColor: '#292929'
    },
  },
  link: {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
      borderBottom: '2px solid #6F0C16'
    }
  }
}));

export default function CreateAccount() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  
  /* State */ 
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");


  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateRequest = (req) =>{
    console.log(req);
    for(const prop in req){
      if(req[prop].length < 1){
        return false;
      }
    }
    return true;
  } 

  const displayError = () => {
    if(error.length > 0 ){
      return <ErrorMessage error={error}/>
    }
  }

  const disabled = () => {
    return !email || !password || !firstName || !lastName
   }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit form")
    const req = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }

    if(validateRequest(req)){
      api({
        method: 'post',
        url: '/user/createUser',
        data: req
      }).then( res => {
          console.log(res);
          console.log(res.data.token)
          setError('');
          
          sessionStorage.setItem('token', res.data.token)

          history.push('/');
        })
        .catch((error) => {
          setError(error.response.data)
          setEmail('');
          setPassword('');
        });
    }
  }

  return (
    <div>
      <div className="footerlinks">
        <small>
        <Box component="div" display="inline">
            <Link href="/" onClick={handleClickOpen} className={classes.link}>
                Create Account
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/forgotpassword" className={classes.link}>
              Forgot Password
            </Link>
          </Box>
        </small>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl"
      className={classes.root}>
        {displayError()}
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField id="first_name" label="first name" variant="filled" type="text" color="primary"
            value={firstName} onChange={e => setFirstName(e.target.value)}
              inputProps={{
                className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textField
              }}
            />
            <br/>
            <br/>
            <TextField id="last_name" label="last name" variant="filled" type="text" color="primary"
            value={lastName} onChange={e => setLastName(e.target.value)}
              inputProps={{
                className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textField
              }}
            />
            <br/>
            <br/>
            <TextField id="email" label="email" variant="filled" type="email" color="primary"
            value={email} onChange={e => setEmail(e.target.value)}
              inputProps={{
                className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textField
              }}
            />
            <br/>
            <br/>
            <TextField id="password" label="password" variant="filled" type="password" color="primary"
            value={password} onChange={e => setPassword(e.target.value)}
              inputProps={{
                  className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textField
              }}
            />
            <br/>
            <br/>
            <Button color="primary" type="submit" disabled={disabled()} className={classes.button}>
              Sign Up
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}