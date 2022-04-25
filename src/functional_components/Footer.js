import React from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
      borderBottom: '2px solid #6F0C16'
    }
  }
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div>
      <div className="footerlinks">
        <small>
        <Box component="div" display="inline">
            <Link href="/signup" className={classes.link}>
                Create Account
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link href="/forgotpassword" className={classes.link}>
              Forgot Password
            </Link>
          </Box>
        </small>
      </div>
    </div>
  );
}