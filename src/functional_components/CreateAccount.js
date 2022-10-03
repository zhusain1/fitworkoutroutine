import React, { useRef, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import api from '../util/api';
import ErrorMessage from './ErrorMessage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityIconOff from '@mui/icons-material/VisibilityOff';
import CreateUserContext from '../global/CreateUserContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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

  // validation messages
  const [minimumPasswordLength, setMinimumPasswordLength] = React.useState(false);
  const [containsUpperCase, setContainsUpperCase] = React.useState(false);
  const [containsDigit, setContainsDigit] = React.useState(false);


  const handleTogglePassword = (e) => {
    e.preventDefault();
    setTogglePassword(!togglePassword);

    if(togglePassword){
      inputRef.current.type = "password"
    } else{
      inputRef.current.type = "text"
    }
  }

  const validatePassword = (password) => {
    setPassword(password);

    
    // greater than 8 characters
    if(password.length >= 8){
      setMinimumPasswordLength(true);
    } else{
      setMinimumPasswordLength(false);
    }

    // contains upper case
    if(password.match("[A-Z]+")) {
      setContainsUpperCase(true);
    } else {
      setContainsUpperCase(false);
    }

    // contains digit
    if(password.match("\\d")) {
      setContainsDigit(true);
    } else {
      setContainsDigit(false);
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


  const renderValidation = (isValid) => {
    if(isValid){
      return <CheckCircleOutlineIcon sx={{color: '#8ac926 !important', margin: '-7px', cursor:'auto'}}/>;
    }
    return <HighlightOffIcon sx={{color: '#6F0C16 !important', margin: '-7px', cursor:'auto'}}/>;
  }

  const disabled = () => {

    let isPasswordValid = containsDigit  && containsUpperCase && minimumPasswordLength

    return !email || !password || !firstName || !lastName || !isPasswordValid

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
                  onChange={e => validatePassword(e.target.value)}
                  color="primary"  inputRef={inputRef}
                      InputProps={{
                        endAdornment: visibility
                  }}
            />
            <br/>
            <br/>
            <div className='validationWrapper'
            style={{
              maxWidth: '500px',
              display: 'block'
            }}
            >
            <div>
              {renderValidation(containsUpperCase)}
              <span className='validationText' style={{
                'marginLeft': '16px'
              }}>Must have at least one upper case character</span>
            </div>
            <br/>
              <div>
              {renderValidation(containsDigit)}
                <span className='validationText' style={{
                  'marginLeft': '16px'
                }}>Must have at least one number</span>
              </div>
              <br/>
              <div>
              {renderValidation(minimumPasswordLength)}
                <span className='validationText' style={{
                  'marginLeft': '16px'
                }}>Must be at least 8 characters </span>
              </div>
            </div>
            <br/>
            <br/>
        <Button variant="contained" type="submit" disabled={disabled()}>
           Next
        </Button>
        </form>
    </div>
  );
}