import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import apiVideo from '../util/apiVideo';
import ErrorMessage from './ErrorMessage';
import NotificationContext from '../global/NotificationContext';

const useStyles = makeStyles({
  button: {
    color: 'white',
    backgroundColor: '#292929',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:focus': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:active': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:disabled': {
      color: 'white'
    },
  }
});

export default function CreateWorkout(props) {

  const classes = useStyles();
  const [workoutId] = React.useState(props.workout_id);
  const [workoutUrl, setWorkoutUrl] = React.useState(null);
  const [error, setError] = React.useState(false);  
  const { setNotification } = useContext(NotificationContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // refactor to createWorkoutVideoCall
    // Then make a call to video server to upload video and assoociate with workout
    if (workoutUrl === null){
      console.log('Not submitting request, there is no video present')
      setError(true);
    } else{
        createVideoCall();
    }
  }

  const createVideoCall = () => {
    var formData = new FormData();

    formData.append('workout_id', workoutId);
    formData.append('file', workoutUrl);

    console.log(workoutId)

    apiVideo({
      method: 'post',
      url: '/api/upload',
      data: formData
    }).then( res => {
      console.log(res.data);
      setWorkoutUrl(null);
      setError(false);
      setNotification(workoutId)
      props.callback();
    })
    .catch((error) => {
      console.log(error);
      setError(true);
      setWorkoutUrl(null);
    });

  }

  const renderError = () => {
    if(error){
      return(
        <>
          <ErrorMessage error="Could not upload workout"/>
        </>
      );
    }
  }

  return (
    <div>
      <React.Fragment>
          {renderError()}
          <h2> Create Exercise</h2> 
          <form onSubmit={handleSubmit}>
            <input type="file" id="upload" name="filename" onChange={e => setWorkoutUrl(e.target.files[0])}/>
            <br/>
            <br/>
            <Button variant="contained" type="submit" className={classes.button}>
                Upload
            </Button>
          </form>
          <br/>
          <br/>
      </React.Fragment>
    </div>
  );
}