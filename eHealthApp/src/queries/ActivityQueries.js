/**
 *
 * The following module contains queries used to retrieve and upload
 * activity related information to the database. It uses the BackendAccess
 * class to interact with the backend and make the calls.
 *
 */

import BackendAccess from "../utilities/BackendAccess";

var ActivityQueries = {};

/**
 * The following query will retrieve the activities for the given patient
 * between the provided from and to times.
 *
 * @param {String} patientID - The id of the patient
 * @param {String} from - ISO string formatted timestamp
 * @param {String} to - ISO string formatted timestamp
 * @returns A list of activities within the specified date range added by the user with patientID
 * */
ActivityQueries.getActivitiesByDateRange = (patientID, from, to) => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Activities",
    query: {
      $filter: `patient/ID eq '${patientID}' and date(timestamp) le ${to} and date(timestamp) ge ${from}`
    }
  });
};

/**
 * The following query will retrieve the activities for the given patient
 * for a specific day (ideally today)
 *
 * @param {String} patientID - The id of the patient
 * @param {String} today - ISO string formatted timestamp
 * @returns A list of activities on the specified date added by the user with patientID
 * */
ActivityQueries.getTodaysActivities = (patientID, today) => {
  return BackendAccess.IssueODataRequest({
    requestType: "GET",
    entityType: "Activities",
    query: {
      $filter: `patient/ID eq '${patientID}' and date(timestamp) eq ${today}`
    }
  });
};

/**
 * The following query will upload a new exercise activity for the given patient
 * The exercise should be provided as an object containing the necessary metadata
 * to upload to the database. For this see the odata metadata.
 *
 * @param {String} patientID - The id of the patient
 * @param {String} exercise - The exercise object
 * @returns The POST return object containing details about the upload
 * */
ActivityQueries.uploadNewExercise = (patientID, exercise) => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: exercise.type,
    entityBody: {
      patient: { ID: patientID },
      timestamp: new Date(),
      ...exercise.data,
      steps: exercise.data.steps || -1,
      caloriesburnt: exercise.data.caloriesburnt || -1
    }
  });
};

/**
 * The following query will upload a new measurement activity for the given patient
 * The measurement should be provided as an object containing the necessary metadata
 * to upload to the database. For this see the odata metadata.
 *
 * @param {String} patientID - The id of the patient
 * @param {String} measurement - The measurement object
 * @returns The POST return object containing details about the upload
 * */
ActivityQueries.uploadNewMeasurement = async (patientID, measurement) => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: measurement.type,
    entityBody: {
      patient: { ID: patientID },
      timestamp: new Date(),
      ...measurement.data
    }
  });
};

export default ActivityQueries;
