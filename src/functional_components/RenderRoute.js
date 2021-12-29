import Login from './Login';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FindWorkouts from './FindWorkouts';
import MyWorkouts from './MyWorkouts';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from  '@material-ui/core/CssBaseline';
import MainTabs from './MainTabs';
import ResetPassword from './ResetPassword';
import Error from './Error'
import LandingPage from './LandingPage';

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
                    <Route component={LandingPage}/>
                </Switch>
            </>
        );
    }
}