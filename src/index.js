import React from 'react';
import ReactDOM from 'react-dom';
import MainCard from './functional_components/MainCard';
import Login from './functional_components/Login';
import './global/global_styles.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './global/GlobalTheme'
import App from './App'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
        <BrowserRouter>
          <MainCard>
            <ThemeProvider theme={theme}>
              <Switch>
                <Route exact path="/secure">
                  <App />
                </Route>
                <Route path="/">
                  <Login />
                </Route>
              </Switch>
            </ThemeProvider>
          </MainCard>
        </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

