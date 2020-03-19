/*
The applications home page rendered by default when the root URL is visited.
This page allows navigation to the pages that complete the Assignment's tasks.

Author: Gergo Kekesi
*/

import { IonContent, IonPage, IonButton, IonActionSheet } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import background_image from "../resources/home_background_blur.jpg";

import "./Home.css";
import { withRouter } from "react-router-dom";
import UserQueries from "./../queries/UserQueries";
import BackButtonToolbar from "../components/BackButtonToolbar";
import BluetoothSynchronisationManager from "../bluetooth/managers/BluetoothSynchronisationManager";

/*props:
 */
const Home = props => {
  const [showDoctorActionSheet, setShowDoctorActionSheet] = useState(false);
  const [showPatientActionSheet, setShowPatientActionSheet] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  /**
   * Runs once, when the component first renders
   * On render it will retrieve the doctors from the database
   * as well as the patients.
   */
  useEffect(() => {
    UserQueries.getAllTestDoctors().then(res => {
      setDoctors(res);
    });

    UserQueries.getAllTestPatients().then(res => {
      setPatients(res);
    });
  }, []);

  /**
   * Styling parameters
   */
  const styles = {
    home: {
      width: "100%",
      height: "100%",
      backgroundImage: `url(${background_image})`,
      backgroundSize: "cover"
    }
  };

  /**
   * Returns an abject that contains the text and click handler
   * for a button. It is used to display each doctor in the list
   * and allow the user the click it
   *
   * @param {String} doc - The ID of the doctor
   * @returns {Object} - An object containing the text for the button and the click handler
   */
  const docButton = doc => {
    return {
      text: doc.name,
      handler: () => {
        props.history.push(`/doctor/${doc.id}/mypatients`);
      }
    };
  };

  /**
   * Returns an abject that contains the text and click handler
   * for a button. It is used to display each patient in the list
   * and allow the user the click it
   *
   * @param {String} patient - The ID of the doctor
   * @returns {Object} - An object containing the text for the button and the click handler
   */
  const patientButton = patient => {
    return {
      text: patient.name,
      handler: () => {
        props.history.push(`/patient/${patient.id}/activities`);
        BluetoothSynchronisationManager.disconnectAll();
        BluetoothSynchronisationManager.setPatient(patient.id);
      }
    };
  };

  return (
    <IonPage>
      <BackButtonToolbar title={"eHealth Application Demo"} />
      <IonContent>
        <div className="ion-padding" style={styles.home}>
          <Container>
            <Row>
              <Col>
                <IonButton
                  size="large"
                  expand="block"
                  style={{ marginBottom: "30px" }}
                  onClick={() => setShowPatientActionSheet(true)}
                >
                  Today's Activity
                </IonButton>
              </Col>
            </Row>
            <Row>
              <Col>
                <IonButton
                  size="large"
                  expand="block"
                  onClick={() => setShowDoctorActionSheet(true)}
                >
                  View Patients
                </IonButton>
              </Col>
            </Row>
            <Row></Row>
          </Container>
        </div>
        <IonActionSheet
          isOpen={showDoctorActionSheet}
          onDidDismiss={() => setShowDoctorActionSheet(false)}
          header="Select a doctor:"
          buttons={doctors.map(doc => {
            return docButton(doc);
          })}
        />
        <IonActionSheet
          isOpen={showPatientActionSheet}
          onDidDismiss={() => setShowPatientActionSheet(false)}
          header="Select a patient:"
          buttons={patients.map(patient => {
            return patientButton(patient);
          })}
        />
      </IonContent>
    </IonPage>
  );
};

export default withRouter(Home);
