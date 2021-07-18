import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from './Header';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import NotificationContext from '../global/NotificationContext';
import LinearProgress from '@material-ui/core/LinearProgress';
import api from '../util/api'

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
  progress: {
    width: '30%',
    marginLeft: '15px'
  }
}));

export default function MainTabs() {
  const classes = useStyles();

  const history = useHistory();

  if((history.location.pathname !== "/" && history.location.pathname !== "/workouts" && history.location.pathname !== "/user/workouts") && sessionStorage.getItem('workout')){
    sessionStorage.removeItem('workout');
  }

  const routes = ["/workouts", "/user/workouts", "/createWorkout", "/edit"];
  const { notification, setNotification } = useContext(NotificationContext)

  useEffect(() => {
    if(notification > 0){
      let url = `/workout/pollWorkoutVideoUpload/${notification}`;
      setInterval(() => {
        api({
            method: 'get',
            url: url,
        }).then(res => {
            console.log(res.data);
            if(res.data){
              setNotification(0);
            }})
          .catch((error) => {
              console.log(error);
          })}, 5000)
    }
  }, [setNotification, notification]);

  return (
      <div className={classes.root}>
        <Header/>
          <Tabs value={history.location.pathname !== "/"
                        ? history.location.pathname
                        : routes[0]} className={classes.tab} centered>
            <Tab label="Workouts" component={Link} to={routes[0]} value={routes[0]}  />
            <Tab label="My Workouts" component={Link} to={routes[1]} value={routes[1]}  />
            <Tab label="Create" component={Link} to={routes[2]} value={routes[2]} />
            <Tab label="Edit" component={Link} to={routes[3]} value={routes[3]}/>
          </Tabs>
          <br/>
          <br/>
          {notification > 0 && 
          <div className={classes.progress}>
            <LinearProgress color="secondary" />
            Uploading Video
          </div>}
      </div>
  );
}