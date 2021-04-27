import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';


const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
      },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    '& .MuiDialog-paper':{
      backgroundColor: '#131416',
      color: 'white'
    }
  },
  textField: {
    minWidth: '250px',
    color: 'white'
  },
  button: {
    color: 'white',
    backgroundColor: '#292929',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:focus': {
      backgroundColor: 'black',
      color: 'white'
    },
    '&:active': {
      backgroundColor: 'black',
      color: 'white'
    },
  },
  link: {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
      borderBottom: '2px solid #6F0C16'
    },
  }
}));

export default function CreateAccount() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  
  /* State */ 
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit form")
    console.log(email)
    console.log(firstName)
    console.log(lastName)
    console.log(password)
  }

  return (
    <div>
      <Link href="/" onClick={handleClickOpen} className={classes.link}>
          Join Now
      </Link>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl"
      className={classes.root}>
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField id="first_name" label="first name" variant="filled" type="text" color="primary"
            value={firstName} onChange={e => setFirstName(e.target.value)}
              inputProps={{
                className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textField
              }}
            />
            <br/>
            <br/>
            <TextField id="last_name" label="last name" variant="filled" type="text" color="primary"
            value={lastName} onChange={e => setLastName(e.target.value)}
              inputProps={{
                className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textField
              }}
            />
            <br/>
            <br/>
            <TextField id="email" label="email" variant="filled" type="email" color="primary"
            value={email} onChange={e => setEmail(e.target.value)}
              inputProps={{
                className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textField
              }}
            />
            <br/>
            <br/>
            <TextField id="password" label="password" variant="filled" type="password" color="primary"
            value={password} onChange={e => setPassword(e.target.value)}
              inputProps={{
                  className: classes.textField
              }}
              InputLabelProps={{
                className: classes.textField
              }}
            />
            <br/>
            <br/>
            <Button color="primary" type="submit">
              Sign Up
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}