import React from 'react';
import ReactDOM from 'react-dom';
import './global/global_styles.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './global/GlobalTheme'
import { BrowserRouter, Switch } from 'react-router-dom';
import RenderRoute from './functional_components/RenderRoute';
import {loadStripe} from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_dWg4X4LaroVznfa7oAOwNoum00vzNnt3hI');

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <Switch>
              <RenderRoute/>
            </Switch>
        </ThemeProvider>
    </BrowserRouter>
  </Elements>,
  document.getElementById('root')
);

