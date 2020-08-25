import React from "react";
import { storage } from "../../firebase.js";
import Card from '@material-ui/core/Card';
import { useStyles } from "./bannerImageUploadStyles.js";
import { Row, Col } from "react-grid-system";
import Button from "@material-ui/core/Button";

const BannerImageUpload = () => {
const classes = useStyles();

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
return (
<Card className={classes.cardDisplay} variant="outlined">
            <Row style={{padding:"3ch"}}>
              <Col xs={12} sm={12} md={3} lg={4} xl={5}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleChange}
              />
              </Col>
             
              <Col xs={12} sm={12} md={3} lg={4} xl={5}>
              <Button
                variant="outlined" size="small" color="secondary"
                disabled={!url}
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
            );
};         

export default BannerImageUpload;
