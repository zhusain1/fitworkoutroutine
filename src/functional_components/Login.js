import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../img/logo-transparent.png'
import CreateAccount from './CreateAccount';
import { useHistory } from 'react-router';
import api from '../util/api';
import ErrorMessage from './ErrorMessage';

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
      },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    minWidth: '250px',
    height: '25px',
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
    },
  },
}));

const errorStyle = {
  marginTop : '-42px'
}

 export default function Login() {
    const classes = useStyles();
    const history = useHistory();


    /* State */ 
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      if(email.length > 0 && password.length > 0){

        const req = {
          email: email,
          password: password
        }
        api({
          method: 'post',
          url: '/user/findUser',
          data: req
        }).then( res => {
            setError('');

            sessionStorage.setItem('token', res.data)

            history.push(
              '/'
            );
          })
          .catch((error) => {
            setError(error.response.data);
            setPassword('');
          });
      }
    }

    const displayError = () => {
      if(error.length > 0 ){
        return <ErrorMessage error={error}/>
      }
    }

    const disabled = () => {
     return !email || !password
    }

    return (
      <div className="Login">
        <div className='error' style={errorStyle}>
        {displayError()}
        </div>
        <img src={logo} alt="logo" width="250" height="140"/>
        <>
            <form onSubmit={handleSubmit}>
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
                <TextField id="password" label="password" variant="filled" type="password" value={password} 
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
                <br/>
                <Button variant="contained" type="submit" className={classes.button} disabled={disabled()}>
                  Login
                </Button>
                <br/>
                <br/>
                <CreateAccount/>
            </form>
        </>
      </div>
    );
  }
    