import React from 'react';
import Alert from '@mui/material/Alert';

export default function ErrorMessage(props) {
  return (
    <div>
      <Alert severity="error" variant="filled"
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          backgroundColor: '#6F0C16',
          paddingLeft: '12px',
          marginTop: '24px'
        }}
      > {props.error} </Alert>
    </div>
  );
}