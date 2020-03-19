import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonItem,
  IonImg,
  IonList,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/react";
import { sync, add } from "ionicons/icons";
import { withRouter } from "react-router-dom";

import ActivityQueries from "../queries/ActivityQueries";
import RecordCard from "../components/record_cards/RecordCard";
import LogoutButtonToolbar from "../components/LogoutButtonToolbar";
import { attachObserver } from "../pages/activity_submission/ActivitySubmissionPage";
import BluetoothSynchronisationManager from "../bluetooth/managers/BluetoothSynchronisationManager";
import pencil from "../resources/pencil.png";
import "./PatientActivities.css";

const PatientActivities = props => {
  // Holders for the component's state
  const [todaysActivities, setTodaysActivities] = useState([]);

  // Styles for all components
  const styles = {
    list: {
      width: "100%"
    }
  };

  // Setting the selected patient using default values
  const patientId = props.match.params.patientid || "unknown";
  // Instantiating the component to IonSpinner
  // This will be shown if the data cannot be fetched from the database
  let activitiesComponent = <IonSpinner />;

  /**
   * When component renders:
   * - Attach an observer to BluetoothSynchronisationManager to be notified when new data is available from bluetooth devices
   * - Attach an observer to ActivitySubmissionPage to be notified when new data is available from manual entry
   * - Fetches activities from the database
   */
  useEffect(() => {
    BluetoothSynchronisationManager.attachObserver(onNewDataAvailable);
    attachObserver(onNewDataAvailable);

    getActivities();
  }, []);

  /**
   * Callback used in Observer pattern by BluetoothSynchronisationManager
   * When the data changes in BSM, this function is called
   * And as a result, it fetches the data from the database
   */
  const onNewDataAvailable = () => {
    getActivities();
  };

  /**
   * Returns the correct component for Today's activities based on the content of
   * todaysActivities array
   * For no activities, displays 'No Activity' card
   * For one or more activities, displays them as RecordCard component
   */
  const handleActivitiesComponentChange = () => {
    if (todaysActivities.length === 0) {
      return (
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>No activity today</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              No activity for today. Synchronize your devices or add an entry
              manually using the plus button below.
            </p>
          </IonCardContent>
        </IonCard>
      );
    } else if (todaysActivities.length > 0) {
      return (
        <IonItem>
          <IonList style={styles.list}>
            {todaysActivities.map(activity => {
              return (
                <RecordCard
                  key={activity.id}
                  index={activity.id}
                  data={activity}
                />
              );
            })}
          </IonList>
        </IonItem>
      );
    } else {
      return activitiesComponent;
    }
  };

  /**
   * Fetches the today's activities from the database
   * Activities are fetched for the chosen patient
   * The activities are sorted descendingly, based on the submission time
   */
  const getActivities = () => {
    const todayDate = new Date();
    const formatedDate = new Date(todayDate.setDate(todayDate.getDate()))
      .toISOString()
      .slice(0, 10);

    ActivityQueries.getActivitiesByDateRange(
      patientId,
      formatedDate,
      formatedDate
    ).then(async res => {
      if (res.length > 0) {
        const sortArray = arr =>
          arr.sort((a, b) => {
            return (
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
          });
        const sortedArray = await sortArray(res);
        setTodaysActivities(res);
      }
    });
  };

  return (
    <IonPage>
      <LogoutButtonToolbar title="Today: My Activities" />
      <IonContent className="ion-padding">
        {/*Activity*/}
        {handleActivitiesComponentChange()}
        {/*Floating action button*/}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="secondary">
            <IonIcon icon={add} />
          </IonFabButton>

          <IonFabList side="top">
            <IonFabButton
              color="tertiary"
              routerDirection="forward"
              routerLink={`/patient/${patientId}/activities/devicesync`}
              data-desc="Synchronize"
            >
              <IonIcon icon={sync} />
            </IonFabButton>
            <IonFabButton
              color="tertiary"
              routerDirection="forward"
              routerLink={`/patient/${patientId}/activities/manualentry`}
              data-desc="Manual entry"
            >
              <IonImg src={pencil} style={{ width: "20px", height: "20px" }} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(PatientActivities);
