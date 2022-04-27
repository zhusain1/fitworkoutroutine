import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Footer() {

  return (
    <div>
      <div className="footerlinks"
        style={{
          display: 'inline-flex',
          fontWeight: 'bold',
          padding: '12px',
          fontSize: '18px'
        }}
      >
        <small>
        <Box component="div" >
            <Link href="/signup" 
              sx={{
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'none',
                  borderBottom: '2px solid #6F0C16'
                }
              }}
            >
                Create Account
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/forgotpassword" 
               sx={{
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'none',
                  borderBottom: '2px solid #6F0C16'
                }
              }}
            >
              Forgot Password
            </Link>
          </Box>
        </small>
      </div>
    </div>
  );
}