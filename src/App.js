import { useHistory } from "react-router";

function App(props) {
  const history = useHistory();
  let loggedIn = true;
  const validateRoute = () => {
    if(loggedIn){
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
