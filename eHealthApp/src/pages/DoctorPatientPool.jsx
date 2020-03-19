/*
The intent of this view is to assemble the data of unassigned patients
in order to let the doctor choose a patient whom they want to provide
treatment to.

Author: Andy Le
*/

import React, { Fragment, useState } from "react";
import {
  IonAlert,
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonToast,
  useIonViewWillEnter
} from "@ionic/react";
import BackButtonToolbar from "../components/BackButtonToolbar";
import UserQueries from "../queries/UserQueries";
import { Row, Container } from "react-bootstrap";
import { withRouter } from "react-router";

/**
 * A React component function representing the patient pool view.
 * @param {Object} props Contains several properties and functions
 * for retrieving the doctor's ID by URI as well as providing the
 * means of view navigation.
 * @returns {Component} The rendered component for visualisation.
 */
const DoctorPatientPool = props => {
  // Retrieve doctor ID from URI
  const doctor = props.match.params.docid;

  // Property state initialisation
  const [isSelectPromptOpen, setIsSelectPromptOpen] = useState(false);
  const [isExitPromptOpen, setIsExitPromptOpen] = useState(false);
  const [isToastDisplayed, setIsToastDisplayed] = useState(false);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});

  /**
   * An in-built Ionic function for providing the entry point of
   * visiting this view. It will check whether or not there are
   * available patient entries.
   */
  useIonViewWillEnter(() => {
    UserQueries.getAllUnassignedPatients(doctor).then(res => {
      if (res.length < 1) setIsExitPromptOpen(true);
      else setPatients(res);
    });
  });

  /**
   * An event function representing the click on a patient card. It
   * will record the most recently selected patient for further
   * operations.
   * @param {Object} patient Represents the selected patient object
   * whose data will be used as a means of visualising their data.
   */
  const onPatientClick = patient => {
    setSelectedPatient(patient);
    setIsSelectPromptOpen(true);
  };

  /**
   * An event function representing the finalisation of a patient
   * assignment towards the doctor. It will prompt a message strip
   * for notifying the doctor the success of patient assignment and
   * then force a return to the parent view.
   */
  const onAssignmentComplete = () => {
    setIsToastDisplayed(true);
    setTimeout(() => props.history.goBack(), 500);
  };

  /**
   * Issues two sequential queries for the sake of establishing a
   * bidirectional relationship between the patient and the doctor.
   */
  const assignPatientToDoctor = () => {
    UserQueries.assignPatientToDoctor(doctor, selectedPatient.id)
      .then(() =>
        UserQueries.assignDoctorToPatient(selectedPatient.id, doctor)
          .then(() => onAssignmentComplete())
          .catch(() => console.log("Association failed."))
      )
      .catch(() => console.log("Association failed."));
  };

  /**
   * Renders the patient card on the patient pool view.
   * @param {object} data Represents the patient object of the patient
   * list retrieved from the backend.
   */
  const DoctorPatientPool = data => {
    return (
      <IonCard button={true} onClick={() => onPatientClick(data.patient)}>
        <IonCardHeader>
          <IonCardTitle>{data.patient.name}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <Container>
            <Row>
              <IonLabel>Patient ID: {data.patient.id}</IonLabel>
            </Row>
            <Row>
              <IonLabel>Gender: {data.patient.gender}</IonLabel>
            </Row>
            <Row>
              <IonLabel>
                Date of Birth: {new Date(data.patient.dob).toDateString()}
              </IonLabel>
            </Row>
            <Row>
              <IonLabel>Email: {data.patient.email}</IonLabel>
            </Row>
          </Container>
        </IonCardContent>
      </IonCard>
    );
  };

  // Render the master view of the patient pool view.
  return (
    <IonPage>
      <BackButtonToolbar title={"Assign new Patient"} />
      <IonAlert
        isOpen={isSelectPromptOpen}
        onDidDismiss={() => setIsSelectPromptOpen(false)}
        header="Assign this Patient?"
        message={`Do you wish to take charge of ${selectedPatient.name}?`}
        buttons={[
          {
            text: "Yes",
            handler: () => assignPatientToDoctor()
          },
          {
            text: "No"
          }
        ]}
      />
      <IonAlert
        isOpen={isExitPromptOpen}
        onDidDismiss={() => props.history.goBack()}
        header="No patients found."
        message="Please try again later once there are available patients."
        buttons={["OK"]}
      />
      <IonToast
        isOpen={isToastDisplayed}
        onDidDismiss={() => setIsToastDisplayed(false)}
        message={`You are now in charge of ${selectedPatient.name}.`}
        duration={2000}
      />
      <IonContent className="ion-padding">
        {doctor && (
          <Fragment>
            {patients.length !== 0 &&
              patients.map((patient, index) => (
                <DoctorPatientPool key={index} patient={patient} />
              ))}
          </Fragment>
        )}
      </IonContent>
    </IonPage>
  );
};

export default withRouter(DoctorPatientPool);
