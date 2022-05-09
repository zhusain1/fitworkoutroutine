import { useState } from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
  } from "@stripe/react-stripe-js";
import Button from '@mui/material/Button';
import api from '../util/api';
import ErrorMessage from './ErrorMessage';
import { useHistory } from "react-router-dom";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CircularProgress from '@mui/material/CircularProgress';

export default function Account(){
    const stripe = useStripe();
    const elements = useElements();
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const options = {
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
    }

    const displayError = () => {
      if(error.length > 0 ){
        return <ErrorMessage error={error}/>
      }
    }

    const deactivate = async () => {
      // make call to deactive
      try{
        await api.post('/user/deactivate');
      }catch (err) {
        console.log(err)
      }
      
      // logout 
      sessionStorage.clear();
      history.push('/');
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
            <br/>
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
                            Card Number
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
                          Expiration Date
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

                <Button variant="contained" type="submit" disabled={!stripe}>
                    Update
                </Button>
                <br/>
                <br/>
            </form>
          </div>);
      }
    }

    const handleSubmit = async event => {
        event.preventDefault();

    
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
          return
        }


        
        const request = {
            payment_id: payload.paymentMethod.id
        }

        setLoading(true);

        try{
          setError('')
          const response = await api.post('/user/updatePayment', request);

          console.log(response.data)

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
      <div>
          <Accordion sx={{
              width: '100%',
              backgroundColor: '#131416',
              color: 'white'
            }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='primary'/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3> Update Payment Method </h3>
              </AccordionSummary>
              <AccordionDetails>
                {displayTransaction()}
              </AccordionDetails>
          </Accordion>
          <Accordion sx={{
              width: '100%',
              backgroundColor: '#131416',
              color: 'white'
            }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color='primary'/>}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <h3> Cancel Subscription </h3>
              </AccordionSummary>
              <AccordionDetails>
              <div>
                Cancel Subscription and delete account
                <br/>
                <br/>
                <Button variant="contained" type="submit" onClick={deactivate}>
                  Deactivate
                </Button>
              </div>
              </AccordionDetails>
          </Accordion>
    </div>
  )
}