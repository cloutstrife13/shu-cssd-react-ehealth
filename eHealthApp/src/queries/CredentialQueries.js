import BackendAccess from "../utilities/BackendAccess";

var CredentialQueries = {};

/**
 * Issues the request to create a new user profile.
 * @param {string} userType Represents the role of the new user.
 * @param {Object} userDetails Represents the details of the new user.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
CredentialQueries.createUserProfile = (userType, userDetails) => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: userType,
    entityBody: userDetails
  });
};

/**
 * Issues the request to create the credentials for a new user.
 * @param {Object} credentialDetails Represents the details of the credentials.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
CredentialQueries.createUserCredential = credentialDetails => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: "Credentials/Register",
    entityBody: credentialDetails
  });
};

/**
 * Issues the request to check the existence of a user's credential.
 * @param {Object} credentialDetails Represents the details of the credentials.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
CredentialQueries.verifyUserCredential = credentialDetails => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: "Credentials/Login",
    entityBody: credentialDetails
  });
};

/**
 * Issues the request to check the existence of a username.
 * @param {string} username Represents the proposed username for a new user.
 * @returns {Promise} Enables chaining of subsequent operations.
 */
CredentialQueries.verifyUsername = username => {
  return BackendAccess.IssueODataRequest({
    requestType: "POST",
    entityType: `Credentials/ValidateUsername(username='${username}')`,
    entityBody: {}
  });
};

export default CredentialQueries;
