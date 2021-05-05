import App from '../App';
import MainCard from './MainCard';
import Login from './Login';
import { Route } from 'react-router-dom';

export default function RenderRoute (){
    if(sessionStorage.getItem('token')){
        return (
        <Route path="/">
            <App />
        </Route>
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