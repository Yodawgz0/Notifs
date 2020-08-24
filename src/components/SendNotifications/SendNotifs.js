import React, { useState } from "react";
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
import Card from '@material-ui/core/Card';
import { storage } from "../../firebase.js";
import { useStyles } from "./SendNotifsStyle.js";
import { Typography } from "@material-ui/core";

const SendNotifs = () => {
  const classes = useStyles();

  const [date, setdate] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [value, setValue] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [enablefile, setenablefile] = React.useState("");

  const handleChange = async (e) => {
    const file = e.target.files[0];
    //Path of the file.
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    //Upload files in firebase storage.
    await fileRef.put(file);
    setUrl(await fileRef.getDownloadURL());
    storage.refFromURL(url);    
  };

  function onSubmit(e) {
    if (title !== "" && content !== "" && date !== "" && value !== "") {
      e.preventDefault();
//adding values in firebase database.
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
    } else { }
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
          <Row xs={12} sm={12} md={3} lg={4} xl={5}>
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
          <Row  >
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
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
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
                  aria-label="Priority"
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
          <Row style={{ paddingTop: "3ch", alignItems:"flex-start" }}>
          <Card className={classes.cardDisplay} variant="outlined">
            <Row style={{padding:"3ch"}}>
            <Col xs={12} sm={12} md={3} lg={2} xl={2}>
              <input
                type="checkbox"
                disabled={url}
                className={classes.checkbox}
                onChange={(e) => setenablefile(e.currentTarget.checked)}
              />
               File Attach
            </Col>

            <Col xs={12} sm={12} md={3} lg={4} xl={5}>
              <input
                accept="image/*, application/pdf"
                className={classes.input}
                id="contained-button-file"
                type="file"
                disabled={!enablefile}
                onChange={handleChange}
              />
              <Typography variant="caption"  disbaled={!url}>Uploading File...</Typography>
              </Col>
              <Col xs={12} sm={12} md={3} lg={4} xl={5}>
              <Button
                variant="outlined" size="small" color="secondary"
                disabled={!enablefile || !url}
                onClick={(e) => {
                  e.stopPropagation();
                    storage.refFromURL( url).delete();
                      setUrl("");}}                  
              >
                Delete
              </Button>
              
            </Col>
            </Row>
            </Card>
           
         
          <Col style={{ paddingTop: "4ch" }} xs={12} sm={12} lg={8}>
          <div className={classes.sendButton}>            
              <button
                disabled={
                  (!url && enablefile) || !title || !date || !content || !value
                }
                className={classes.button}
              >
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  disabled={
                    (!url && enablefile) ||
                    !title ||
                    !date ||
                    !content ||
                    !value
                  }
                >
                  Send
                </Button>
              </button>              
            </div>
            </Col>          
           </Row>
        </div>
      </form>
    </div>
  );
};

export default SendNotifs;
