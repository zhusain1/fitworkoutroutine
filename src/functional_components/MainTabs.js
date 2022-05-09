import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

export default function MainTabs() {

  const history = useHistory();

  if((history.location.pathname !== "/" && history.location.pathname !== "/workouts" && history.location.pathname !== "/user/workouts"
  && history.location.pathname !== "/user/account") && sessionStorage.getItem('workout')){
    sessionStorage.removeItem('workout');
  }


  const determineRoutes = () => {
    if(history.location.pathname !== '/'){
      if(history.location.pathname !== routes[0] && history.location.pathname !== routes[1] && history.location.pathname !== routes[2]){ // not a valid path fallback
        return routes[0];
      }
      else{
        return history.location.pathname;
      }

    } else{
      return routes[0];
    }
  }

  const routes = ["/workouts", "/user/workouts", "/user/account"];

 

  return (
      <div>
        <Header/>
          <Tabs value={determineRoutes()} sx={{
            '.MuiTabs-indicator': {
              backgroundColor: '#6F0C16'
            }
          }} centered>
            <Tab label="Workouts" component={Link} to={routes[0]} value={routes[0]}  />
            <Tab label="My Workouts" component={Link} to={routes[1]} value={routes[1]}  />
            <Tab label="Account" component={Link} to={routes[2]} value={routes[2]}  />
          </Tabs>
      </div>
  );
}