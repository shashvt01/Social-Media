
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
    },
  },
  paper: {
    padding: theme.spacing(2),
    maxHeight:'600px',
    maxWidth:'300px',
    justifyContent:'center',
    margin:'auto',

  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',

  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },

  
}));
