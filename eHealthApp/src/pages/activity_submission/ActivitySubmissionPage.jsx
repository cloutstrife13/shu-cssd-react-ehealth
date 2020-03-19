import React, { useState } from "react";
import { IonPage, IonContent, IonAlert } from "@ionic/react";
import { withRouter } from "react-router-dom";

import ActivityQueries from "./../../queries/ActivityQueries";
import BackButtonToolbar from "../../components/BackButtonToolbar";
import FooterSubmitButton from "./../../components/FooterSubmitButton";

// Container to store Observers
const observers = [];

/**
 * Attaches a new Observer to the list of Observers
 * To use this function in other components, it need to be exported first
 * @param {Function} observer
 */

export const attachObserver = observer => {
  observers.push(observer);
};

const ActivitySubmissionPage = props => {
  const [showSubmitAlert, setShowSubmitAlert] = useState(false);
  const [submitAlertContent, setSubmitAlertContent] = useState(false);
  const HEADER = {
    SUCCESS: "Submission successful.",
    FAIL: "Submission failed!"
  };

  /**
   * Submit the measurement data.
   * Uses the submitData prop to submit the data added by components that use this component
   * It also sets the alert message based on a successful upload
   */
  const submitMeasurement = () => {
    ActivityQueries.uploadNewMeasurement(props.patientId, {
      type: props.measurementType,
      data: { ...props.submitData }
    })
      .then(res => {
        if (res && res.ID && res.ID.length > 0) {
          setSubmitAlertContent({
            header: HEADER.SUCCESS,
            message: props.successMessage
          });
        } else {
          setSubmitAlertContent({
            header: HEADER.FAIL,
            message: props.failMessage
          });
        }
        setShowSubmitAlert(true);
      })
      .catch(() => {
        setSubmitAlertContent({
          header: HEADER.FAIL,
          message: props.failMessage
        });
        setShowSubmitAlert(true);
      });
  };

  /**
   * Submit the exercise data.
   * Uses the submitData prop to submit the data added by components that use this component
   * It also sets the alert message based on a successful upload
   */
  const submitExercise = () => {
    ActivityQueries.uploadNewExercise(props.patientId, {
      type: props.measurementType,
      data: { ...props.submitData }
    }).then(res => {
      if (res && res.ID && res.ID.length > 0) {
        setSubmitAlertContent({
          header: "Submission successful.",
          message: props.successMessage
        });
      } else {
        setSubmitAlertContent({
          header: "Submission failed!",
          message: props.failMessage
        });
      }
      setShowSubmitAlert(true);
    });
  };

  /**
   * Notifies the observers
   */
  const notifyObservers = () => {
    observers.forEach(observer => observer());
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={showSubmitAlert}
        onDidDismiss={() => {
          setShowSubmitAlert(false);
          submitAlertContent.header === HEADER.SUCCESS &&
            props.history.goBack();
        }}
        header={submitAlertContent.header}
        message={submitAlertContent.message}
        buttons={["OK"]}
      />
      <BackButtonToolbar title={props.title} />
      <IonContent className="ion-padding">{props.children}</IonContent>
      <FooterSubmitButton
        onSubmit={() => {
          console.log(props.submitData);
          if (props.validated) {
            if (props.submissionType === "measurement") {
              submitMeasurement();
            } else {
              submitExercise();
            }
          } else {
            setSubmitAlertContent({
              header: HEADER.FAIL,
              message: props.validateErrorMessage
            });
            setShowSubmitAlert(true);
          }
          notifyObservers();
        }}
      />
    </IonPage>
  );
};

export default withRouter(ActivitySubmissionPage);
