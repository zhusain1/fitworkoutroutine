import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Privacy from './Privacy';
import Eula from './Eula';

export default function RenderRoute (){
    return(
        <Switch>
        <Route exact path="/privacy" component={Privacy}/> 
        <Route exact path="/eula" component={Eula}/> 
        <Route component={LandingPage}/>
    </Switch>
    );
}