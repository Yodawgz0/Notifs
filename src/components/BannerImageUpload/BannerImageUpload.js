import React, { useState, useEffect } from "react";
import { storage } from "../../firebase.js";
import Card from "@material-ui/core/Card";
import { useStyles } from "./bannerImageUploadStyles.js";
import { Row, Col } from "react-grid-system";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import * as firebase from "firebase/app";

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function useImages() {
  const [BannerImages, setBannerImages] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("BannerImages")
      .onSnapshot((snapshot) => {
        const newImages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBannerImages(newImages);
      });
  }, []);

  return BannerImages;
}

const BannerImageUpload = () => {
  const classes = useStyles();
  const images = useImages();

  const [progress, setprogress] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleChange = async (e) => {
    const file = e.target.files[0];
    //Path of the file.
    const storageRef = storage.ref("bannerimages/");
    const fileRef = storageRef.child(file.name);
    //Upload files in firebase storage.
    let upload = fileRef.put(file);
    //update progress bar
    upload.on(
      "state_changed",
      function progress(snapshot) {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setprogress(percentage);
      },

      function error() {
        alert("error uploading file");
      },

      function complete() {
        // generate URL
        fileRef
          .getDownloadURL()
          .then(function (url) {
            setUrl(url);
          })
          .catch(function (error) {
            console.log("error encountered");
          });
      }
    );
  };
  function onSubmit(e) {
    if (url !== "") {
      e.preventDefault();
      //adding values in firebase database.
      firebase
        .firestore()
        .collection("BannerImages")
        .add({
          url,
        })
        .then(() => {});
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
        <Card className={classes.cardDisplay} variant="outlined">
          <Row style={{ padding: "3ch" }}>
            <Col xs={12} sm={12} md={3} lg={4} xl={5}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                disabled={url}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <LinearProgressWithLabel value={progress} />
            </Col>
            <Col xs={12} sm={12} md={3} lg={4} xl={5}>
              <Button
                variant="outlined"
                size="small"
                color="secondary"
                disabled={!url}
                onClick={(e) => {
                  e.stopPropagation();
                  storage.refFromURL(url).delete();
                  setUrl("");
                  setprogress(0);
                }}
              >
                Delete
              </Button>
            </Col>
            <Col>
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
          </Col>
          </Row>
          
        </Card>
      </form>
      <div>
        <Card>
          <h4 className={classes.heading}>Files listed in Carousel</h4>
          <Divider />
          <Col xs={12} sm={12} md={3} lg={3} xl={3} className="Link">
            <div>
              {images.map((image) => (
                <div>
                  <Row key={image.id} style={{ padding: "0.2rem" }}>
                    <Button
                      href={image.url}
                      color="primary"
                      className={classes.button}
                      onClick={image.url ? "" : (e) => e.preventDefault()}
                    >
                      View Image
                    </Button>
                    <Col xs={1} sm={2} md={2} lg={2} xl={2}>
                      <div className="Delete">
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          className ={classes.deletebutton}
                          startIcon={<DeleteIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            firebase
                              .firestore()
                              .collection("BannerImages")
                              .doc(image.id)
                              .delete();
                            storage.refFromURL(image.url).delete();
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              ))}
            </div>
          </Col>
        </Card>
      </div>
    </div>
  );
};

export default BannerImageUpload;
