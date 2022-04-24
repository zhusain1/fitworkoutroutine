import React, { useRef, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import api from '../util/api';
import ErrorMessage from './ErrorMessage';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityIconOff from '@material-ui/icons/VisibilityOff';
import CreateUserContext from '../global/CreateUserContext';


const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
      },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
  },
  textField: {
    color: 'white',
    minWidth: '250px',
    textAlign: 'left'
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
    },
  },
  icon: {
    color: 'white'
  },
}));

export default function CreateAccount() {
  const classes = useStyles();
  const inputRef = useRef();
  
  /* State */ 
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [togglePassword, setTogglePassword] = React.useState(false);
  const { setUser } = useContext(CreateUserContext);


  const handleTogglePassword = (e) => {
    e.preventDefault();
    setTogglePassword(!togglePassword);

    if(togglePassword){
      inputRef.current.type = "password"
    } else{
      inputRef.current.type = "text"
    }
  }

  const validateRequest = (req) =>{
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit form")
    const req = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password
    }

    try{
      await api.post('/user/validateCreateUser', req);
      setUser(req)
    }catch (err) {
      setError(err.response.data)
      setEmail('');
      setPassword('');
    }    
  }

  let visibility =  !togglePassword ? <VisibilityIcon onClick={handleTogglePassword}/>  
    : <VisibilityIconOff onClick={handleTogglePassword}/>

  return (
    <div>
        {displayError()}
        <br/>
        <form onSubmit={handleSubmit}>
            <TextField id="first_name" label="first name" variant="filled" type="text" color="primary"
            value={firstName} onChange={e => setFirstName(e.target.value)} className={classes.root}
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
            value={lastName} onChange={e => setLastName(e.target.value)} className={classes.root}
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
            value={email} onChange={e => setEmail(e.target.value)} className={classes.root}
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
            value={password} onChange={e => setPassword(e.target.value)} inputRef={inputRef} className={classes.root}
                inputProps={{
                    className: classes.textField
                }}
                InputLabelProps={{
                className: classes.textField
                }}
                InputProps={{
                className: classes.icon,
                endAdornment: visibility
                }}
            />
            <br/>
            <br/>
        <Button color="primary" type="submit" disabled={disabled()} className={classes.button}>
           Next
        </Button>
        </form>
    </div>
  );
}