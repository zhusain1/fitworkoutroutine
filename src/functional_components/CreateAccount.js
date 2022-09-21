import React, { useRef, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from '../util/api';
import ErrorMessage from './ErrorMessage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityIconOff from '@mui/icons-material/VisibilityOff';
import CreateUserContext from '../global/CreateUserContext';

export default function CreateAccount() {
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

  const displayError = () => {
    if(error.length > 0 ){
      return (
        <ErrorMessage sx={{
          marginTop: '24px'
        }}
        error={error}/>
      ) 
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
        <h2> Create Account </h2>
        <br/>
        <form onSubmit={handleSubmit}>
            <TextField id="first_name" label="First Name" variant="outlined" type="text" value={firstName}
              onChange={e => setFirstName(e.target.value)}
              color="primary" 
              autoFocus={true}
            />
            <br/>
            <br/>
            <br/>
            <TextField id="last_name" label="Last name" variant="outlined" type="text" value={lastName} 
              onChange={e => setLastName(e.target.value)}
              color="primary" 
            />
            <br/>
            <br/>
            <br/>
            <TextField id="email" label="Email" variant="outlined" type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              color="primary" 
            />
            <br/>
            <br/>
            <br/>
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
        <Button variant="contained" type="submit" disabled={disabled()}>
           Next
        </Button>
        </form>
    </div>
  );
}