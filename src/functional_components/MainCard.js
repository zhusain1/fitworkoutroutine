import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: 200,
    width: 600,
    textAlign: 'center',
    height: '72vh',
    color: 'white',
    backgroundColor: '#131416',
    boxShadow: '0 -1px 1px #131416',
    '@media (min-width: 1300px)': {
      height: '50vh'
    },
  },
  grid: {
      paddingTop: '6vh'
  }
});

export default function MainCard({children}) {
  const classes = useStyles();

  return (
    <Grid
        container
        justify="center"
        className={classes.grid}
    >        
    <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography component="div">
            {children}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}