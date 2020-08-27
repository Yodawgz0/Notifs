import React from "react";
import { storage } from "../../firebase.js";
import Card from "@material-ui/core/Card";
import { useStyles } from "./bannerImageUploadStyles.js";
import { Row, Col } from "react-grid-system";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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

const BannerImageUpload = () => {
  const classes = useStyles();

  const [url, setUrl] = React.useState("");
  const [progress, setprogress] = React.useState("");

  const sorts = [];

  const handleChange = async (e) => {
    const file = e.target.files[0];
    //Path of the file.
    const storageRef = storage.ref("bannerimages/");
    const fileRef = storageRef.child(file.name);
    //Upload files in firebase storage.
    //upload file
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

  const storageRef = storage.ref("bannerimages/");
  storageRef.listAll().then(function (res) {
    res.items.forEach(function (itemRef) {
      // All the items under listRef.

      itemRef.getDownloadURL().then(function (fileref) {
        sorts.push(fileref);
      });
    });
  });
  return (
    <div>
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
                setUrl("");setprogress(0);
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card>
      <div>
        <Card>
          <h4> All the files listed below will be seen in Carousel</h4>
          <Col xs={12} sm={12} md={3} lg={3} xl={3} className="Link">
            <Button
              href={url}
              color="primary"
              onClick={url ? "" : (e) => e.preventDefault()}
            ></Button>
          </Col>
        </Card>
      </div>
    </div>
  );
};

export default BannerImageUpload;
