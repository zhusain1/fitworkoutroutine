import React from 'react';
import { makeStyles } from '@mui/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
  root: { 
    flexGrow: 1,
    backgroundColor: 'black',
    color: 'white',
  },
  tab: {
    '& .PrivateTabIndicator-colorSecondary-6': {
      backgroundColor: '#6F0C16'
    }
  },
  logout: {
    color: 'white',
    backgroundColor: '#131416',
    border: 'none',
    '&:hover': {
      backgroundColor: '#292929',
      color: 'white'
    },
  },
}));

export default function MainTabs() {
  const classes = useStyles();

  const history = useHistory();

  if((history.location.pathname !== "/" && history.location.pathname !== "/workouts" && history.location.pathname !== "/user/workouts") && sessionStorage.getItem('workout')){
    sessionStorage.removeItem('workout');
  }


  const determineRoutes = () => {
    if(history.location.pathname !== '/'){
      if(history.location.pathname !== routes[0] && history.location.pathname !== routes[1]){ // not a valid path fallback
        return routes[0];
      }
      else{
        return history.location.pathname;
      }

    } else{
      return routes[0];
    }
  }

  const routes = ["/workouts", "/user/workouts"];

  return (
      <div className={classes.root}>
        <Header/>
          <Tabs value={determineRoutes()} className={classes.tab} centered>
            <Tab label="Workouts" component={Link} to={routes[0]} value={routes[0]}  />
            <Tab label="My Workouts" component={Link} to={routes[1]} value={routes[1]}  />
          </Tabs>
      </div>
  );
}