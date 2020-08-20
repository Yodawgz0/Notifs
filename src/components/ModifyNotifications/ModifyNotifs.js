import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import firebase from "../../firebase.js";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";

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
  return (
    <div>
      <h2>List of Notifications</h2>
      <div>
        <label>Sort by:</label>{" "}
        <select>
          <option>Time</option>
          <option>title (a-z)</option>
          <option>title (z-a)</option>
          <option>priority</option>
        </select>
      </div>
      <div>
        {notifs.map((notif) => (
          <div>
            <Row key={notif.id} style={{ padding: "0.5rem" }}>
              <Col className="title">{notif.title}</Col>
              <Col className="content">{notif.content}</Col>
              <Col className="date"> {notif.date}</Col>
              <Col className="priority">{notif.value}</Col>
              <Col>
                <div className="Cross">
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
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Col>
            </Row>
            <Divider variant="inset" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModifyNotifs;
