/*
A toolbar that has a back button on the left hand side which
is used to navigate to user back in the browser history.

Author: Gergo Kekesi
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
import { arrowBack } from "ionicons/icons";
import { withRouter } from "react-router-dom";

/*
props:
    title: {string}
 */
const BackButtonToolbar = props => {
  const styles = {
    backButton: {
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
            <IonIcon icon={arrowBack} style={styles.backButton}></IonIcon>
          </IonButton>
        </IonButtons>
        <IonTitle style={styles.title}>{props.title}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default withRouter(BackButtonToolbar);
