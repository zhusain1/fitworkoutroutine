import logo from '../img/logo-transparent.png';
import brand from '../img/brand.jpg';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';
import Link from '@mui/material/Link';

export default function LandingPage (){

    const history = useHistory();

    const handleClick = () => {
        history.push('/login');    
    }

    return(
        <div className="main">
                <img src={logo}  className="logo" alt="fit workout routine logo" width="300" height="180"/>
                <br/>
                <div className="main_bg" style={{display:'block'}}>
                    <img src={brand} className="main_marketing" alt="fit workout routine background" width="500" height="380px"/>
                    <div className="mainDescription" style={{marginTop: '20px'}}>
                        <Typography style={{color:'white', maxWidth: '350px'}}>
                            Find and learn new exercises with quality workout video tutorials.
                        </Typography>   
                        <br/>
                        <div className='landingButtonWrapper'>
                            <div style={{
                                'display': 'inline-block'
                            }}>
                                <Button variant="contained" type="submit" onClick={handleClick}
                                    sx = {{
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
                                        }
                                    }}
                                >
                                    Sign in
                                </Button>
                                <Link href="/signup" 
                                sx={{
                                    textDecoration: 'underline',
                                    marginLeft: '12px',
                                    '&:hover': {
                                        textDecoration: 'none',
                                        borderBottom: '2px solid #6F0C16',
                                    },
                                }}
                                >
                                    <Typography display="inline" className='secondaryLanding'>
                                        Create Account
                                    </Typography>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}