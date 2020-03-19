// MyComponent.test.js
import React from "react";
import { shallow } from "enzyme";
import PatientDevices from "../pages/PatientDevices";

describe("PatientDevices", () => {
  it("should render my component", () => {
    const wrapper = shallow(<PatientDevices />);
  });
});
