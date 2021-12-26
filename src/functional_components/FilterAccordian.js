import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Tag from './Tag';
import EquipmentContext from '../global/EquipmentContext';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#131416',
    color: 'white',
   },
   filterWrapper: {
     margin: '0 auto',
     width: '350px',
     '@media (max-device-width: 480px)': {
      margin: 'auto',
      width: '100%'
    }
   },
}));

export default function FilterAccordian(props) {
  const classes = useStyles();

  const { setWorkoutTag } = useContext(EquipmentContext);

  const handleClick = (tag) => {
    setWorkoutTag(tag);
  }

  return (
    <div className={classes.filterWrapper}>
      <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='primary'/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4> Filter </h4>
        </AccordionSummary>
        <AccordionDetails className={classes.root}>
            <Grid container spacing={2} justifyContent="center" >
                <Grid key="All" item onClick={() => handleClick("All")}>
                  <div className="tag">
                    <Tag value={'All Equipment'}/> 
                  </div>
                </Grid>
                <Grid key="Barbell" item onClick={() => handleClick("Barbell")}> 
                  <div className='tag'> 
                    <Tag value={'Barbell'} /> 
                  </div> 
                </Grid>
                <Grid key="Dumbbell" item onClick={() => handleClick("Dumbell")}>
                  <div className="tag">
                    <Tag value={'Dumbell'}/> 
                  </div>
                </Grid>
                <Grid key="Bodyweight" item onClick={() => handleClick("Bodyweight")}>
                  <div className="tag">
                    <Tag value={'Bodyweight'} className="tag"/> 
                  </div>  
                </Grid>
                <Grid key="Machine" item onClick={() => handleClick("Machine")}>
                  <div className="tag">
                    <Tag value={'Machine'} className="tag"/> 
                  </div>
                </Grid>
                <Grid key="Medicine Ball" item onClick={() => handleClick("Medicine Ball")}>
                  <div className="tag">
                    <Tag value={'Medicine Ball'} className="tag"/> 
                  </div>
                </Grid>
                <Grid key="Kettlebell" item onClick={() => handleClick("Kettlebell")}>
                  <div className="tag">
                    <Tag value={'Kettlebell'}/> 
                  </div>
                </Grid>
            </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}