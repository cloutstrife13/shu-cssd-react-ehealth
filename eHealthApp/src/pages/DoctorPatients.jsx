/*
Add description

Author: Daniel Madu
*/

import React, { Fragment, useState } from "react";
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonLabel,
  useIonViewWillEnter
} from "@ionic/react";
import { add } from "ionicons/icons";
import LogoutButtonToolbar from "../components/LogoutButtonToolbar";
import UserQueries from "../queries/UserQueries";
import PatientCard from "../components/PatientCard";

/*props:
 */
const DoctorPatients = props => {
  const doctor = props.match.params.docid;

  const [patients, setPatients] = useState([]);
  const [isDemo] = useState(doctor.includes("Test"));

  /**
   * When the patients screen loads, all the available patients for that doctor
   * are retrieved and stored in the state.
   */
  useIonViewWillEnter(() => {
    UserQueries.getPatientsByDoctorId(doctor).then(res => {
      setPatients(res);
    });
  });

  return (
    <IonPage>
      <LogoutButtonToolbar title={"My Patients"} />
      <IonContent className="ion-padding">
        {doctor && (
          <Fragment>
            {patients.length !== 0 &&
              patients.map((patient, index) => (
                <PatientCard key={index} patient={patient} doctor={doctor} />
              ))}
            {patients.length === 0 && (
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>No patients assigned</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonLabel>
                    Use the add button located at the bottom right corner of the
                    screen in order to assign a new patient.
                  </IonLabel>
                </IonCardContent>
              </IonCard>
            )}
          </Fragment>
        )}
        {/*Floating action button*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton
            disabled={isDemo}
            color="secondary"
            routerDirection="forward"
            routerLink={`/doctor/${doctor}/mypatients-add`}
          >
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        {/* {console.log("PROPS:", props)} */}
      </IonContent>
    </IonPage>
  );
};

export default DoctorPatients;
