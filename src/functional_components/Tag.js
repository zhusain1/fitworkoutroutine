import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
    root: {
      color: 'white',
    }
})

export default function Tag(props){
    const classes = useStyles();

    const [color, setColor] = useState({});

    useEffect(() => {
        if(props.toggle){
            setColor({
                backgroundColor: '#6F0C16'
            })
        } else{
            setColor({
                backgroundColor: 'black'
            })
        }
    }, [props.toggle]); 

   

    return (
        <Chip className={classes.root} label={props.value} style={color}/>
    );
}