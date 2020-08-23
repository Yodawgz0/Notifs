import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { Row, Col } from "react-grid-system";
import firebase from "../../firebase.js";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { storage } from "../../firebase.js";

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
  hidden: {
    display: "none",
  },
}));

const SendNotifs = () => {
  const classes = useStyles();

  const [date, setdate] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [value, setValue] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setUrl(await fileRef.getDownloadURL());
  };

  function onSubmit(e) {
    
    if (title !== "" && content !== "" && date !== "" && value !== "") {
      e.preventDefault();

      firebase
        .firestore()
        .collection("Notifcations")
        .add({
          title,
          content,
          date,
          value,
          url,
        })
        .then(() => {
          settitle("");
          setcontent("");
          setdate("");
          setValue("");
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
                required
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
                component="fieldset"
                className={classes.formControl}
              >
                <FormLabel component="legend">Priority</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="Priority"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                >
                  <FormControlLabel
                    value="High"
                    control={<Radio />}
                    label="High"
                  />
                  <FormControlLabel
                    value="Medium"
                    control={<Radio />}
                    label="Medium"
                  />
                  <FormControlLabel
                    value="Low"
                    control={<Radio />}
                    label="Low"
                  />
                </RadioGroup>
                <FormHelperText>Only One Type of Priority</FormHelperText>
              </FormControl>
            </Col>
          </Row>
          <Row style={{ paddingTop: "3ch" }}>
            <Col xs={3} sm={3} md={3} lg={1} xl={1}>
              <input
                accept="file/*"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={handleChange}
              />
            </Col>  
          </Row>
          <Row>
            <button disabled={!url} className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                disabled={!url}
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
