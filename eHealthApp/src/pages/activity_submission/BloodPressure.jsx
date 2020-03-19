import React, { useState } from "react";
import { IonItem, IonLabel, IonText, IonInput, IonIcon } from "@ionic/react";
import { withRouter } from "react-router-dom";
import ActivitySubmissionPage from "./ActivitySubmissionPage";
import { warning } from "ionicons/icons";
import { Collapse } from "react-bootstrap";

const BloodPressure = props => {
  const [diastolicPressure, setDiastolicPressure] = useState(-1);
  const [systolicPressure, setSystolicPressure] = useState(-1);
  const [validation, setValidation] = useState({
    sysError: false,
    diaError: false
  });
  const [validationMessage, setValidationMessage] = useState({
    sysError: "",
    diaError: ""
  });

  /**
   * Styling parameters
   */
  const styles = {
    label: {
      fontSize: "1.3em"
    },
    star: {
      fontSize: "1.4em"
    },
    warningIcon: { width: "30px", height: "30px", marginBottom: "-7px" }
  };

  /**
   * Handles the entry of the systolic pressure value
   * and validates the value. If the value is out of bounds
   * it sets the error to display.
   *
   * @param {String} value - The input fields value
   */
  const enterSystolicPressure = value => {
    if (value <= 300 && value >= 0) {
      setSystolicPressure(value);
      let val = { ...validation, sysError: false };
      setValidation(val);
    } else {
      setSystolicPressure(-1);
      let val = { ...validation, sysError: true };
      setValidation(val);
      let valMsg = {
        ...validationMessage,
        sysError:
          value > 300 ? "The value is too high" : "The value is too low."
      };
      setValidationMessage(valMsg);
    }
  };

  /**
   * Handles the entry of the diastolic pressure value
   * and validates the value. If the value is out of bounds
   * it sets the error to display.
   *
   * @param {String} value - The input fields value
   */
  const enterDiastolicPressure = value => {
    if (value <= 300 && value >= 0) {
      setDiastolicPressure(value);
      let val = { ...validation, diaError: false };
      setValidation(val);
    } else {
      setDiastolicPressure(-1);
      let val = { ...validation, diaError: true };
      setValidation(val);
      let valMsg = {
        ...validationMessage,
        diaError:
          value > 300 ? "The value is too high" : "The value is too low."
      };
      setValidationMessage(valMsg);
    }
  };

  return (
    <ActivitySubmissionPage
      submissionType="measurement"
      measurementType="BloodPressureReadings"
      validated={diastolicPressure != -1 && systolicPressure != -1}
      validateErrorMessage={
        "Please ensure all required fields have been provided without errors."
      }
      submitData={{
        diastolicPressure: diastolicPressure,
        systolicPressure: systolicPressure
      }}
      title="Blood pressure entry"
      patientId={props.match.params.patientid}
      successMessage="Your blood pressure reading has been submitted successfully."
      failMessage="Your blood pressure reading could not be submitted."
    >
      <IonItem style={{ marginTop: validation.sysError ? "-8px" : "-20px" }}>
        <IonLabel style={styles.label} position="stacked">
          Systolic Pressure (SYS){" "}
          {validation.sysError ? (
            <IonIcon icon={warning} style={styles.warningIcon} />
          ) : (
            <IonText style={styles.star} color="danger">
              *
            </IonText>
          )}
        </IonLabel>
        <IonInput
          className="enterSystolicPressure"
          type="number"
          placeholder="Enter the systolic pressure reading"
          clearInput
          onIonChange={e => {
            enterSystolicPressure(e.detail.value);
          }}
        />
        <Collapse in={validation.sysError}>
          <IonText style={{ color: "maroon" }}>
            {validationMessage.sysError}
          </IonText>
        </Collapse>
      </IonItem>
      <IonItem>
        <IonLabel style={styles.label} position="stacked">
          Diastolic Pressure (DIA){" "}
          {validation.diaError ? (
            <IonIcon icon={warning} style={styles.warningIcon} />
          ) : (
            <IonText style={styles.star} color="danger">
              *
            </IonText>
          )}
        </IonLabel>
        <IonInput
          className="enterDiatolicPressure"
          submit="submit"
          type="number"
          placeholder="Enter the diastolic pressure reading"
          clearInput
          onIonChange={e => {
            enterDiastolicPressure(e.detail.value);
          }}
        />
        <Collapse in={validation.diaError}>
          <IonText style={{ color: "maroon" }}>
            {validationMessage.diaError}
          </IonText>
        </Collapse>
      </IonItem>
    </ActivitySubmissionPage>
  );
};

export default withRouter(BloodPressure);
