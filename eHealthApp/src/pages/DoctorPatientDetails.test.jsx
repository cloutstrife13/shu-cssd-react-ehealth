import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { createSerializer } from "enzyme-to-json";
import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
import toJson from "enzyme-to-json";
import DoctorPatientDetails from "./DoctorPatientDetails";

// ActivityQueries.getActivitiesByDateRange;

describe("<DoctorPatientDetails />", () => {
  //   let result = [
  //     {
  //       steps: -1,
  //       caloriesBurnt: -1.0,
  //       startTime: "2020-03-18T06:06:46.682Z",
  //       endTime: "2020-03-18T06:06:46.682Z",
  //       distance: 60.0,
  //       timestamp: "2020-03-18T06:06:46.681Z",
  //       patient: {
  //         doctor: {
  //           patients: [
  //             {
  //               name: "Aoife O'Connell",
  //               email: "aoife.na.heireann@outlook.ie",
  //               gender: "Female",
  //               dob: "1994-03-14T00:00:00Z",
  //               id: "TestPatient-3",
  //               model: {
  //                 uri: "http://www.ehealth.ie/semantics",
  //                 ignoreUnmappedProperties: false
  //               },
  //               uri: "http://www.ehealth.ie/semantics#TestPatient-3"
  //             },
  //             {
  //               name: "Elise Leclair",
  //               email: "elise.leclair13@outlook.fr",
  //               gender: "Female",
  //               dob: "1995-06-07T00:00:00Z",
  //               id: "TestPatient-4",
  //               model: {
  //                 uri: "http://www.ehealth.ie/semantics",
  //                 ignoreUnmappedProperties: false
  //               },
  //               uri: "http://www.ehealth.ie/semantics#TestPatient-4"
  //             },
  //             {
  //               name: "Roland Johannsen",
  //               email: "johannsenroland76@outlook.de",
  //               gender: "Male",
  //               dob: "1976-11-13T00:00:00Z",
  //               id: "TestPatient-5",
  //               model: {
  //                 uri: "http://www.ehealth.ie/semantics",
  //                 ignoreUnmappedProperties: false
  //               },
  //               uri: "http://www.ehealth.ie/semantics#TestPatient-5"
  //             }
  //           ],
  //           name: "Dr. Madeleine Girard",
  //           email: "madeleine.girard@ehs.com",
  //           gender: "Female",
  //           dob: "1995-11-01T00:00:00Z",
  //           id: "TestDoctor-1",
  //           model: {
  //             uri: "http://www.ehealth.ie/semantics",
  //             ignoreUnmappedProperties: false
  //           },
  //           uri: "http://www.ehealth.ie/semantics#TestDoctor-1"
  //         },
  //         name: "Genevieve Leblanc",
  //         email: "genevieve.la.toulousaine@outlook.fr",
  //         gender: "Female",
  //         dob: "1996-02-28T00:00:00Z",
  //         id: "TestPatient-7",
  //         model: {
  //           uri: "http://www.ehealth.ie/semantics",
  //           ignoreUnmappedProperties: false
  //         },
  //         uri: "http://www.ehealth.ie/semantics#TestPatient-7"
  //       },
  //       id: "Walking_060658_18032020",
  //       model: {
  //         uri: "http://www.ehealth.ie/semantics",
  //         ignoreUnmappedProperties: false
  //       },
  //       uri: "http://www.ehealth.ie/semantics#Walking_060658_18032020"
  //     }
  //   ];
  //   jest.mock("./PatientOverview", () => {
  //     setActivityList: jest.fn();
  //   });
  let p = {
    match: {
      params: {
        doc: "TestDoctor-1",
        patientid: "TestPatient-7",
        patientname: "Genevieve Leblanc"
      }
    }
  };
  it("it should render a Patient Overview component snapshot", () => {
    // ActivityQueries.getActivitiesByDateRange.mockImplementation(() => result);
    const wrapper = mount(
      <IonReactRouter>
        <IonRouterOutlet>
          <DoctorPatientDetails match={p} />
        </IonRouterOutlet>
      </IonReactRouter>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  //   it("it should render a Patient Overview component snapshot", () => {
  //     // setActivityList.mockImplementation(() => result);
  //     const wrapper = mount(
  //       <IonReactRouter>
  //         <IonRouterOutlet>
  //           <PatientOverview match={p} />
  //         </IonRouterOutlet>
  //       </IonReactRouter>
  //     );
  //     wrapper.instance().setActivityList = jest.fn();
  //     wrapper.update();
  //     expect(wrapper.find(".Walking_060658_18032020")).toHaveLength(1);
  //   });
});
