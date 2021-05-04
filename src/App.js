import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import MainTabs from './functional_components/MainTabs';

function App() {
  const history = useHistory();
  const location = useLocation();

  const validateToken = () => {

    if(typeof location.state === 'undefined'){
      return false;
    } else{
      return true;
    }
  }

  const validateRoute = () => {
    if(validateToken()){
      return(
        <div className="App">
            <MainTabs/>
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
