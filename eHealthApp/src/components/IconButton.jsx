import React from "react";
import { IonImg, IonRippleEffect } from "@ionic/react";

const IconButton = props => {
  const styles = {
    rippleOption: {
      overflow: "hidden",
      position: "relative",
      borderRadius: "20px"
    },
    exerciseTypeImg: {
      display: "block",
      margin: "auto",
      width: "40px",
      height: "40px"
    },
    rippleContainer: {
      width: "50px",
      height: "50px"
    }
  };
  return (
    <div style={styles.exerciseIcons}>
      <div
        style={{
          ...styles.rippleContainer,
          ...styles.rippleOption
        }}
        className="ion-activatable"
        onClick={props.onClick}
      >
        <IonImg
          src={props.image}
          style={{
            ...styles.exerciseTypeImg
          }}
        />
        {props.ripple ? <IonRippleEffect /> : null}
      </div>
    </div>
  );
};

export default IconButton;
