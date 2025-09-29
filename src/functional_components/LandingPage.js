import logo from '../img/logo-transparent.png';
import brand from '../img/app_screenshot.png';
import instagram from '../img/instagram.png';
import tiktok from '../img/tiktok.png';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Item from '@mui/material/Stack'
import MainCard from './MainCard';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

export default function LandingPage() {
    return (
        <div className="main">
            <img src={logo} className="logo" alt="fit workout routine logo" width="180" height="100" />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    direction={{ xs: "column", md: "row", lg: 'row' }} // column on mobile, row on desktop
                    spacing={2}
                >
                    <Stack
                        alignItems="center"
                        justifyContent={{ xs: "center", sm: "center", md: "center", lg: "left" }}
                    >
                        <Item>
                            <div className="mainDescription" style={{padding: '8px'}}>
                                <br/>
                                <Typography style={{ color: 'white', maxWidth: '370px', textAlign: 'left', padding: '4px', fontSize: '18px', fontWeight: 'normal' }}>
                                    <i> Plan your workouts smarter. 🧠 </i>
                                </Typography>
                                <br/>
                                <Typography style={{ color: 'white', maxWidth: '370px', textAlign: 'left', padding: '4px', fontSize: '18px', fontWeight: 'bold' }}>
                                    ✅ PLAN WORKOUTS
                                </Typography>
                                <Typography style={{ color: 'white', maxWidth: '370px', textAlign: 'left', padding: '4px', fontSize: '18px', fontWeight: 'bold' }}>
                                    ✅ TRACK PROGRESS
                                </Typography>
                                <Typography style={{ color: '#E01A4F', maxWidth: '370px', textAlign: 'left', padding: '4px', fontSize: '18px', fontWeight: 'bold' }}>
                                    ✅ MAKE GAINS 💪
                                </Typography>
                                <br/>
                                <a href='https://apps.apple.com/us/app/fit-workout-routine/id6444746073?itsct=apps_box_badge&itscg=30200'>
                                    <img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/white/en-us?size=250x83&releaseDate=1677801600" alt="Download on the App Store"/>
                                </a>
                                <br/>
                                <br/>
                                <br/>
                                <Typography style={{ color: 'white', maxWidth: '370px', textAlign: 'left', padding: '4px', fontSize: '18px' }}>
                                    Average 4.5 ⭐️ Rating on the App Store
                                </Typography>
                                <br/>
                                <Typography style={{ color: 'white', maxWidth: '370px', textAlign: 'left', padding: '4px', fontSize: '14px' }}>
                                    <i>
                                        "I always had trouble finding the right app for my fitness program. 
                                        Thanks to this app, I now have a way to continue pursuing my goal."
                                    </i>
                                </Typography>
                                <br/>
                                <Typography style={{ color: 'white', maxWidth: '370px', textAlign: 'left', padding: '4px', fontSize: '14px' }}>
                                    <i>
                                        "Love the app, the interface is smooth and easy to use!"
                                    </i>
                                </Typography>
                            </div>
                        </Item>
                    </Stack>
                    <Stack
                        justifyContent={{ xs: "center", sm: "center", md: "center", lg: "flex-start" }}
                        alignItems={{ xs: "center", sm: "center", md: "center", lg: "flex-start" }}
                    >
                        <Item
                            sx={{
                            paddingLeft: { xs: 0, md: 0, lg: "60px" },
                            display: "flex",
                            justifyContent: { xs: "center", lg: "flex-start" } // center on mobile
                            }}
                        >
                            <div className="main_bg">
                            <img
                                src={brand}
                                className="main_marketing"
                                alt="fit workout routine background"
                                width="260"
                                height="580px"
                            />
                            </div>
                        </Item>
                    </Stack>
                </Stack>
            </Box>
            <Stack
                    direction={{xs: "column", sm: "column", md: "column", lg: "row", xl:"row"}}
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    sx={{paddingTop: '180px'}}
                >
                    <Item>
                        <MainCard>
                            <h3>Workout Planning 🗓️</h3>
                            <p>
                                Schedule workout routines in advance and get reminders to stay on track with your fitness goals.
                            </p>
                        </MainCard>
                    </Item>
                    <Item>
                        <MainCard>
                            <h3>Log & Track 📕</h3>
                            <p>
                                Intuitively log your sets, reps, and weight used to track your progress. Visually see graphs of your progress over time.
                            </p>
                        </MainCard>
                    </Item>
                     <Item>
                        <MainCard>
                            <h3>Video Tutorials ▶️</h3>
                            <p>
                                Get guidance on proper form and technique from experienced fitness trainers with high-quality video tutorials for each exercise.
                            </p>
                        </MainCard>
                    </Item>
                </Stack>
                <Box display="flex" justifyContent="center" gap={2} sx={{paddingTop: '80px'}}>
                    <IconButton
                        key='Instagram'
                        component="a"
                        href={'https://www.instagram.com/fitworkoutapp'}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            padding: 0,
                            "&:hover img": { transform: "scale(1.1)" },
                        }}
                    >
                        <img
                            src={instagram}
                            alt='@fitworkoutapp instagram'
                            width={40}
                            height={40}
                            style={{ transition: "transform 0.2s" }}
                        />
                    </IconButton>
                    <IconButton
                        key='Tiktok'
                        component="a"
                        href={'https://www.tiktok.com/@fitworkoutapp'}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            padding: 0,
                            "&:hover img": { transform: "scale(1.1)" },
                        }}
                    >
                        <img
                            src={tiktok}
                            alt='@fitworkoutapp tiktok'
                            width={40}
                            height={40}
                            style={{ transition: "transform 0.2s" }}
                        />
                    </IconButton>
                </Box>
                <Stack style={{paddingTop: '100px', paddingBottom: '50px'}}>
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
        </div>
    );
}