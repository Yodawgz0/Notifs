import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import firebase from "../../firebase.js";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import { storage } from "../../firebase.js";
import { useStyles } from "./ModifyNotifsStyle.js";

function useNotifs() {
  
  
  const [Notifcations, setNotifcations] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Notifcations")
      .onSnapshot((snapshot) => {
        const newNotifs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifcations(newNotifs);
      });
  }, []);

  return Notifcations;
}

const ModifyNotifs = () => {
  const notifs = useNotifs();
  const classes = useStyles();
  return (
    <div>
      <h2 className={classes.heading}>List of Notifications</h2>
      <Divider />
      <div>
        {notifs.map((notif) => (
          <div>
            <Row key={notif.id} style={{ padding: "0.5rem" }}>
              <Col sm={12} className="title">{notif.title}</Col>
              <Col sm={12}  className="content">{notif.content}</Col>
              <Col xs={5} sm={5} md={3} lg={3} xl={3} className="date"> {notif.date}</Col>
              <Col xs={2} sm={2} md={3} lg={3} xl={3} className="priority">{notif.value}</Col>
              <Col xs={12} sm={12} md={3} lg={3} xl={3} className="Link" >
                <Button  href={notif.url} color="primary"  onClick={(notif.url)? "":(e)=> e.preventDefault()}>View File</Button >
              </Col>
              <Col xs={1} sm={2} md={2} lg={2} xl={2}>
                <div className="Delete">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      firebase
                        .firestore()
                        .collection("Notifcations")
                        .doc(notif.id)
                        .delete();
                      storage.refFromURL(notif.url).delete();
                      
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
            <Divider variant="middle" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModifyNotifs;
