import React from 'react';
import logo from '../img/logo-transparent.png'
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';

export default function Header() {
    const history = useHistory();

    const buttonStyle = {
      color: 'white',
      float: 'right',
      marginRight: '60px',
      marginTop: '70px',
      width: '150px',
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
    };

    const headerStyle = {
        marginLeft: '30px',
        marginTop: '20px'
    };

    const logout = (e) => {
        sessionStorage.clear();
        history.push('/');
    };

    return (
    <div>
        <img src={logo} alt="logo" width="250" height="120" className='logo' style={headerStyle}/>
        <Button variant="contained" type="submit" style={buttonStyle} onClick={logout} className='logout'>
          Logout
        </Button>   
    </div>
    );
}