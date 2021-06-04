import React, { useEffect }  from 'react';
import api from '../util/api'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Exercise from './Exercise';


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
            setWorkouts(res.data)
        })
        .catch((error) => {
            console.log(error);
        });
        }, []);

    const classes = useStyles();

    const displayExercise = (workoutId) => {
        sessionStorage.setItem('workout', JSON.stringify(selectWorkoutById(workoutId)));
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
        if(sessionStorage.getItem('workout') || display){
          let savedWorkout = JSON.parse(sessionStorage.getItem('workout'));
          return(
            <React.Fragment>          
                <Exercise workout = {savedWorkout}/>
            </React.Fragment>);
        } else {
            if(workouts.length > 0){
                return (
                    <div>
                        <h2> My Workouts </h2>
                        <Grid container justify = "center">
                        <div>
                            <List className={classes.list}>
                                {workouts.map((workout) =>
                                    <ListItem key={workout.workoutId}>
                                        <Link style={link} className="links" onClick={() => displayExercise(workout.workoutId)}>
                                            {workout.workoutName}
                                        </Link>
                                    </ListItem>
                                )}
                            </List>
                        </div>
                        </Grid>
                    </div>);
            } else{
                return(
                    <h2> My Workouts </h2>
                    no workouts chosen
                );
            }
          
        } 
      }
    
    
    return (
        <div>
            {chooseExercise()} 
        </div> 
    );
}