import React from "react";
import walk_img from "../../resources/walk.png";
import run_img from "../../resources/run.png";
import cycle_img from "../../resources/cycle.png";
import weight_img from "../../resources/weight.png";
import {
  IonCard,
  IonCardHeader,
  IonIcon,
  IonLabel,
  IonCardContent,
  IonList
} from "@ionic/react";
import moment from "moment";
import { heart } from "ionicons/icons";
import { Accordion, Row, Col, Image } from "react-bootstrap";
import ACTIVITY_TYPES from "../../enums/ActivityTypes";

const RecordCard = props => {
  const activityType = Object.keys(props.data).length
    ? props.data.id.split("_")[0]
    : "";

  const styles = {
    iconimg: {
      width: "20px",
      height: "20px",
      margin: "auto"
    },
    cycleImg: {
      width: "30px",
      height: "20px",
      margin: "auto"
    }
  };

  const formatValue = value => {
    return (Math.round(value * 100) / 100).toFixed(2);
  };

  const renderActivityTitle = activityType => {
    switch (activityType) {
      case ACTIVITY_TYPES.BLOOD_PRESSURE_READING:
        return <h2>Blood pressure</h2>;
      case ACTIVITY_TYPES.WEIGHT_READING:
        return <h2>Weight</h2>;
      case ACTIVITY_TYPES.CYCLING:
        return <h2>Cycling</h2>;
      case ACTIVITY_TYPES.RUNNING:
        return <h2>Running</h2>;
      case ACTIVITY_TYPES.WALKING:
        return <h2>Walking</h2>;
      default:
        return <h2>Exercise</h2>;
    }
  };

  const renderActivityValues = (activityType, data) => {
    // let date = new Date(data.timestamp).toLocaleTimeString().slice(0, 5);
    const date = moment(data.timestamp).format("HH:mm");
    const startDate = moment(data.startTime).format("HH:mm");
    const endDate = moment(data.endTime).format("HH:mm");

    switch (activityType) {
      case ACTIVITY_TYPES.BLOOD_PRESSURE_READING:
        return (
          <div>
            <IonLabel>
              Diastolic pressure: {data.diastolicPressure}mmHg
            </IonLabel>
            <IonLabel>Systolic pressure: {data.systolicPressure}mmHg</IonLabel>
            <IonLabel>Time submitted: {date}</IonLabel>
          </div>
        );
      case ACTIVITY_TYPES.WEIGHT_READING:
        // date = new Date(data.timestamp);
        return (
          <div>
            <IonLabel>Weight: {data.weight.toFixed(2)}kg</IonLabel>
            <IonLabel>Time submitted: {date}</IonLabel>
          </div>
        );
      case ACTIVITY_TYPES.CYCLING:
        // const startDate = new Date(data.startTime)
        //   .toLocaleTimeString()
        //   .slice(0, 5);
        // const endDate = new Date(data.endTime).toLocaleTimeString().slice(0, 5);
        return (
          <div>
            {data.caloriesBurnt && (
              <IonLabel>
                Calories burnt:{" "}
                {data.caloriesBurnt === -1
                  ? "N/A"
                  : data.caloriesBurnt.toFixed(2)}
              </IonLabel>
            )}
            {data.distance && (
              <IonLabel>
                Distance travelled: {data.distance.toFixed(2)}km
              </IonLabel>
            )}
            <IonLabel>Start time: {startDate}</IonLabel>
            <IonLabel>End time: {endDate}</IonLabel>
            <IonLabel>Time submitted: {endDate}</IonLabel>
            <IonLabel>
              Duration:{" "}
              {moment
                .utc(moment(data.endTime).diff(moment(data.startTime)))
                .format("HH:mm:ss")}
            </IonLabel>
          </div>
        );
      case ACTIVITY_TYPES.RUNNING:
        // const startDate2 = new Date(data.startTime)
        //   .toLocaleTimeString()
        //   .slice(0, 5);
        // const endDate2 = new Date(data.endTime)
        //   .toLocaleTimeString()
        //   .slice(0, 5);
        return (
          <div>
            {data.caloriesBurnt && (
              <IonLabel>
                Calories burnt:{" "}
                {data.caloriesBurnt === -1
                  ? "N/A"
                  : data.caloriesBurnt.toFixed(2)}
              </IonLabel>
            )}
            {data.distance && (
              <IonLabel>
                Distance travelled: {data.distance.toFixed(2)}km
              </IonLabel>
            )}
            {data.steps && (
              <IonLabel>
                Steps taken: {data.steps === -1 ? "N/A" : data.steps}
              </IonLabel>
            )}
            <IonLabel>Start time: {startDate}</IonLabel>
            <IonLabel>End time: {endDate}</IonLabel>
            <IonLabel>Time submitted: {endDate}</IonLabel>
            <IonLabel>
              Duration:{" "}
              {moment
                .utc(moment(data.endTime).diff(moment(data.startTime)))
                .format("HH:mm:ss")}
            </IonLabel>
          </div>
        );
      case ACTIVITY_TYPES.WALKING:
        // const startDate3 = new Date(data.startTime)
        //   .toLocaleTimeString()
        //   .slice(0, 5);
        // const endDate3 = new Date(data.endTime)
        //   .toLocaleTimeString()
        //   .slice(0, 5);
        return (
          <div>
            {data.caloriesBurnt && (
              <IonLabel>
                Calories burnt:{" "}
                {data.caloriesBurnt === -1
                  ? "N/A"
                  : data.caloriesBurnt.toFixed(2)}
              </IonLabel>
            )}
            {data.distance && (
              <IonLabel>
                Distance travelled: {data.distance.toFixed(2)}km
              </IonLabel>
            )}
            {data.steps && (
              <IonLabel>
                Steps taken: {data.steps === -1 ? "N/A" : data.steps}
              </IonLabel>
            )}
            <IonLabel>Start time: {startDate}</IonLabel>
            <IonLabel>End time: {endDate}</IonLabel>
            <IonLabel>Time submitted: {endDate}</IonLabel>
            <IonLabel>
              Duration:{" "}
              {moment
                .utc(moment(data.endTime).diff(moment(data.startTime)))
                .format("HH:mm:ss")}
            </IonLabel>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const renderActivityValue = (activityType, data) => {
    var date;
    switch (activityType) {
      case ACTIVITY_TYPES.BLOOD_PRESSURE_READING:
      case ACTIVITY_TYPES.WEIGHT_READING:
        date = data.timestamp;
        break;
      case ACTIVITY_TYPES.CYCLING:
      case ACTIVITY_TYPES.RUNNING:
      case ACTIVITY_TYPES.WALKING:
        date = data.endTime;
        break;
    }
    return <div>{date ? moment(date).format("HH:mm") : ""}</div>;
  };

  return (
    <Accordion>
      <IonCard key={props.index} className={props.index}>
        <Accordion.Toggle as={IonCardHeader} eventKey={props.index}>
          <Row>
            <Col xs="2">
              {activityType === ACTIVITY_TYPES.BLOOD_PRESSURE_READING && (
                <div style={styles.iconimg}>
                  <IonIcon icon={heart} style={styles.iconimg} />
                </div>
              )}
              {activityType === ACTIVITY_TYPES.WEIGHT_READING && (
                <div style={styles.iconimg}>
                  <Image src={weight_img} style={styles.iconimg} />
                </div>
              )}
              {activityType === ACTIVITY_TYPES.CYCLING && (
                <Image src={cycle_img} style={styles.cycleImg} />
              )}
              {activityType === ACTIVITY_TYPES.RUNNING && (
                <Image src={run_img} style={styles.iconimg} />
              )}
              {activityType === ACTIVITY_TYPES.WALKING && (
                <Image src={walk_img} style={styles.iconimg} />
              )}
            </Col>
            <Col xs="6">
              <IonLabel style={styles.title}>
                {renderActivityTitle(activityType)}
              </IonLabel>
            </Col>
            <Col xs="4">
              <IonLabel style={styles.value}>
                <h3>{props.data.value}</h3>
                {renderActivityValue(activityType, props.data)}
              </IonLabel>
            </Col>
          </Row>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={props.index}>
          <IonCardContent>
            {renderActivityValues(activityType, props.data)}
          </IonCardContent>
        </Accordion.Collapse>
      </IonCard>
    </Accordion>
  );
};

export default RecordCard;
