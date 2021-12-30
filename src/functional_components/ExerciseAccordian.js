import React, { useEffect }  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactHtmlParser from 'react-html-parser';
import { Stream } from "@cloudflare/stream-react";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tag from './Tag';
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