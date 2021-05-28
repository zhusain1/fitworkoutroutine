import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MainTabs from  './MainTabs';
import api from '../util/api'
import EditWorkout from './EditWorkout';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  root: {
    minWidth: '250px',
    height: '15px',
    textAlign: 'left',  },
  container: {
      marginTop: '32px',
      paddingTop: '4px',
      textAlign: 'center',
      backgroundColor: '#131416',
      height: 'auto',
      color: 'white',
  },
  list: {
    fontSize: 18,
  }
});

export default function Edit() {
  const classes = useStyles();
  const [workouts, setWorkouts] = React.useState([]);
  const [displayForm, setDisplayForm] = React.useState(false);
  const [chosenWorkout, setChosenWorkout] = React.useState("");

  const displayEditForm = (value) => {
    setDisplayForm(true);
    setChosenWorkout(value);
  }

  const removeWorkout = (value) => {
    
    const url = '/workout/deleteWorkout/' + value
    api({
        method: 'delete',
        url: url
    }).then( res => {
        setWorkouts(res.data)
    })
    .catch((error) => {
        console.log(error);
    });
  }

  const chooseDisplay = () => {
    if(displayForm){
        const workout = selectWorkoutById(chosenWorkout);
        return(
            <EditWorkout workout = {workout} />
        );
    } else{
        return displayList();
    }
  }

  const selectWorkoutById = (id) => {
    for(let i = 0; i < workouts.length; i++){
        if(workouts[i].workoutId === id){
            return workouts[i];
        }
    }
  }

  useEffect(() => {
    api({
        method: 'get',
        url: '/workout/userWorkouts',
    }).then( res => {
        setWorkouts(res.data)
    })
    .catch((error) => {
        console.log(error);
    });
  }, []);

  const displayList = () => {
    return (
        <div className="list">
          <h2> Find Exercise To Edit </h2> 
            <List className={classes.list}>
                {workouts.map((workout) =>
                    <ListItem key={workout.workoutId}>
                        <IconButton aria-label="edit" value={workout.workoutId} onClick={() => displayEditForm(workout.workoutId)}>
                            <EditIcon fontSize="large" color='primary' />
                        </IconButton>
                        <IconButton aria-label="delete" value={workout.workoutId} onClick={() => removeWorkout(workout.workoutId)}>
                            <DeleteIcon fontSize="large" color='secondary' />
                        </IconButton>
                        <span>
                            {workout.workoutName}
                        </span>
                    </ListItem>
                )}
            </List>
        </div>
        
    ); 
  }
  
  
  return (
    <div>
        <MainTabs/>
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
            {chooseDisplay()}
        </Container>
        </React.Fragment>
    </div>
  );
}