import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import logo from '../img/logo-transparent.png'
import Footer from './Footer';
import { useHistory } from 'react-router';
import api from '../util/api';
import ErrorMessage from './ErrorMessage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityIconOff from '@mui/icons-material/VisibilityOff';
import MainCard from './MainCard';
import {Helmet} from "react-helmet";

const errorStyle = {
  marginTop : '-42px'
}

 export default function Login() {
    const history = useHistory();
    const inputRef = useRef();


    /* State */ 
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
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

            sessionStorage.setItem('token', res.data.token)

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

    let visibility =  !togglePassword ? <VisibilityIcon onClick={handleTogglePassword}/>  
    : <VisibilityIconOff onClick={handleTogglePassword}/>

    return (
      <MainCard>
        <Helmet>
          <title>Fit Workout Routine | Login</title>
          <meta name="description" content="Workout tutorials to help you get a Fit Workout Routine | fitworkoutroutine" />
        </Helmet>
        <div className="Login">
          <div className='error' style={errorStyle}>
          {displayError()}
          </div>
          <img src={logo} alt="fit workout routine logo" width="250" height="140"
            style = {{
              'padding' : '18px'
            }}
          />
          <React.Fragment>
              <form onSubmit={handleSubmit}>
                  <TextField id="email" label="Email" variant="outlined" type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    color="primary" 
                    autoFocus={true}
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
                  <br/>
                  <Button variant="contained" type="submit" disabled={disabled()}>
                    Login
                  </Button>
                  <br/>
                  <br/>
                  <Footer/>
              </form>
          </React.Fragment>
        </div>
      </MainCard>
    );
  }
    