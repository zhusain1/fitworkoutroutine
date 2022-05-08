import Chip from '@mui/material/Chip';
import { useState, useEffect } from 'react';

export default function Tag(props){

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
        <Chip label={props.value} style={color}/>
    );
}