import React, { useEffect }  from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Stream } from "@cloudflare/stream-react";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tag from './Tag';
import api from '../util/api';


export default function ExerciseAccordian(props) {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {

    const request = {
      email: props.workout.email,
      workout_id: props.workout.workoutId
    }

    api({
        method: 'post',
        url: '/workout/workoutFromUser',
        data: request
    }).then( res => {
      setChecked(res.data)
    })
    .catch((error) => {
        console.log(error);
    });
    },[ props.workout.email,  props.workout.workoutId]);

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
      <Accordion sx={{
          width: '100%',
          backgroundColor: '#131416',
          color: 'white'
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='primary'/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h2>{props.workout.workoutName}</h2>
        </AccordionSummary>
        <AccordionDetails>
            <div className='description' style={{textAlign: 'left'}}>
            { props.workout.workoutDescription }
            <h3>Equipment needed: <Tag value={props.workout.workoutTag} toggle={true} /> </h3> 
            <small> Created by: {props.workout.email} </small>
            </div>
        </AccordionDetails>
      </Accordion>
        <br/>
        <Stream controls src={props.workout.workoutUrl} />
        <br/>
    </div>
  );
}