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
                                <br/>
                                <br/>
                                <br/>
                                <a href='https://apps.apple.com/us/app/fit-workout-routine/id6444746073?itsct=apps_box_badge&itscg=30200'>
                                    <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83&releaseDate=1677801600" alt="Download on the App Store"
                                        style={{
                                            paddingLeft:'16px'
                                        }}
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
        </div>
    );
}