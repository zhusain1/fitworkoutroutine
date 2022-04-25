import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

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