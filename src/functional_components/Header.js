import React from 'react';
import logo from '../img/logo-transparent.png'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    button: {
      color: 'white',
      float: 'right',
      marginRight: '60px',
      marginTop: '70px',
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
      '@media (max-device-width: 480px)': {
        margin: 'auto',
        float: 'none',
        display: 'block'
      },
    }
  }));

export default function Header() {
    const history = useHistory();

    const headerStyle = {
        marginLeft: '30px',
        marginTop: '20px'
    };

    const classes = useStyles();

    const logout = (e) => {
        sessionStorage.clear();
        history.push('/');
    };

    return (
    <div>
        <img src={logo} alt="logo" width="250" height="120" className='logo' style={headerStyle}/>
        <Button variant="contained" type="submit" className={classes.button} onClick={logout}>
        Logout
        </Button>   
    </div>
    );
}