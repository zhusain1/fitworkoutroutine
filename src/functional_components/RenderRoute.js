import MainCard from './MainCard';
import Login from './Login';
import { Route } from 'react-router-dom';
import Create from './Create';
import Edit from './Edit';
import EditWorkout from './EditWorkout';
import FindWorkouts from './FindWorkouts';
import MyWorkouts from './MyWorkouts';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from  '@material-ui/core/CssBaseline';
import MainTabs from './MainTabs';

const useStyles = makeStyles({
    container: {
        marginTop: '32px',
        paddingTop: '4px',
        textAlign: 'center',
        backgroundColor: '#131416',
        height: 'auto',
        color: 'white'
    }
});

export default function RenderRoute (){
    const classes = useStyles();
    if(sessionStorage.getItem('token')){
        return (
            <>
                <CssBaseline />
                    <MainTabs/>
                    <Container maxWidth="md" className={classes.container}>
                        <Route exact path="/createWorkout" component={Create}/>
                        <Route exact path="/edit" component={Edit}/>
                        <Route exact path="/edit/workout" component={EditWorkout}/>
                        <Route exact path="/workouts" component={FindWorkouts}/>
                        <Route exact path="/user/workouts" component={MyWorkouts}/>
                        <Route exact path="/">
                            <FindWorkouts />
                        </Route>
                    </Container>
                
            </>
        );
    } else{
        return(
            <MainCard>
                <Route path="/">
                    <Login />
                </Route>
            </MainCard>
        );
    }
}