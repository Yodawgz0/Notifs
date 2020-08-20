import React, { useState, useEffect } from "react";
import { Row, Col } from "react-grid-system";
import firebase from "../../firebase.js";

function useNotifs() {
  const [Notifcations, setNotifcations] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("Notifcations")
      .onSnapshot((snapshot) => {
        const newNotifs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setNotifcations(newNotifs);
      })
  }, [])

  return Notifcations
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
          <Row key={notif.id}>
            <Col className="title">{notif.title}</Col>
            <Col className="content">{notif.content}</Col>
            <Col className="date"> {notif.date}</Col>
            <Col className="priority">{notif.priority}</Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default ModifyNotifs;
