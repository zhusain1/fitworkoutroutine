
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PaymentIcon from '@mui/icons-material/Payment';
import ErrorMessage from './ErrorMessage';
import logo from '../img/logo-transparent.png'
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
  } from '@stripe/react-stripe-js';
import Container from '@mui/material/Container';
import Button from '@material-ui/core/Button';
import { FormLabel } from '@mui/material';

export default function PaymentForm(){

const useStyles = makeStyles({
    icon: {
        '&:hover': {
            color: 'white',
            cursor: 'default'
        }
    },
    root: {
        color: 'white',
        '& .MuiFilledInput-underline::before': {
            borderBottom: '1px solid #F4F3EE'
            },
        '& .MuiFilledInput-underline::after': {
            borderBottom: '1px solid #6F0C16'
        },
        minWidth: '250px',
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
        '&:disabled': {
          color: 'white'
        },
    },
    label: {
        color: 'white !important'
    }
});

const errorStyle = {
    marginTop : '-36px'
}

const [cardholdername, setCardHolderName] = React.useState("");
const [error, setError] = React.useState("");
const [success, setSuccess] = React.useState(false);

const stripe = useStripe();
const elements = useElements();

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitted form');

    if(cardholdername.length < 1){
        setError('Please enter cardholder name')
    } else{
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement),
            card: elements.getElement(CardExpiryElement),
            card: elements.getElement(CardCvcElement),
            billing_details: {
                name: cardholdername
            }
        })

        if(error){
            setError('Payment failed')
        } else{
            setSuccess(true);
            console.log(paymentMethod)
        }
    }
} 

const renderError = () => {
    if(error.length > 0){
        return <ErrorMessage error={error}/>
    }
}

const classes = useStyles();

return (
    <div>
        <div className='error' style={errorStyle}>
            {renderError()}
        </div>
        <img src={logo} alt="logo" width="200" height="120" className="logo"/>
        <br/>
        <PaymentIcon fontSize="large" className={classes.icon}/>
        <p> <b>Fitworkout Routine Subscription </b> -  $7.00 per month </p> 
        <br/>
        <form onSubmit={handleSubmit}>
            <TextField id="name" label="Cardholder name" variant="filled" type="text" value={cardholdername}
                    onChange={e => setCardHolderName(e.target.value)}
                    color="primary" className={classes.root}
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
            <Container maxWidth="md"> 
                <FormLabel className={classes.label}> Card number </FormLabel>
                <br/>
                <div className="cardNumber">
                    <CardNumberElement
                        options = {{
                            style: {
                                base: {
                                    color: 'white',
                                    '::placeholder': {
                                        color: 'white',
                                    },
                                },
                            },
                            placeholder: '  '
                        }}/>
                </div>
                <br/>
                <FormLabel className={classes.label}> Expiration Date</FormLabel>
                <br/>
                <div className="expirationDate">
                    <CardExpiryElement
                        options = {{
                            style: {
                                base: {
                                    color: 'white',
                                },
                                '::placeholder': {
                                    color: 'white',
                                },
                            },
                        }}/>
                </div>
                <br/>
                <FormLabel className={classes.label}> CVC </FormLabel>
                <br/>
                <div className="cvc">
                    <CardCvcElement
                        options = {{
                            style: {
                                base: {
                                    color: 'white',
                                    '::placeholder': {
                                        color: '3C474B',
                                    },
                                },
                            },
                            placeholder: ''
                        }}/>
                </div>
            </Container>
            <br/>
            <Button variant="contained" type="submit" className={classes.button} type="submit">
              Pay
            </Button>  
        </form>
    </div>
    );
}