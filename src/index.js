import React from 'react';
import ReactDOM from 'react-dom';
import './global/global_styles.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './global/GlobalTheme'
import App from './App'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RenderRoute from './functional_components/RenderRoute';

ReactDOM.render(
  <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Switch>
                <Route exact path="/secure">
                  <App />
                </Route>
                <RenderRoute/>
              </Switch>
            </ThemeProvider>
        </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

