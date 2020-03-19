/*
A toolbar that has a logout button on the left hand side which
is used to navigate to user back in the browser history.

Author: Andy Le
*/

import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/react";
import { power } from "ionicons/icons";
import { withRouter } from "react-router-dom";

/*
props:
    title: {string}
 */
const LogoutButtonToolbar = props => {
  const styles = {
    logoutButton: {
      width: "30px",
      height: "30px"
    },
    title: {
      marginLeft: "-20px"
    }
  };

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={() => props.history.goBack()}>
            <IonIcon icon={power} style={styles.logoutButton}></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle style={styles.title}>{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default withRouter(LogoutButtonToolbar);
