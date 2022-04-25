import Login from './Login';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FindWorkouts from './FindWorkouts';
import MyWorkouts from './MyWorkouts';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';
import CssBaseline from  '@mui/material/CssBaseline';
import MainTabs from './MainTabs';
import ResetPassword from './ResetPassword';
import Error from './Error'
import LandingPage from './LandingPage';
import Signup from './Signup'; 

const useStyles = makeStyles({
    container: {
        marginTop: '32px',
        paddingTop: '4px',
        textAlign: 'center',
        backgroundColor: '#131416',
        height: 'auto',
        color: 'white'
    }
});

export default function RenderRoute (){
    const classes = useStyles();
    if(sessionStorage.getItem('token')){
        return (
            <>
                <CssBaseline />
                        <MainTabs/>
                        <Container maxWidth="md" className={classes.container}>
                            <Switch>
                                <Route exact path="/workouts" component={FindWorkouts}/>
                                <Route exact path="/user/workouts" component={MyWorkouts}/>
                                <Route exact path="/">
                                    <FindWorkouts />
                                </Route>
                                <Route component={Error}/>
                            </Switch>
                        </Container>
            </>
        );
    } else{
        return(
            <>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/forgotpassword" component={ResetPassword}/>
                    <Route exact path="/signup" component={Signup}/> 
                    <Route component={LandingPage}/>
                </Switch>
            </>
        );
    }
}