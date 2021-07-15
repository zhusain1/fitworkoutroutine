import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactHtmlParser from 'react-html-parser';
import ReactHlsPlayer from 'react-hls-player';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import api from '../util/api';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    backgroundColor: '#131416',
    color: 'white'
   }
}));

export default function ExerciseAccordian(props) {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(false);

  const saveWorkout = (checked) => {

      setChecked(checked);
  
      const request = {
        email: props.workout.email,
        workout_id: props.workout.workoutId
      }

      let url = '/workout/removeWorkoutFromUser'
      let method = 'delete'

      if(checked){
        url = '/workout/addWorkoutToUser';
        method = 'post'
      } 

      api({
          method: method,
          url: url,
          data: request
      }).then( res => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleChange = (event) => {
    saveWorkout(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} name="checked" />}
        label="Saved to My Workouts"
      />
      <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='primary'/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h2>{props.workout.workoutName}</h2>
        </AccordionSummary>
        <AccordionDetails>
            <div className='description' style={{textAlign: 'left'}}>
            { ReactHtmlParser(props.workout.workoutDescription) }
            <small> Created by: {props.workout.email} </small>
            </div>
        </AccordionDetails>
      </Accordion>
        <br/>
        <ReactHlsPlayer
                src= {`https://videodelivery.net/${props.workout.workoutUrl}/manifest/video.m3u8`}
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
        />
        
        <br/>
    </div>
  );
}