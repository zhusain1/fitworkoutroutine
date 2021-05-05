import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles({
  root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
      },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    minWidth: '250px',
    height: '15px',
    textAlign: 'left'
  },
  container: {
      marginTop: '32px',
      paddingTop: '4px',
      textAlign: 'center',
      backgroundColor: '#131416',
      height: '45vh'
  },
  select: {
    color: 'white',
    minWidth: '250px',
    height: '50px',
    textAlign: 'left',
    '& .MuiInput-underline::before': {
      borderBottom: '1px solid #F4F3EE',
    },
    '& .MuiInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled)::before': {
      borderBottom: '1px solid #6F0C16'
    },
    '& .MuiSvgIcon-root': {
      color: 'white'
    }
  }
});

export default function Create() {
  const classes = useStyles();
  const [workoutType, setWorkoutType] = React.useState('');


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <h2> Create Exercise</h2> 
          <TextField id="title" label="Exercise Title" variant="filled" type="text"
          color="primary" className={classes.root}
              inputProps={{
                  className: classes.root
              }}
              InputLabelProps={{
                className: classes.root
              }}
          />
          <br/>
          <br/>
          <br/>
          <br/>
          <FormControl className={classes.select}>
            <InputLabel id="workout-type" className={classes.select}>
              Focus Workout On
            </InputLabel>
            <Select
              labelId="workout-type"
              id="workout-type-select"
              value={workoutType}
              onChange={e => setWorkoutType(e.target.value)}
              className={classes.select}
              inputProps={{
                className: classes.select
              }}
            >
              <MenuItem value={'Chest'}>Chest</MenuItem>
              <MenuItem value={'Arms'}>Arms</MenuItem>
              <MenuItem value={'Legs'}>Legs</MenuItem>
              <MenuItem value={'Back'}>Back</MenuItem>
              <MenuItem value={'Abs'}>Abs</MenuItem>
              <MenuItem value={'Cardio'}>Cardio</MenuItem>
            </Select>
          </FormControl>
          <br/>
          <br/>
          <br/>
          <br/>
          <input type="file" id="upload" name="filename" />
          <br/>
          <br/>
      </Container>
    </React.Fragment>
  );
}