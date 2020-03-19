import React from "react";
import { Image } from "react-bootstrap";
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";

const ImageCard = props => {
  const styles = {
    card: {
      borderRadius: "10px",
      boxShadow: "0px 0px 7px grey"
    },
    cardImg: {
      width: "100%",
      height: "200px",
      objectFit: "cover"
    }
  };
  return (
    <IonCard style={styles.card}>
      <Image src={props.image} style={styles.cardImg} onClick={props.onClick} />
      <IonCardHeader>
        <IonCardTitle>{props.title}</IonCardTitle>
      </IonCardHeader>
      {props.children}
    </IonCard>
  );
};

export default ImageCard;
