import Login from './Login';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FindWorkouts from './FindWorkouts';
import MyWorkouts from './MyWorkouts';
import Account from './Account';
import Container from '@mui/material/Container';
import CssBaseline from  '@mui/material/CssBaseline';
import MainTabs from './MainTabs';
import ResetPassword from './ResetPassword';
import Error from './Error'
import LandingPage from './LandingPage';
import Signup from './Signup'; 
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import Privacy from './Privacy';
import Eula from './Eula';

export default function RenderRoute (){
    const stripePromise = loadStripe('pk_test_dWg4X4LaroVznfa7oAOwNoum00vzNnt3hI');

    if(sessionStorage.getItem('token')){
        return (
            <>
                <CssBaseline />
                        <MainTabs/>
                        <Container maxWidth="md"
                            sx={{
                                marginTop: '32px',
                                paddingTop: '4px',
                                textAlign: 'center',
                                backgroundColor: '#131416',
                                height: 'auto',
                                color: 'white',
                            }}
                        >
                            <Switch>
                                <Route exact path="/workouts" component={FindWorkouts}/>
                                <Route exact path="/user/workouts" component={MyWorkouts}/>
                                <Route exact path="/user/account">
                                    <Elements stripe={stripePromise}>
                                         <Account/>
                                    </Elements>
                                </Route>
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
                    <Route exact path="/privacy" component={Privacy}/> 
                    <Route exact path="/eula" component={Eula}/> 
                    <Route component={LandingPage}/>
                </Switch>
            </>
        );
    }
}