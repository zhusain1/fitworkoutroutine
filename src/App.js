import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import MainTabs from './functional_components/MainTabs';

function App() {
  const history = useHistory();
  const location = useLocation();

  const validateToken = () => {

    if(sessionStorage.getItem('token')){
      return true;
    } else {
      console.log(location);
      return false;
    } 
  }

  const validateRoute = () => {
    if(validateToken()){
      return(
        <div className="App">
            <Create/>
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
