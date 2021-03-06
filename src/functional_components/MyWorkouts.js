import React, { useEffect }  from 'react';
import api from '../util/api'
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Exercise from './Exercise';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const link = {
    color: 'white',
    fontSize: '16px',
    textDecoration: 'none',
}
  
const table = {
    color: 'white !important',
    padding: '12px !important'
};

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
              }, 1200);
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
                        <Grid container justifyContent = "center">
                        <div>
                            {workouts.length > 0 && 
                            <TableContainer>
                                <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={table}> <b>Workout Type</b> </TableCell>
                                        <TableCell align="left" style={table}> <b>Workout Name</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {workouts.map((workout) =>
                                        <TableRow key={workout.workoutId}>
                                            <TableCell component="th" scope="row" style={table}>
                                                {workout.workoutType}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Link style={link} className="links" onClick={() => displayExercise(workout.workoutId)}>
                                                    {workout.workoutName}
                                                </Link>
                                            </TableCell>
                                    </TableRow>
                                    )}
                                </TableBody>
                                </Table>
                          </TableContainer>}
                          <br/>
                          <br/>
                        </div>
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