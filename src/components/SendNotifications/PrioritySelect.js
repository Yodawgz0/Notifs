import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function PrioritySelect() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { High, Medium, Low } = state;
  const error = [High, Medium, Low].filter((v) => v).length !== 1;

  return (
    <div className={classes.root}>
      <FormControl required error={error} component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Pick One</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={High} onChange={handleChange} name="High" />}
            label="High"
          />
          <FormControlLabel
            control={<Checkbox checked={Medium} onChange={handleChange} name="Medium" />}
            label="Medium"
          />
          <FormControlLabel
            control={<Checkbox checked={Low} onChange={handleChange} name="Low" />}
            label="Low"
          />
        </FormGroup>
        <FormHelperText>Only One Type of Priority</FormHelperText>
      </FormControl>
    </div>
  );
}
