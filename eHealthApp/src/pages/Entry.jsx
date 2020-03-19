import React, { useState } from "react";
import {
  IonHeader,
  IonPage,
  IonAlert,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonToast,
  IonInput,
  IonCardTitle,
  IonToolbar,
  IonItem,
  IonTitle,
  IonItemGroup,
  IonModal
} from "@ionic/react";

import RegistrationModal from "../components/RegistrationModal";
import CredentialQueries from "../queries/CredentialQueries";
import CredentialManager from "../utilities/CredentialManager";
import "./Entry.css";

/**
 * A React component function representing the login view of this
 * application.
 * @param {Object} props Contains several routing functions for
 * providing the means of view navigation.
 * @returns {Component} The rendered component for visualisation.
 */
const Entry = props => {
  // Property state initialisation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);

  /**
   * A function callback after closing the registration modal in order
   * to trigger the display of a message strip in order to provide
   * feedback to the user on the success of a registration.
   * @param {Object} state Represents the success status emitted from
   * the registration modal in order to highlight whether the process
   * has been fully completed or not.
   */
  async function closeModal(state) {
    await setShowModal(false);
    if (state) {
      await setToastMsg("Registration");
      await setIsToastDisplayed(true);
    }
  }

  /**
   * A function for verifying the existence of a user upon a login click.
   */
  function verifyUser() {
    CredentialQueries.verifyUserCredential({
      username: username,
      password: CredentialManager.EncryptAccesscode(username, password)
    })
      .then(res => {
        // Display a message strip to signify a successful login.
        setToastMsg("Login");
        setIsToastDisplayed(true);
        redirectToUser(res.user.id);
      })
      .catch(async err => {
        // Show a pop up displaying the error message.
        let error = await err.json();
        produceInvalidLoginMessage(error.value);
      });
  }

  /**
   * A function for redirecting the user to their role-based view after
   * a successful login.
   * @param {string} userId Represents the user's ID that consists of the
   * concatenation of the role name and timestamp.
   */
  function redirectToUser(userId) {
    // Locally initialise the predicates for pattern matching.
    let patientPredicate = "Patient",
      doctorPredicate = "Doctor";

    // Locally initialise the initial values of the roles.
    let userRole = "unknown",
      rolebasedView = "unknown";

    // Pattern match against the user ID.
    if (userId.includes(patientPredicate)) {
      userRole = patientPredicate;
      rolebasedView = "activities";
    } else if (userId.includes(doctorPredicate)) {
      userRole = doctorPredicate;
      rolebasedView = "mypatients";
    } else {
      setErrMsg("");
      setIsAlertTriggered(true);
      return;
    }

    // Redirect to role-based view.
    props.history.push(`/${userRole.toLowerCase()}/${userId}/${rolebasedView}`);
  }

  /**
   * A function for displaying a popup in order to inform the user that
   * invalid credentials have been used.
   * @param {string} error Represents the error message that should be
   * displayed to the user.
   */
  function produceInvalidLoginMessage(error) {
    setErrMsg(error);
    setIsAlertTriggered(true);
  }

  // Render the view
  return (
    <IonPage>
      <IonAlert
        isOpen={isAlertTriggered}
        onDidDismiss={() => setIsAlertTriggered(false)}
        header="Login failed."
        message={errorMsg}
        buttons={["OK"]}
      />
      <IonModal isOpen={showModal}>
        <RegistrationModal closeAction={closeModal}></RegistrationModal>
      </IonModal>
      <IonToast
        isOpen={isToastDisplayed}
        onDidDismiss={() => setIsToastDisplayed(false)}
        message={`${toastMsg} successful!`}
        duration={2000}
      />
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>eHealth Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Login</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItemGroup>
              <IonItem>
                <IonInput
                  placeholder="Username"
                  onIonInput={e => setUsername(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Password"
                  type="password"
                  onIonInput={e => setPassword(e.target.value)}
                />
              </IonItem>
              <section>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={() => verifyUser()}
                >
                  Login
                </IonButton>
              </section>
            </IonItemGroup>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Registration</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItemGroup>
              <section>
                <IonButton
                  expand="block"
                  shape="round"
                  onClick={() => setShowModal(true)}
                >
                  Create new account
                </IonButton>
              </section>
            </IonItemGroup>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Demo Sandbox</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItemGroup>
              <section>
                <IonButton
                  expand="block"
                  shape="round"
                  routerDirection="forward"
                  routerLink={"/demo"}
                >
                  Try Demo
                </IonButton>
              </section>
            </IonItemGroup>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Entry;
