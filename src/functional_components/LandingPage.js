import logo from '../img/logo-transparent.png';
import brand from '../img/brand.jpg';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
    button: {
      color: 'white',
      backgroundColor: '#6F0C16',
      width: '150px',
      borderRadius: '28px',
      '&:hover': {
        backgroundColor: '#292929',
        color: 'white'
      },
      '&:focus': {
        backgroundColor: '6F0C16',
        color: 'white'
      },
      '&:active': {
        backgroundColor: 'black',
        color: 'white'
      },
    },
  }));


export default function LandingPage (){

    const classes = useStyles();
    const history = useHistory();

    const handleClick = () => {
        history.push('/login');    
    }

    return(
        <div className="main">
                <img src={logo}  className="logo" alt="fit workout routine logo" width="450" height="250"/>
                <br/>
                <div className="main_bg" style={{display:'block'}}>
                    <img src={brand} className="main_marketing" alt="fit workout routine background" width="500" height="400px"/>
                    <div className="mainDescription" style={{float:'right', marginTop: '20px'}}>
                        <Typography style={{color:'white', maxWidth: '350px'}}>
                            Find and learn new exercises with quality workout video tutorials.
                        </Typography>   
                        <br/>
                        <Button variant="contained" type="submit" className={classes.button} onClick={handleClick}>
                            Sign in
                        </Button>
                    </div>
                </div>
        </div>
    );
}