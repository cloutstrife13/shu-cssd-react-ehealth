/*
The purpose of the filter overview page is to display the different options for the user to select that then allows them to 
filter the list of activities. It works by passing the selected filter variable and state function to this component. When the user
selects an activity type that they wish to filter by, it uses the setSelectedFilterHandler function to update the state. The selectedFilter
variable is used to remember which of the filter options was selected, so whenever the page is rerendered, The pre-selected options are always checked.

Author: Daniel Madu
*/

import React from "react";
import {
  IonPage,
  IonContent,
  IonFooter,
  IonButton,
  IonTitle,
  IonLabel,
  IonList,
  IonItem,
  IonCheckbox,
  IonRadioGroup,
  IonRadio,
  IonListHeader
} from "@ionic/react";

const FilterOverview = props => {
  const style = {
    label: {
      marginLeft: "20px"
    }
  };

  /*
    The below variables are used to store the date from 7 days ago, 14 days ago, and 30 dayas ago. This is used when the user selects which date they want to
    the activities by and is updated on the selectedDateFilter state.
  */
  const todaysDate = new Date();
  const date = new Date(todaysDate.toDateString());

  let sevenDaysDate = new Date(date);
  sevenDaysDate.setDate(date.getDate() - 7);

  let fourteenDaysDate = new Date(date);
  fourteenDaysDate.setDate(date.getDate() - 14);

  let thirtyDaysDate = new Date(date);
  thirtyDaysDate.setDate(date.getDate() - 30);

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <IonList>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("BloodPressureReading")}
              onClick={() =>
                props.setSelectedFilterHandler("BloodPressureReading")
              }
              color="danger"
              value="BloodPressureReading"
            ></IonCheckbox>
            <IonLabel style={style.label}>Blood pressure</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Running")}
              onClick={() => props.setSelectedFilterHandler("Running")}
              color="primary"
              value="Running"
            ></IonCheckbox>
            <IonLabel style={style.label}>Run</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Walking")}
              onClick={() => props.setSelectedFilterHandler("Walking")}
              color="secondary"
              value="Walking"
            ></IonCheckbox>
            <IonLabel style={style.label}>Walk</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("Cycling")}
              onClick={() => props.setSelectedFilterHandler("Cycling")}
              color="danger"
              value="Cycling"
            ></IonCheckbox>
            <IonLabel style={style.label}>Cycle</IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox
              checked={props.selectedFilter.includes("WeightReading")}
              onClick={() => props.setSelectedFilterHandler("WeightReading")}
              color="primary"
              value="WeightReading"
            ></IonCheckbox>
            <IonLabel style={style.label}>Weight</IonLabel>
          </IonItem>
        </IonList>

        <IonList>
          <IonRadioGroup
            value={props.selectedDateFilter}
            onClick={e => props.setSelectedDateFilterHandler(e.target.value)}
          >
            <IonListHeader>
              <IonLabel>Upload Date</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonRadio slot="start" value={sevenDaysDate.toDateString()} />
              <IonLabel>Last 7 days</IonLabel>
            </IonItem>

            <IonItem>
              <IonRadio slot="start" value={fourteenDaysDate.toDateString()} />
              <IonLabel>Last 14 days</IonLabel>
            </IonItem>

            <IonItem>
              <IonRadio slot="start" value={thirtyDaysDate.toDateString()} />
              <IonLabel>Last 30 days</IonLabel>
            </IonItem>
          </IonRadioGroup>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonButton
          size="large"
          expand="block"
          onClick={() => props.setDisplayFilter(false)}
        >
          <IonTitle>Apply</IonTitle>
        </IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default FilterOverview;
