import React, { useEffect }  from 'react';
import api from '../util/api'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Exercise from './Exercise';
import CircularProgress from '@material-ui/core/CircularProgress';


const link = {
    color: 'white',
    fontSize: '16px',
    textDecoration: 'none',
  }
  
  const useStyles = makeStyles({
    
  });

export default function MyWorkouts() {
    const [workouts, setWorkouts] = React.useState([]);
    const [display, setDisplay] = React.useState(false);

    useEffect(() => {
        api({
            method: 'get',
            url: '/workout/getWorkoutsFromUser',
        }).then( res => {
            setTimeout( () => {
                setWorkouts(res.data)
              }, 1200);
        })
        .catch((error) => {
            console.log(error);
        });
        }, []);

    const classes = useStyles();

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
            console.log(workouts)
            if(workouts.length > 0){
                return (
                    <div>
                        <h2> My Workouts </h2>
                        <Grid container justify = "center">
                        <div>
                            {workouts.length > 0 && 
                            <List className={classes.list}>
                                {workouts.map((workout) =>
                                    <ListItem key={workout.workoutId}>
                                        <Link style={link} className="links" onClick={() => displayExercise(workout.workoutId)}>
                                            {workout.workoutName}
                                        </Link>
                                    </ListItem>
                                )}
                            </List>}
                        </div>
                        </Grid>
                    </div>);
            } 
            return(
                <>
                    <h2> My Workouts </h2>
                    No workouts chosen
                    <br/>
                    <br/>
                    <CircularProgress color="secondary" />
                    <br/>
                    <br/>
                    <br/>
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