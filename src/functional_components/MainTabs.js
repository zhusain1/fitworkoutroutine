import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Header from './Header';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@mui/material/IconButton';
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
  },
  menu: {
    backgroundColor: '#131416',
    color: 'white',
  },
}));

export default function MainTabs() {
  const classes = useStyles();

  const history = useHistory();
  const [width, setWidth] = React.useState(window.innerWidth);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if((history.location.pathname !== "/" && history.location.pathname !== "/workouts" && history.location.pathname !== "/user/workouts") && sessionStorage.getItem('workout')){
    sessionStorage.removeItem('workout');
  }


  const renderTabs = () => {
    
    if(width > 620){
      return( 
        <>
          <Tabs value={history.location.pathname !== "/"
                        ? history.location.pathname
                        : routes[0]} className={classes.tab} centered>
            <Tab label="Workouts" component={Link} to={routes[0]} value={routes[0]}  />
            <Tab label="My Workouts" component={Link} to={routes[1]} value={routes[1]}/>
            <Tab label="Create" component={Link} to={routes[2]} value={routes[2]} />
            <Tab label="Edit" component={Link} to={routes[3]} value={routes[3]}/>
            <Tab label="Account" component={Link} to={routes[4]} value={routes[4]}/>
          </Tabs>
          <br/>
          <br/>
        </>
      );
    } else{
      return (
        <div>
          <IconButton aria-label="menu" size="large" onClick={handleClick}>
            <MenuIcon fontSize="inherit" color='primary'/>
          </IconButton>
          <Menu
            id="menu"
            aria-labelledby="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
          <Tabs value={history.location.pathname !== "/"
                    ? history.location.pathname
                    : routes[0]} className={classes.tab} centered orientation="vertical" className={classes.menu}>
            <Tab label="Workouts" component={Link} to={routes[0]} value={routes[0]}  onClick={handleClose}  />
            <Tab label="My Workouts" component={Link} to={routes[1]} value={routes[1]} onClick={handleClose}/>
            <Tab label="Create" component={Link} to={routes[2]} value={routes[2]}  onClick={handleClose}/>
            <Tab label="Edit" component={Link} to={routes[3]} value={routes[3]} onClick={handleClose}/>
            <Tab label="Account" component={Link} to={routes[4]} value={routes[4]} onClick={handleClose}/>
          </Tabs>
          </Menu>
        </div>
      );
    }
    
    
  }

  const routes = ["/workouts", "/user/workouts", "/createWorkout", "/edit", "/account"];
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

  useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleWindowResize);

      // Return a function from the effect that removes the event listener
      return () => window.removeEventListener("resize", handleWindowResize);
  }, []);



  return (
      <div className={classes.root}>
        <Header/>
        {renderTabs()}
          {notification > 0 && 
          <div className={classes.progress}>
            <LinearProgress color="secondary" />
            Uploading Video
          </div>}
      </div>
  );
}