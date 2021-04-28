import { useHistory } from "react-router";
import api from './util/api';

function App(props) {
  const history = useHistory();

  const validateLoggedinStatus = () => {
    let loggedIn = false;

    api({
      method: 'get',
      url: '/user/token',
    }).then( res => {
        console.log(res.data)
        loggedIn = true;
      })
      .catch((error) => {
        console.log(error.response.data)
        loggedIn = false;
      });
    return loggedIn;
  }


  const validateRoute = () => {
    if(validateLoggedinStatus()){
      return(
        <div className="App">
            You are logged in
        </div>
      )
    } else{
      history.push('/');
      return null;
    }
  }

  return (
    validateRoute()
  );
}

export default App;
