import React, { useEffect }  from 'react';
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import api from '../util/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Exercise from './Exercise';
import FilterAccordian from './FilterAccordian';
import EquipmentContext from '../global/EquipmentContext';

const link = {
  color: 'white',
  fontSize: '16px',
  textDecoration: 'none',
}

const image = {
  cursor: 'pointer'
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
    width: 'auto',
    backgroundColor: '#262626',
    height: 'auto',
    color: 'white',
    "@media (max-width: 568px)": {
      '& img': {
        width: '270px',
      },
      width: 'auto'
    }
  }
});

export default function FindWorkouts() {
  const [workoutType, setWorkoutType] = React.useState("");
  const [workouts, setWorkouts] = React.useState([]);
  const [display, setDisplay] = React.useState(false);
  const [workoutTag, setWorkoutTag] = React.useState("All");

  useEffect(() => {
    
    const workout_type = sessionStorage.getItem('workoutType');

    if(workout_type != null){
      setWorkoutType(workout_type)
      sessionStorage.removeItem('workoutType');

      const workout = {
        workout_type : workoutType
      }
  
      api({
        method: 'post',
        url: '/workout/getWorkoutByType',
        data: workout
      }).then( res => {
        setWorkouts(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  }, [workoutType]);

  useEffect(() => {
    
    const workout_type = sessionStorage.getItem('workoutType');

    if(workout_type != null){
      setWorkoutType(workout_type)
      sessionStorage.removeItem('workoutType');

      const workout = {
        workout_type : workoutType
      }
  
      api({
        method: 'post',
        url: '/workout/getWorkoutByType',
        data: workout
      }).then( res => {
        setWorkouts(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  }, [workoutType]);

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
        <EquipmentContext.Provider value= {{workoutTag, setWorkoutTag}}>
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
        </EquipmentContext.Provider>
      );
    } 
  }

  const displayExercises = () => {
    let filteredWorkouts = [];
    console.log(filteredWorkouts)

    if(workoutTag !== "All"){
      workouts.forEach(workout => {
        if (typeof workout.workoutTag !== 'undefined' && workout.workoutTag === workoutTag){
          filteredWorkouts.push(workout);
        }
      });
    } else{
      filteredWorkouts = workouts;
    }

    if(filteredWorkouts.length >= 0){
      return(
          <>
          <FilterAccordian/>
          <Grid container justifyContent = "center">
            <div>
                <List className={classes.list}>
                    {filteredWorkouts.map((workout) =>
                        <ListItem key={workout.workoutId}>
                          <Container maxWidth="md" className={classes.container}>
                            <br/>
                            <img src={`https://videodelivery.net/${workout.workoutUrl}/thumbnails/thumbnail.gif?time=6s`} alt="sample" width="400" height="240"
                            onClick={() => displayExercise(workout.workoutId)} style={ image }
                            />
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
          </>
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