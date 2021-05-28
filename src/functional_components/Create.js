import React from 'react';
import MainTabs from './MainTabs';
import Container from '@material-ui/core/Container';
import Steps from './Steps';
import { makeStyles } from '@material-ui/core/styles';
import  CssBaseline from  '@material-ui/core/CssBaseline';

const useStyles = makeStyles({
  container: {
      marginTop: '32px',
      paddingTop: '4px',
      textAlign: 'center',
      backgroundColor: '#131416',
      height: 'auto',
      color: 'white'
  }
});

export default function Create() {
  const classes = useStyles();
  return (
    <div>
      <MainTabs/>
      <CssBaseline />
        <Container maxWidth="md" className={classes.container}>
          <Steps/>
        </Container>
    </div>
  );
}