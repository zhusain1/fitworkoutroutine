import React from 'react';
import ReactDOM from 'react-dom';
import MainCard from './functional_components/MainCard';
import Login from './functional_components/Login';
import './global/global_styles.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './global/GlobalTheme'

ReactDOM.render(
  <React.StrictMode>
        <MainCard>
          <ThemeProvider theme={theme}>
            <Login/>
          </ThemeProvider>
        </MainCard>
  </React.StrictMode>,
  document.getElementById('root')
);

