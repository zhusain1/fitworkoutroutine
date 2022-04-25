import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#6F0C16'
    }
  }, 

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          maxWidth: 550,
          paddingTop: 30,
          marginTop: 80,
          textAlign: 'center',
          color: 'white',
          backgroundColor: '#131416',
          boxShadow: '0 -1px 1px #131416',
        }
      }
    }
  }
});

export default theme
