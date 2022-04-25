import { useMemo, useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
  } from "@stripe/react-stripe-js";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from '../util/api';
import ErrorMessage from './ErrorMessage';
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


  const useStyles = makeStyles(() => ({
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
  }));

export default function BillingInfo(user){
    const stripe = useStripe();
    const elements = useElements();
    const classes = useStyles();
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const useOptions = () => {
        const options = useMemo(
          () => ({
            style: {
              base: {
                color: "white",
                "::placeholder": {
                  color: "#A9A9AC"
                }
              },
              invalid: {
                color: "#9e2146"
              }
            }
          }),
        );
      
        return options;
    };

    const options = useOptions();

    const displayError = () => {
      if(error.length > 0 ){
        return <ErrorMessage error={error}/>
      }
    }

    const displayTransaction = () => {
      if(loading){
        return(
          <div>
            <h3> Charging Card </h3>
            <CircularProgress color="secondary" />
          </div>);
      } else{
        return(
          <div>
            {displayError()}
            <h3> Subscription - $7.00 monthly </h3>
            <form onSubmit={handleSubmit}>
                <div className="stripeContainer"
                style={{
                        maxWidth: '250px',
                        margin: '0 auto'
                    }}
                >
                    <div className="stripeWrapper">
                        <label
                            style={{
                                float: 'left'
                            }}
                        >
                            card number
                        </label>
                        <br/>
                        <br/>
                        <div
                            style={{
                                padding: '12px',
                                border: '1px white solid'
                            }}
                        >
                            <CardNumberElement
                                options={options}
                            />
                        </div>
                    </div>
                </div>
                <br/>

                <div className="stripeContainer"
                style={{
                        maxWidth: '250px',
                        margin: '0 auto'
                    }}
                >
                    <div className="stripeWrapper">
                        <label
                            style={{
                                float: 'left'
                            }}
                        >
                          expiration date
                        </label>
                        <br/>
                        <br/>
                        <div
                            style={{
                                padding: '12px',
                                border: '1px white solid'
                            }}
                        >
                            <CardExpiryElement
                                options={options}
                            />
                        </div>
                    </div>
                </div>
                <br/>

                <div className="stripeContainer"
                style={{
                        maxWidth: '250px',
                        margin: '0 auto'
                    }}
                >
                    <div className="stripeWrapper">
                        <label
                            style={{
                                float: 'left'
                            }}
                        >
                          cvc
                        </label>
                        <br/>
                        <br/>
                        <div
                            style={{
                                padding: '12px',
                                border: '1px white solid'
                            }}
                        >
                            <CardCvcElement
                                options={options}
                            />
                        </div>
                    </div>
                </div>
                <br/>
                <br/>

                <Button variant="contained" type="submit" className={classes.button} disabled={!stripe}>
                    Pay
                </Button>
            </form>
          </div>);
      }
    }

    const handleSubmit = async event => {
        event.preventDefault();

        console.log(user)
    
        if (!stripe || !elements) {
          // Stripe.js has not loaded yet. Make sure to disable
          // form submission until Stripe.js has loaded.
          return;
        }
    
        const payload = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardNumberElement)
        });
        console.log("[PaymentMethod]", payload);


        if(payload.error === undefined){
          setError('')
        } else{
          setError('Error charging card')
        }


        const request = {
            first_name: user.user.first_name,
            last_name: user.user.last_name,
            email: user.user.email,
            password: user.user.password,
            paymentMethod: payload.paymentMethod.id
        }

        setLoading(true);

        try{
          setError('')
          const response = await api.post('/user/createUser', request);

          console.log(response.data.token)
          
          sessionStorage.setItem('token', response.data.token)

          history.push(
            '/'
          );
        }catch (err) {
          console.log(err) 
          setLoading(false);
          setError("Error charging card")
        }
    }

    return (
      displayTransaction()
    )
}