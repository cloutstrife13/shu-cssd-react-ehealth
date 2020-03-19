import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { createSerializer } from "enzyme-to-json";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
import toJson from "enzyme-to-json";
import PatientManualEntry from "./PatientManualEntry";

describe("<PatientManualEntry />", () => {
  it("test", () => {
    expect(true).toEqual(true);
  });
  it("it should render a Manual Entry component snapshot", () => {
    let p = { match: { params: { patientid: "TestPatient-7" } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("it should render the exercise card", () => {
    let p = { match: { params: { patientid: "TestPatient-7" } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".exercise")).toHaveLength(1);
  });

  it("it should render the blood pressure card", () => {
    let p = { match: { params: { patientid: "TestPatient-7" } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".bloodpressure")).toHaveLength(1);
  });

  it("it should render the weight card", () => {
    let p = { match: { params: { patientid: "TestPatient-8" } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".weight")).toHaveLength(1);
  });

  it("it should render the exercise card, with empty patient id", () => {
    let p = { match: { params: { patientid: "" } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".exercise")).toHaveLength(1);
  });

  it("it should render the blood pressure card, with empty patient id", () => {
    let p = { match: { params: { patientid: "" } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".bloodpressure")).toHaveLength(1);
  });

  it("it should render the weight card, with empty patient id", () => {
    let p = { match: { params: { patientid: "" } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".weight")).toHaveLength(1);
  });

  it("it should render the exercise card, with patient id of null", () => {
    let p = { match: { params: { patientid: null } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".exercise")).toHaveLength(1);
  });

  it("it should render the blood pressure card, with patient id of null", () => {
    let p = { match: { params: { patientid: null } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".bloodpressure")).toHaveLength(1);
  });

  it("it should render the weight card, with patient id of null", () => {
    let p = { match: { params: { patientid: null } } };
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <PatientManualEntry match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(wrapper.find(".weight")).toHaveLength(1);
  });
});
