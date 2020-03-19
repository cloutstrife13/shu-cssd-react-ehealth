import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { createSerializer } from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
import toJson from "enzyme-to-json";
import RecordCard from "./RecordCard";

describe("<RecordCard />", () => {
  let data = {
    weight: 45,
    timestamp: "2020-03-17T08:56:07.003Z",
    patient: {
      doctor: {
        patients: [
          {
            name: "Aoife O'Connell",
            email: "aoife.na.heireann@outlook.ie",
            gender: "Female",
            dob: "1994-03-14T00:00:00Z",
            id: "TestPatient-3",
            model: {
              uri: "http://www.ehealth.ie/semantics",
              ignoreUnmappedProperties: false
            },
            uri: "http://www.ehealth.ie/semantics#TestPatient-3"
          },
          {
            name: "Elise Leclair",
            email: "elise.leclair13@outlook.fr",
            gender: "Female",
            dob: "1995-06-07T00:00:00Z",
            id: "TestPatient-4",
            model: {
              uri: "http://www.ehealth.ie/semantics",
              ignoreUnmappedProperties: false
            },
            uri: "http://www.ehealth.ie/semantics#TestPatient-4"
          },
          {
            name: "Roland Johannsen",
            email: "johannsenroland76@outlook.de",
            gender: "Male",
            dob: "1976-11-13T00:00:00Z",
            id: "TestPatient-5",
            model: {
              uri: "http://www.ehealth.ie/semantics",
              ignoreUnmappedProperties: false
            },
            uri: "http://www.ehealth.ie/semantics#TestPatient-5"
          }
        ],
        name: "Dr. Madeleine Girard",
        email: "madeleine.girard@ehs.com",
        gender: "Female",
        dob: "1995-11-01T00:00:00Z",
        id: "TestDoctor-1",
        model: {
          uri: "http://www.ehealth.ie/semantics",
          ignoreUnmappedProperties: false
        },
        uri: "http://www.ehealth.ie/semantics#TestDoctor-1"
      },
      name: "Genevieve Leblanc",
      email: "genevieve.la.toulousaine@outlook.fr",
      gender: "Female",
      dob: "1996-02-28T00:00:00Z",
      id: "TestPatient-7",
      model: {
        uri: "http://www.ehealth.ie/semantics",
        ignoreUnmappedProperties: false
      },
      uri: "http://www.ehealth.ie/semantics#TestPatient-7"
    },
    name: "Genevieve Leblanc",
    email: "genevieve.la.toulousaine@outlook.fr",
    gender: "Female",
    dob: "1996-02-28T00:00:00Z",
    id: "TestPatient-7"
  };

  let className = "WeightReading_085607_17032020";
  let index = "WeightReading_085607_17032020";

  it("it should render the a Record Card component snapshot", () => {
    const wrapper = shallow(
      <RecordCard data={data} index={index} className={className} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("it should render a Record Card component", () => {
    const wrapper = shallow(
      <RecordCard data={data} index={index} className={className} />
    );
    expect(wrapper.find("." + className)).toHaveLength(1);
  });

  it("it should render a Record Card component", () => {
    const wrapper = shallow(
      <RecordCard data={{}} index={index} className={className} />
    );
    expect(wrapper.find("." + className)).toHaveLength(1);
  });
});
