
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PaymentForm from './PaymentForm';
import SecondaryCard from './SecondaryCard';

const useStyles = makeStyles(() => ({
    root: {
        color: 'white',
        '& .MuiDialog-paper':{
          backgroundColor: '#131416',
          color: 'white',
          marginTop: '-80px',
          maxWidth: 500,
        },
      },
    container: {
        marginTop: '-32px',
        fontSize: '16px'
    },button: {
        textAlign: 'center',
        color: 'white',
        backgroundColor: '#292929',
        '&:hover': {
            backgroundColor: '#292929',
            color: 'white'
          },
          '&:focus': {
            backgroundColor: '#292929',
            color: 'white'
          },
          '&:active': {
            backgroundColor: '#292929',
            color: 'white'
          },
          '&:disabled': {
            color: 'white'
          },
      },
}));

const containerStyle = {
    display: 'inline-block',
    textAlign: 'left',
    backgroundColor: 'black',
    padding: '14px',
    width: 324,
    wordWrap: 'break-word'
}
  

export default function Membership(){

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <h2> Account Details </h2>
            <br/>
            <Container maxWidth="sm" className={classes.container}>
                <div className="membership" style={containerStyle}>
                    <p> <b>Membership price</b>:
                    <br/>
                    $7.00 </p>
                    <Divider color="white"/>
                    <p> <b>Email:</b>
                    <br/>
                    zulfihusain1996@gmail.com</p>
                    <Divider color="white"/>
                    <p> <b>Cardholder name:</b>
                    <br/> 
                    Zulfekar Husain</p>
                    <Divider color="white"/>
                    <p> <b>Card number:</b>
                    <br/> 
                    xxxx-xxxx-xxxx-4444</p>
                    <Button variant="contained" type="submit" className={classes.button} 
                    onClick={handleClickOpen}>
                        Manage Payment
                    </Button>
                    <div className="payment_modal">
                        <Dialog open={open} onClose={handleClose} aria-labelledby="payment"
                            className={classes.root}>
                                <DialogContent>
                                    <SecondaryCard>
                                        <PaymentForm/>
                                        <Button onClick={handleClose} color="secondary">
                                            Cancel
                                        </Button>
                                    </SecondaryCard>
                                </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            </Container>
        </>
    );
}