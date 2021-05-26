import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    paddingTop: 30,
    marginTop: 80,
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#131416',
    boxShadow: '0 -1px 1px #131416',
  }
});

export default function MainCard({children}) {
  const classes = useStyles();

  return (
    <Container maxWidth="sm">   
      <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography component="div">
              {children}
            </Typography>
          </CardContent>
        </Card>
    </Container>
  );
}