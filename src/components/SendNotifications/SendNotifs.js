import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { Row, Col } from "react-grid-system";
import firebase from "../../firebase.js";

const useStyles = makeStyles((theme) => ({
  rootentry: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "60%",
    },
    button: {      
      float: "right"
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
  const [date, setdate] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");

  const classes = useStyles();

  function onSubmit(e) {
    e.preventDefault();

    firebase
      .firestore()
      .collection("Notifcations")
      .add({
        title,
        content,
        date,
      })
      .then(() => {
        settitle("");
        setcontent("");
        setdate("");
      });
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
