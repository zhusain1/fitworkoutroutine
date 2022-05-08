import React from 'react';
import ReactDOM from 'react-dom';
import './global/global_styles.css';
import theme from './global/GlobalTheme'
import { BrowserRouter, Switch } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import RenderRoute from './functional_components/RenderRoute';

ReactDOM.render(
  <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <RenderRoute/>
        </Switch>
      </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

