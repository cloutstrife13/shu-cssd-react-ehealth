import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PatientCard from "./PatientCard";

import { createSerializer } from "enzyme-to-json";

expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));
import toJson from "enzyme-to-json";

describe("Patient", () => {
  let doctor = "TestDoctor-1";
  let patient = {
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
  };

  it("it should render a Patient component snapshot", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("it should render the patient's name", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-name")).toHaveLength(1);
  });

  it("it should render the patient's id", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-id")).toHaveLength(1);
  });

  it("it should render the patient's gender", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-gender")).toHaveLength(1);
  });

  it("it should render the patient's dob", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-dob")).toHaveLength(1);
  });

  it("it should render the patient's email", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-email")).toHaveLength(1);
  });
  // Patient name should be rendered
  it("it should render the patient's name", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-name").text()).toEqual("Genevieve Leblanc");
  });

  it("it should render the patient's id", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-id").text()).toEqual(
      "Patient ID: TestPatient-7"
    );
  });

  it("it should render the patient's gender", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-gender").text()).toEqual("Gender: Female");
  });

  it("it should render the patient's dob", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-dob").text()).toEqual(
      "Date of Birth: Wed Feb 28 1996"
    );
  });

  it("it should render the patient's email", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={doctor} />);
    expect(wrapper.find(".patient-email").text()).toEqual(
      "Email: genevieve.la.toulousaine@outlook.fr"
    );
  });

  // Fail cases

  it("it should not render the patient's name when the patient obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={{}} doctor={doctor} />);
    expect(wrapper.find(".patient-name").text()).toEqual("");
  });

  it("it should render not the patient's id when the patient obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={{}} doctor={doctor} />);
    expect(wrapper.find(".patient-id").text()).toEqual("Patient ID: ");
  });

  it("it should render not the patient's gender when the patient obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={{}} doctor={doctor} />);
    expect(wrapper.find(".patient-gender").text()).toEqual("Gender: ");
  });

  it("it should render not the patient's dob when the patient obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={{}} doctor={doctor} />);
    expect(wrapper.find(".patient-dob").text()).toEqual(
      "Date of Birth: Invalid Date"
    );
  });

  it("it should render not the patient's email when the patient obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={{}} doctor={doctor} />);
    expect(wrapper.find(".patient-email").text()).toEqual("Email: ");
  });

  // doctor obj not provided
  it("it should not render the patient's name when the patient obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={{}} />);
    expect(wrapper.find(".patient-name").text()).toEqual("Genevieve Leblanc");
  });

  it("it should render not the patient's id when the doctor obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={{}} />);
    expect(wrapper.find(".patient-id").text()).toEqual(
      "Patient ID: TestPatient-7"
    );
  });

  it("it should render not the patient's gender when the doctor obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={{}} />);
    expect(wrapper.find(".patient-gender").text()).toEqual("Gender: Female");
  });

  it("it should render not the patient's dob when the doctor obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={{}} />);
    expect(wrapper.find(".patient-dob").text()).toEqual(
      "Date of Birth: Wed Feb 28 1996"
    );
  });

  it("it should render not the patient's email when the doctor obj is not provided", () => {
    const wrapper = shallow(<PatientCard patient={patient} doctor={{}} />);
    expect(wrapper.find(".patient-email").text()).toEqual(
      "Email: genevieve.la.toulousaine@outlook.fr"
    );
  });
});
