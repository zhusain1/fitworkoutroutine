import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: '#6F0C16'
  },
}));

export default function ErrorMessage(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Alert severity="error" variant="filled" className={classes.root}> {props.error} </Alert>
    </div>
  );
}