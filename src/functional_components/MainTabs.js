import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Create from './Create'

function MainTabs(props) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
      <div>{children}</div>
      )}
    </div>
  );
}

MainTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles(() => ({
  root: { 
    flexGrow: 1,
    backgroundColor: 'black',
    color: 'white',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Create" />
        <Tab label="Edit"/>
        <Tab label="Workouts"/>
      </Tabs>
      <MainTabs value={value} index={0}>
          <Create/>
      </MainTabs>
      <MainTabs value={value} index={1}>
        Item Two
      </MainTabs>
      <MainTabs value={value} index={2}>
        Item Three
      </MainTabs>
    </div>
  );
}