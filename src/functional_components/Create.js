import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
      height: '35vh'
  }
});

export default function Create() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" className={classes.container}>
        <h3> Create Exercise</h3> 
        <input type="file" id="upload" name="filename" />
        <br/>
        <br/>
        <form>
          <TextField id="title" label="Exercise Title" variant="filled" type="text"
          color="primary" className={classes.root}
              inputProps={{
                  className: classes.root
              }}
              InputLabelProps={{
                className: classes.root
              }}
          />
        </form>
        
      </Container>
    </React.Fragment>
  );
}