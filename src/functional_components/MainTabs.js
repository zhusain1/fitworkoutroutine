import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
  }
}));

export default function MainTabs() {
  const classes = useStyles();

  const history = useHistory();

  const routes = ["/createWorkout", "/edit"];
  return (
    <div className={classes.root}>
      <Header/>
      <Tabs value={history.location.pathname !== "/"
                    ? history.location.pathname
                    : routes[0]} className={classes.tab} centered>
        <Tab label="Create" component={Link} to={routes[0]} value={routes[0]}  />
        <Tab label="Edit" component={Link} to={routes[1]} value={routes[1]} />
        <Tab label="Workouts"/>
      </Tabs>
    </div>
  );
}