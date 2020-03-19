/*
The main entry point for the application, containing the rendering routes
as well as all the styling imports by Ionic.

Author: Gergo Kekesi
*/

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Bootstrap */
import "bootstrap/dist/css/bootstrap.min.css";

/* Routing variables */
import "./theme/variables.css";

/*Page Components */
import Home from "./pages/Home";
import PatientActivities from "./pages/PatientActivities";
import PatientDevices from "./pages/PatientDevices";
import PatientManualEntry from "./pages/PatientManualEntry";
import DoctorPatients from "./pages/DoctorPatients";
import Exercise from "./pages/activity_submission/Exercise";
import BloodPressure from "./pages/activity_submission/BloodPressure";
import Weight from "./pages/activity_submission/Weight";
import DoctorPatientDetails from "./pages/DoctorPatientDetails";
import DoctorPatientPool from "./pages/DoctorPatientPool";
import Entry from "./pages/Entry";

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/entry" component={Entry} exact={true} />
        <Route path="/demo" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/entry" />} />

        <Route
          path="/patient/:patientid/activities"
          component={PatientActivities}
          exact={true}
        />
        <Route
          path="/patient/:patientid/activities/devicesync"
          component={PatientDevices}
          exact={true}
        />
        <Route
          path="/patient/:patientid/activities/manualentry"
          component={PatientManualEntry}
          exact={true}
        />
        <Route
          path="/patient/:patientid/activities/manualentry-add/exercise/:type"
          component={Exercise}
        />
        <Route
          path="/patient/:patientid/activities/manualentry-add/bloodpressure"
          component={BloodPressure}
          exact={true}
        />
        <Route
          path="/patient/:patientid/activities/manualentry-add/weight"
          component={Weight}
          exact={true}
        />
        <Route
          path="/doctor/:docid/mypatients"
          component={DoctorPatients}
          exact={true}
        />
        <Route
          path="/doctor/:docid/mypatients-manage/:patientid/:patientname"
          component={DoctorPatientDetails}
        />
        <Route
          path="/doctor/:docid/mypatients-add"
          component={DoctorPatientPool}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
