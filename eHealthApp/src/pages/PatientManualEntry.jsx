/*
The manual health data submission page.
Lists various options to submit health data to the app manually.

Author: Gergo Kekesi
*/

import React, { useState } from "react";
import { IonPage, IonContent, IonList, IonCardContent } from "@ionic/react";
import BackButtonToolbar from "./../components/BackButtonToolbar";
import exercise_img from "../resources/exercise.jpg";
import blood_pressure_img from "../resources/blood_pressure.jpg";
import weight_img from "../resources/weight_scale.jpg";
import walk_img from "../resources/walk.png";
import run_img from "../resources/run.png";
import cycle_img from "../resources/cycle.png";
import { Collapse } from "react-bootstrap";
import ImageCard from "../components/ImageCard";
import IconButtonContainer from "./../components/IconButtonContainer";
import IconButton from "../components/IconButton";

import { withRouter } from "react-router-dom";

/*
props:
 */
const ManualEntry = props => {
  const [exerciseOptionsOpen, setExerciseOptionsOpen] = useState(false);

  const patientId = props.match.params.patientid || "unknown";

  return (
    <IonPage>
      <BackButtonToolbar title={"Select an activity"} />
      <IonContent className="ion-padding">
        <IonList>
          <ImageCard
            className="exercise"
            title="Exercise"
            image={exercise_img}
            onClick={() => {
              setExerciseOptionsOpen(!exerciseOptionsOpen);
            }}
          >
            {console.log(props)}

            <Collapse in={exerciseOptionsOpen}>
              <IonCardContent>
                <IconButtonContainer style={{ width: "100%", height: "50px" }}>
                  <IconButton
                    image={walk_img}
                    onClick={() =>
                      props.history.push(
                        `/patient/${patientId}/activities/manualentry-add/exercise/walking`
                      )
                    }
                    ripple
                  />
                  <IconButton
                    image={run_img}
                    onClick={() =>
                      props.history.push(
                        `/patient/${patientId}/activities/manualentry-add/exercise/running`
                      )
                    }
                    ripple
                  />
                  <IconButton
                    image={cycle_img}
                    onClick={() =>
                      props.history.push(
                        `/patient/${patientId}/activities/manualentry-add/exercise/cycling`
                      )
                    }
                    ripple
                  />
                </IconButtonContainer>
              </IonCardContent>
            </Collapse>
          </ImageCard>
          <ImageCard
            className="bloodpressure"
            title="Blood Pressure"
            image={blood_pressure_img}
            onClick={() =>
              props.history.push(
                `/patient/${patientId}/activities/manualentry-add/bloodpressure`
              )
            }
          />
          <ImageCard
            className="weight"
            title="Weight"
            image={weight_img}
            onClick={() =>
              props.history.push(
                `/patient/${patientId}/activities/manualentry-add/weight`
              )
            }
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(ManualEntry);
