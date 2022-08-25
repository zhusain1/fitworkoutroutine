import React, { useEffect }  from 'react';
import api from '../util/api'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Exercise from './Exercise';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';

const link = {
    color: 'white',
    fontSize: '16px',
    textDecoration: 'none',
}

const image = {
    cursor: 'pointer',
}
  

export default function MyWorkouts() {
    const [workouts, setWorkouts] = React.useState([]);
    const [display, setDisplay] = React.useState(false);

    useEffect(() => {
        api({
            method: 'get',
            url: '/workout/getWorkoutsFromUser',
        }).then( res => {
            setTimeout( () => {
                const unsorted = res.data;
                unsorted.sort((a, b) => a.workoutType.localeCompare(b.workoutType))
                setWorkouts(unsorted)
              }, 900);
        })
        .catch((error) => {
            console.log(error);
        });
        }, []);

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

    const imageToGif = (workoutUrl) =>{
        const thumbnails = document.getElementsByClassName('thumbnail')
        
        for (const thumbnail of thumbnails) {
          if(thumbnail.src.includes(workoutUrl)){
            let src = thumbnail.src;
            src = src.replace('.jpg', '.gif');
            thumbnail.src = src;
          }
        }
      }
    
      const gifToImage = (workoutUrl) =>{
        const thumbnails = document.getElementsByClassName('thumbnail')
        
        for (const thumbnail of thumbnails) {
          if(thumbnail.src.includes(workoutUrl)){
            let src = thumbnail.src;
            src = src.replace('.gif', '.jpg');
            thumbnail.src = src;
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
            if(workouts.length > 0){
                return (
                    <div>
                        <h2> My Workouts </h2>
                        <Grid container justifyContent = "center">
                            <div>
                                <List>
                                    {workouts.map((workout) =>
                                        <ListItem key={workout.workoutId}>
                                        <Container maxWidth="md" style={{
                                            marginTop: '8px',
                                            textAlign: 'left',
                                            width: 'auto',
                                            backgroundColor: '#262626',
                                            height: 'auto',
                                            color: 'white',
                                            borderRadius: '8px'
                                        }}>
                                            <br/>
                                            <img src={`https://videodelivery.net/${workout.workoutUrl}/thumbnails/thumbnail.jpg?time=6s`} alt="sample" width="400" height="240"
                                            onClick={() => displayExercise(workout.workoutId)} style={ image } className="thumbnail" onMouseOver={() => imageToGif(workout.workoutUrl)}
                                            onMouseOut={() => gifToImage(workout.workoutUrl)}
                                            />
                                            <h3>
                                                {workout.workoutType}
                                            </h3>
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
                          <br/>
                          <br/>
                        </Grid>
                    </div>);
            } 
            return(
                <>
                    <h2> My Workouts </h2>
                    <br/>
                    <Skeleton animation="wave" />
                    <br/>
                    <Skeleton animation="wave" />
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