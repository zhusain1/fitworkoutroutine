import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

export default function MainCard({children}) {
  return (
    <Container maxWidth="sm">   
      <Card variant="outlined">
          <CardContent>
            <Typography component="div">
              {children}
            </Typography>
          </CardContent>
        </Card>
    </Container>
  );
}