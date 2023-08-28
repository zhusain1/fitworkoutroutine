import logo from '../img/logo-transparent.png';
import brand from '../img/iphone_landing2.png';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Item from '@mui/material/Stack'
import MainCard from './MainCard';
import Link from '@mui/material/Link';

export default function LandingPage() {
    return (
        <div className="main">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    style={{textAlign:"center"}}
                >
                    <Item>
                        <img src={logo} className="logo" alt="fit workout routine logo" width="300" height="180" />
                    </Item>
                    <Item>
                        <div className="mainDescription" style={{padding: '8px'}}>
                            <Typography style={{ color: 'white', maxWidth: '370px', textAlign: 'center', padding: '4px', fontSize: '18px', fontWeight: 'bold' }}>
                                Spice up your workout by learning new exercises with <br/> Fit Workout Routine.
                            </Typography>
                        </div>
                    </Item>
                    <Item>
                    <br/>
                        <a href='https://apps.apple.com/us/app/fit-workout-routine/id6444746073?itsct=apps_box_badge&itscg=30200'>
                            <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83&releaseDate=1677801600" alt="Download on the App Store"/>
                        </a>


                    <br/>
                        <a href="https://www.producthunt.com/posts/fit-workout-routine?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-fit&#0045;workout&#0045;routine" target="__blank">
                            <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=411220&theme=light" alt="Fit&#0032;Workout&#0032;Routine - IOS&#0032;fitness&#0032;app&#0032;providing&#0032;an&#0032;exercise&#0032;log&#0032;and&#0032;demo&#0032;videos | Product Hunt" style={{width: "250px", height: "54px"}}/>
                        </a>   
                    </Item>
                    <Item>
                        <div className="main_bg">
                            <img src={brand} className="main_marketing" alt="fit workout routine background" width="550" height="550px" />
                        </div>
                    </Item>
                    <br/>
                    <br/>
                    <br/>
                    <Item>
                        <Typography component="div">
                            <h2> Fit Workout Routine Features</h2>
                        </Typography>
                    </Item>
                    <br/>
                    <Item>
                        <Stack
                            direction={{xs: "column", sm: "column", md: "column", lg: "row", xl:"row"}}
                            justifyContent="center"
                            alignItems="center"
                            spacing={3}
                        >
                            <Item>
                                <MainCard>
                                    <h3>Ease of Use</h3>
                                    <p>
                                        Fit Workout Routine is meant to not disrupt your exercise, but be used as a tool to improve your workout sessions. Logging and planning exercises within the app is very intuitive. 
                                    </p>
                                </MainCard>
                            </Item>
                            <Item>
                                <MainCard>
                                    <h3>Beginner Friendly</h3>
                                    <p>
                                        Fit Workout Routine is a great resource for both beginners and experienced gym-goers alike. With a variety of exercises and videos, the app makes it easy to learn and practice new techniques. Beginners can use the app to get guidance while seasoned gym-goers can use it to mix up their workout routine.
                                    </p>
                                </MainCard>
                            </Item>
                            <Item>
                                <MainCard>
                                    <h3>Log & Track</h3>
                                    <p>
                                        Easily search for exercises and workouts based on body part or exercise type with Fit Workout Routine. Once you find the exercises you want to do, you can log your sets, reps, and weight used to track your progress.
                                    </p>
                                </MainCard>
                            </Item>
                        </Stack>
                    </Item>
                    <br/>
                    <br/>
                    <br/>
                    <Item>
                        <div className="Footers" style={{textAlign: 'center'}}>
                            <Typography component="div">
                                <Link href="/eula">EULA</Link> 
                                &nbsp;&nbsp;|&nbsp;&nbsp; 
                                <Link href="/privacy">Privacy Policy</Link> 
                            </Typography>
                        </div>
                    </Item>
                </Stack>
            </Box>
        </div>
    );
}