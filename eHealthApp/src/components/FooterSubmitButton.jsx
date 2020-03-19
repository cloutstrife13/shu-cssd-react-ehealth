import React from "react";
import { IonFooter, IonButton } from "@ionic/react";

const FooterSubmitButton = props => {
  return (
    <IonFooter>
      <IonButton
        color="secondary"
        expand="block"
        size="large"
        onClick={props.onSubmit}
      >
        Submit
      </IonButton>
    </IonFooter>
  );
};

export default FooterSubmitButton;
