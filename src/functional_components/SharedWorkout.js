import React, { useEffect } from 'react'
import { Button, Link, Typography } from '@mui/material';
import MainCard from './MainCard';
import logo from '../img/logo-transparent.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function SharedWorkout() {

    const history = useHistory();

    const [url, setUrl] = React.useState("");

    const [token, setToken] = React.useState("");

    useEffect(() => {
        const token = history.location.pathname.split('/')[2];

        setToken(token)
        
        const fullUrl = `fitworkoutroutine://workoutplan/${token}`

        setUrl(fullUrl)
    },[url, history, token])

    return (
        <MainCard>
            <Typography component="div">
                <img src={logo} className="logo" alt="fit workout routine logo" width="180" height="100" />
                <h3>Shared Workout</h3>
                <div>
                    A workout has been shared with you. 
                    <br/>
                    <br/>
                    Open in Fit Workout Routine App and view exercises 
                    in 'Weekly Log'.
                    <br/>
                    <br/>
                    <Button href={url}>
                        Open
                    </Button>
                    <br/>
                    <br/>
                    <Link href="/">
                        Cancel
                    </Link>
                </div>
            </Typography>
        </MainCard>
    )
}