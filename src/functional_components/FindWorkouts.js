import React, { useEffect }  from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import api from '../util/api';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Exercise from './Exercise';
import EquipmentContext from '../global/EquipmentContext';
import Filter from './Filter';

const link = {
  color: 'white',
  fontSize: '16px',
  textDecoration: 'none',
}

const image = {
  cursor: 'pointer',
}

export default function FindWorkouts() {
  const [workoutType, setWorkoutType] = React.useState("");
  const [workouts, setWorkouts] = React.useState([]);
  const [display, setDisplay] = React.useState(false);
  const [workoutTag, setWorkoutTag] = React.useState("All");

  useEffect(() => {
    if(sessionStorage.getItem('workoutType')){

      let workoutType = sessionStorage.getItem('workoutType') 

      setWorkoutType( workoutType );

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
  },[workoutType]);
 

  const handleType = (e) => {

    if(e.target.value.length > 0){
      const workout = {
        workout_type : e.target.value
      }
      
      setWorkoutType(e.target.value)

      sessionStorage.setItem('workoutType', e.target.value);
  
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
            <FormControl
              sx={{
                padding: '12px',
                color: 'white',
                minWidth: '250px',
                textAlign: 'left'
              }}
              variant="standard"
            >
                <InputLabel id="workout-type">
                  Focus Workout On
                </InputLabel>
                <Select
                labelId="workout-type"
                sx={{
                  color: 'white',
                  ':after': {
                    borderBottom: '1px solid #6F0C16'
                  },
                  ':before': {
                    borderBottom: '1px solid white'
                  },
                  minWidth: '250px',
                  textAlign: 'left'
                }}
                id="workout-type-select"
                value={workoutType}
                onChange={handleType}
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
          <br/>
          <Filter/>
          <Grid container justifyContent = "center">
            <div>
                <List>
                    {filteredWorkouts.map((workout) =>
                        <ListItem key={workout.workoutId}>
                          <Container maxWidth="md" style={{
                            marginTop: '8px',
                            textAlign: 'left',
                            width: 'auto',
                            backgroundColor: '#262626',
                            height: 'auto',
                            color: 'white',
                          }}>
                            <br/>
                            <img src={`https://videodelivery.net/${workout.workoutUrl}/thumbnails/thumbnail.gif?time=6s`} alt="sample" width="400" height="240"
                              onClick={() => displayExercise(workout.workoutId)} style={ image } className="thumbnail"
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

  return (
    <div>
      {chooseExercise()}
    </div>
  );
}