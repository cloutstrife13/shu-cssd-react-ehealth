/**
 *
 * The following module contains queries used to retrieve and upload
 * user related information to the database. It uses the BackendAccess
 * class to interact with the backend and make the calls.
 *
 */

import BackendAccess from "../utilities/BackendAccess";

var UserQueries = {};

/**
 * Retrieves all the patients available in the database
 * @returns A list of patient objects from the database
 */
UserQueries.getAllPatients = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients"
  });
};

/**
 * Issues the request to retrieve all fictional patients for demo purposes.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
UserQueries.getAllTestPatients = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: "contains(id, 'Test')"
    }
  });
};

/**
 * Retrieves all the doctors available in the database
 * @returns A list of doctor objects from the database
 */
UserQueries.getAllDoctors = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Doctors"
  });
};

/**
 * Issues the request to retrieve all fictional doctors for demo purposes.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
UserQueries.getAllTestDoctors = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Doctors",
    query: {
      $filter: "contains(id, 'Test')"
    }
  });
};

/**
 * Issues the request to retrieve all unassigned patients.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
UserQueries.getAllUnassignedPatients = () => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: "doctor eq null"
    }
  });
};

/**
 * Retrieves the patients related to the doctor by their ID
 *
 * @param {String} doctorId - The ID of the doctor
 * @returns The patients related to the doctor
 */
UserQueries.getPatientsByDoctorId = doctorId => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: `doctor/ID eq '${doctorId}'`
    }
  });
};

/**
 * Retrieves a patient by their ID
 *
 * @param {String} patientId - The ID of the patient
 * @returns A patient object
 */
UserQueries.getPatientById = patientId => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Patients",
    query: {
      $filter: `ID eq '${patientId}'`
    }
  });
};

/**
 * Issues the request to associate a patient to a doctor.
 * @param {string} doctorId Represents the ID of the doctor.
 * @param {string} patientId Represents the ID of the patient.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
UserQueries.assignPatientToDoctor = (doctorId, patientId) => {
  return BackendAccess.IssueODataRequest({
    requestType: "PUT",
    entityType: "Doctors",
    entityID: doctorId,
    entityBody: {
      patients: [{ ID: patientId }]
    }
  });
};

/**
 * Issues the request to associate a doctor to a patient.
 * @param {string} patientId Represents the ID of the patient.
 * @param {string} doctorId Represents the ID of the doctor.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
UserQueries.assignDoctorToPatient = (patientId, doctorId) => {
  return BackendAccess.IssueODataRequest({
    requestType: "PUT",
    entityType: "Patients",
    entityID: patientId,
    entityBody: {
      doctor: { ID: doctorId }
    }
  });
};

export default UserQueries;
