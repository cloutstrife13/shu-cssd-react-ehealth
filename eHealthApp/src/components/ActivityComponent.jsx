import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/react";
import { PropTypes } from "prop-types";

const ActivityComponent = props => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{props.type}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{props.children}</IonCardContent>
    </IonCard>
  );
};

ActivityComponent.propTypes = {
  type: PropTypes.string.isRequired
};

export default ActivityComponent;
