import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import api from '../util/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Exercise from './Exercise';

const link = {
  color: 'white',
  fontSize: '16px',
  textDecoration: 'none',
}

const useStyles = makeStyles({
  root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
      },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    minWidth: '250px',
    height: '15px',
    textAlign: 'left'
  },
  select: {
    color: 'white',
    minWidth: '250px',
    textAlign: 'left',
    '& .MuiInput-underline::before': {
      borderBottom: '1px solid #F4F3EE',
    },
    '& .MuiInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled)::before': {
      borderBottom: '1px solid #6F0C16'
    },
    '& .MuiSvgIcon-root': {
      color: 'white'
    }
  },
  button: {
    color: 'white',
    backgroundColor: '#292929',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:focus': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:active': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:disabled': {
      color: 'white'
    },
  },
  secondary: {
    color: 'white',
    backgroundColor: 'black',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:focus': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:active': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:disabled': {
      color: 'white'
    }
  },
  container: {
    marginTop: '8px',
    textAlign: 'left',
    width: '300px',
    backgroundColor: '#262626',
    height: 'auto',
    color: 'white'
}
});

export default function FindWorkouts() {
  const [workoutType, setWorkoutType] = React.useState("");
  const [workouts, setWorkouts] = React.useState([]);
  const [display, setDisplay] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const workout = {
      workout_type : workoutType
    }

    api({
      method: 'post',
      url: '/workout/getWorkoutByType',
      data: workout
    }).then( res => {
      setWorkouts(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  const disabled = () => {
    return !workoutType
  }

  const displayExercise = (workoutId) => {
    sessionStorage.setItem('workout', JSON.stringify(selectWorkoutById(workoutId)));
    sessionStorage.setItem('path', window.location.pathname);
    setDisplay(true);
  }

  const selectWorkoutById = (id) => {
    for(let i = 0; i < workouts.length; i++){
        if(workouts[i].workoutId === id){
          return workouts[i];
        }
    }
  }

  const chooseExercise = () => {
    if((sessionStorage.getItem('path') === window.location.pathname && sessionStorage.getItem('workout')) || display){
      let savedWorkout = JSON.parse(sessionStorage.getItem('workout'));
      return(
        <React.Fragment>          
            <Exercise workout = {savedWorkout}/>
        </React.Fragment>);
    } else {
      return (
        <React.Fragment>          
          <h2> Find Workout</h2> 
          <form onSubmit={handleSubmit}>
          <FormControl className={classes.select}>
              <InputLabel id="workout-type" className={classes.select}>
              Focus Workout On
              </InputLabel>
              <Select
              labelId="workout-type"
              id="workout-type-select"
              value={workoutType}
              onChange={e => setWorkoutType(e.target.value)}
              className={classes.select}
              inputProps={{
                  className: classes.select
              }}
              >
              <MenuItem value={'Chest'}>Chest</MenuItem>
              <MenuItem value={'Arms'}>Arms</MenuItem>
              <MenuItem value={'Legs'}>Legs</MenuItem>
              <MenuItem value={'Back'}>Back</MenuItem>
              <MenuItem value={'Abs'}>Abs</MenuItem>
              <MenuItem value={'Shoulders'}>Shoulders</MenuItem>
              <MenuItem value={'Cardio'}>Cardio</MenuItem>
              </Select>
          </FormControl>
          <br/>
          <br/>
          <Button variant="contained" type="submit" className={classes.button} disabled={disabled()}>
              Find
          </Button>
          </form>
          <br/>
          {displayExercises()}
          <br/>
        </React.Fragment>
      );
    } 
  }

  const displayExercises = () => {
    if(workouts.length > 0){
      return(
          <Grid container justify = "center">
            <div>
                <List className={classes.list}>
                    {workouts.map((workout) =>
                        <ListItem key={workout.workoutId}>
                          <Container maxWidth="md" className={classes.container}>
                            <br/>
                            <img src={`https://videodelivery.net/${workout.workoutUrl}/thumbnails/thumbnail.gif?time=6s`} alt="sample" width="240" height="240"/>
                            <br/>
                            <br/>
                            <Link style={link} className="links" onClick={() => displayExercise(workout.workoutId)}>
                                {workout.workoutName}
                            </Link>
                            <br/>
                            <br/>
                          </Container>
                        </ListItem>
                    )}
                </List>
            </div>
          </Grid>
      );
    } 
  }

  const classes = useStyles();

  return (
    <div>
      {chooseExercise()}
    </div>
  );
}