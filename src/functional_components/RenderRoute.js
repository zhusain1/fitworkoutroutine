import MainCard from './MainCard';
import Login from './Login';
import { Route } from 'react-router-dom';
import Create from './Create';
import Edit from './Edit';
import EditWorkout from './EditWorkout';
import FindWorkouts from './FindWorkouts';

export default function RenderRoute (){
    if(sessionStorage.getItem('token')){
        return (
            <>
                <Route exact path="/createWorkout" component={Create}/>
                <Route exact path="/edit" component={Edit}/>
                <Route exact path="/edit/workout" component={EditWorkout}/>
                <Route exact path="/workouts" component={FindWorkouts}/>
                <Route exact path="/">
                    <Create />
                </Route>
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