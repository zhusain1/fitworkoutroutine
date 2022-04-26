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
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          minWidth: '300px',
          color: 'white',
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white'
          },
          '&:hover fieldset': {
            borderColor: '#6F0C16 !important'
          },
          '&:active fieldset': {
            borderColor: '#6F0C16 !important'
          },
          '&:focus fieldset': {
            borderColor: '#6F0C16 !important'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          width: '250px',
          borderRadius: '28px',
          backgroundColor: '#6F0C16',
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
            color: 'white',
            backgroundColor: 'black',
            opacity: 0.5
          }
        }
      }
    }
  }
});

export default theme
