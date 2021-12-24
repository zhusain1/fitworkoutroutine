import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      color: 'white',
      backgroundColor: '#6F0C16'
    }
})

export default function Tag(props){
    const classes = useStyles();

    return (
        <Chip className={classes.root} label={props.value}/>
    );
}