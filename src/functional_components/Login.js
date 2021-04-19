import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../img/logo-transparent.png'
import CreateAccount from './CreateAccount';

const useStyles = makeStyles(() => ({
  root: {
    color: 'white',
    '& .MuiFilledInput-underline::before': {
        borderBottom: '1px solid #F4F3EE'
      },
    '& .MuiFilledInput-underline::after': {
      borderBottom: '1px solid #6F0C16'
    },
    minWidth: '250px',
    height: '8px',
    textAlign: 'left'
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
  }
}));

 export default function Login() {
    const classes = useStyles();

    return (
      <div className="Login">
        <img src={logo} alt="logo" width="250" height="140"/>
        <>
            <form className={classes.field}>
                <TextField id="email" label="email" variant="filled" type="email" defaultValue="" color="primary" className={classes.root}
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
                <TextField id="password" label="password" variant="filled" type="password" defaultValue="" color="primary" className={classes.root}
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
                <Button variant="contained" className={classes.button}>
                  Login
                </Button>
                <br/>
                <br/>
                <CreateAccount/>
            </form>
        </>
      </div>
    );
  }
    