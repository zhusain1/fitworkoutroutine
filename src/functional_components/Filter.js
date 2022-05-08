import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Tag from './Tag';
import EquipmentContext from '../global/EquipmentContext';

export default function Filter() {

  const { setWorkoutTag } = useContext(EquipmentContext);
  const [all, setAll] = useState(true);
  const [barbell, setBarbell]  = useState(true);
  const [dumbbell, setDumbbell] = useState(true);
  const [medicineball, setMedicineball] = useState(true);
  const [kettlebell, setKettlebell] = useState(true);
  const [bodyweight, setBodyweight] = useState(true);
  const [machine, setMachine] = useState(true);

  const handleClick = (tag) => {
    setWorkoutTag(tag);

    switch(tag){
      case "Barbell": 
        setBarbell(!barbell);
        setDumbbell(true);
        setMedicineball(true);
        setKettlebell(true);
        setBodyweight(true);
        setMachine(true);
        setAll(true)
        break;
      case "Dumbbell": 
        setDumbbell(!dumbbell);
        setBarbell(true);
        setMedicineball(true);
        setKettlebell(true);
        setBodyweight(true);
        setMachine(true);
        setAll(true)
        break;
      case "Medicine Ball": 
        setMedicineball(!medicineball);
        setBarbell(true);
        setDumbbell(true);
        setKettlebell(true);
        setBodyweight(true);
        setMachine(true);
        setAll(true)
        break;
      case "Kettlebell": 
        setKettlebell(!kettlebell);
        setBarbell(true);
        setDumbbell(true);
        setBodyweight(true);
        setMedicineball(true);
        setMachine(true);
        setAll(true)
        break;
      case "Bodyweight": 
        setBodyweight(!bodyweight);
        setBarbell(true);
        setDumbbell(true);
        setMedicineball(true);
        setKettlebell(true);
        setMachine(true);
        setAll(true) 
        break;
      case "Machine": 
        setMachine(!machine);
        setBodyweight(true);
        setBarbell(true);
        setDumbbell(true);
        setMedicineball(true);
        setKettlebell(true);
        setAll(true) 
        break;
      default:
        setAll(!all)
        setBodyweight(true);
        setBarbell(true);
        setDumbbell(true);
        setMedicineball(true);
        setKettlebell(true); 
        setMachine(true);
    }
  }

  return (
    <div>
        <Grid container spacing={2} justifyContent="center" >
            <Grid key="All" item onClick={() => handleClick("All")}>
              <div className="tag">
                <Tag value={'All Equipment'} toggle={all}/> 
              </div>
            </Grid>
            <Grid key="Barbell" item onClick={() => handleClick("Barbell")}> 
              <div className='tag'> 
                <Tag value={'Barbell'} toggle={barbell}/> 
              </div> 
            </Grid>
            <Grid key="Dumbbell" item onClick={() => handleClick("Dumbbell")}>
              <div className="tag">
                <Tag value={'Dumbbell'} toggle={dumbbell}/> 
              </div>
            </Grid>
            <Grid key="Bodyweight" item onClick={() => handleClick("Bodyweight")}>
              <div className="tag">
                <Tag value={'Bodyweight'} toggle={bodyweight}/> 
              </div>  
            </Grid>
            <Grid key="Machine" item onClick={() => handleClick("Machine")}>
              <div className="tag">
                <Tag value={'Machine'} toggle={machine}/> 
              </div>
            </Grid>
            <Grid key="Medicine Ball" item onClick={() => handleClick("Medicine Ball")}>
              <div className="tag">
                <Tag value={'Medicine Ball'} toggle={medicineball}/> 
              </div>
            </Grid>
            <Grid key="Kettlebell" item onClick={() => handleClick("Kettlebell")}>
              <div className="tag">
                <Tag value={'Kettlebell'} toggle={kettlebell}/> 
              </div>
            </Grid>
        </Grid>
    </div>
  );
}