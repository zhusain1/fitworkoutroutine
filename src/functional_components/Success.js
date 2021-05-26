import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(() => ({
    root: {
        '&.MuiSnackbar-root': {
            position: 'relative'
        },
        bottom: '4px'
    }
  }));

export default function Success() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} className={classes.root}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          Exercise Created
        </Alert>
      </Snackbar>
    </div>
  );
}