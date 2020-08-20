import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { Row, Col } from "react-grid-system";
import firebase from "../../firebase.js";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  rootentry: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "60%",
    },
    button: {
      float: "right",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  },
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: 200,
  },
}));

const SendNotifs = () => {
  const [state, setState] = useState({}); 

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { High, Medium, Low } = state;
  const error = [High, Medium, Low].filter((v) => v).length !== 1;

  const [date, setdate] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  const classes = useStyles();


  function onSubmit(e) {
    if (title !== "" && content !== "" && date !== "") {
      e.preventDefault();

      firebase
        .firestore()
        .collection("Notifcations")
        .add({
          title,
          content,
          date,
          state,
        })
        .then(() => {
          settitle("");
          setcontent("");
          setdate("");
          setState("");
        });
    } else {
    }
  }

  return (
    <div>
      <form
        className={classes.rootentry}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div>
          <Row>
            <TextField
              id="outlined-multiline-static"
              label=" Title"
              required
              multiline
              rows={1}
              width="30ch"
              variant="outlined"
              value={title}
              onChange={(e) => settitle(e.currentTarget.value)}
            />
          </Row>
          <Row>
            <TextField
              id="outlined-multiline-static"
              label="Content"
              required
              multiline
              rows={12}
              width="30ch"
              variant="outlined"
              value={content}
              onChange={(e) => setcontent(e.currentTarget.value)}
            />
          </Row>
          <Row>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue="2020-09-24"
              className={classes.textField}
              value={date}
              onChange={(e) => setdate(e.currentTarget.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Col>
          <Col>
            <FormControl
              required
              error={error}
              component="fieldset"
              className={classes.formControl}
             
            >
              <FormLabel component="legend">Pick One</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={High}
                      value={state}
                      onChange={(e) => setState(e.currentTarget.value)}
                      name="High"
                    />
                  }
                  label="High"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Medium}
                      value={state}
                      onChange={(e) => setState(e.currentTarget.value)}
                      name="Medium"
                    />
                  }
                  label="Medium"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Low}
                      value={state}
                      onChange={(e) => setState(e.currentTarget.value)}
                      name="Low"
                    />
                  }
                  label="Low"
                />
              </FormGroup>
              <FormHelperText>Only One Type of Priority</FormHelperText>
            </FormControl>
            </Col>
          </Row>
          <Row>
            <button className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
              >
                Send
              </Button>
            </button>
          </Row>
        </div>
      </form>
    </div>
  );
};

export default SendNotifs;
