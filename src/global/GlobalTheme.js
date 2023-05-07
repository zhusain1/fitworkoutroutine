import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#6F0C16'
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    }
  }, 

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          width: 350,
          height: 300,
          paddingTop: 10,
          textAlign: 'center',
          color: 'white',
          backgroundColor: '#232428',
          boxShadow: '0 -1px 1px #121314',
          fontSize: '16px'
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
    },
    MuiStepLabel:{
      styleOverrides: {
        root: {
          color: 'white',
        }
      },
    },
    MuiChip:{
      styleOverrides: {
        root: {
          color: 'white' ,
          backgroundColor: 'black'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'white'
        }
      }
    }
  },
});

export default theme
