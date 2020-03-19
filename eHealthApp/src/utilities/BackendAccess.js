/*
This worker class serves for the purpose of accessing the DIL via
the OData protocol as an OData client.

Author: Andy Le
*/

import { o } from "odata";

const endpoint = "https://localhost:5001/odata/";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * Exports a singleton instance of the OData Client as a means of
 * accessing the DIL via the OData protocol.
 */
export default new (class BackendAccess {
  /**
   * The default constructor of the OData Client which encapsulates
   * let-based functions by making them private. Only exposes one
   * public function for performing CRUD operations.
   * @returns {BackendAccess} Returns the singleton instance of this
   * client.
   */
  constructor() {
    /**
     * Returns the response as a transformed JSON object.
     * @returns {Promise} Response as JSON object.
     */
    let ProduceResponseBody = response => {
      return {
        body: response,
        headers: {
          "Content-Type": "application/json"
        }
      };
    };

    /**
     * Reads and eventually queries the instances of an entity by type.
     * @param {string} entityType The type of an entity that is part
     * of the business data model.
     * @param {Object} query The query parameter for filtering the
     * OData result.
     * @returns {Promise} Response as JSON object.
     */
    let Read = async (entityType, query = {}) => {
      var res = await o(endpoint)
        .get(entityType)
        .query(query);

      return ProduceResponseBody(res);
    };

    /**
     * Instantiates a new entity by type.
     * @param {string} entityType The type of an entity that is part
     * of the business data model.
     * @param {Object} entityBody The details of the entity regarding
     * its properties as per business data model.
     * @returns {Promise} Response as JSON object.
     */
    let Create = async (entityType, entityBody) => {
      var res = await o(endpoint)
        .post(entityType, entityBody)
        .query();

      return ProduceResponseBody(res);
    };

    /**
     * Changes the properties of an existing instance by entity type.
     * @param {string} entityID The ID related to an existing instance
     * of the entity model.
     * @param {string} entityType The type of an entity that is part
     * of the business data model.
     * @param {Object} entityBody The details of the entity regarding
     * its properties as per business data model.
     * @returns {Promise} Response as JSON object.
     */
    let Update = async (entityType, entityID, entityBody) => {
      var res = await o(endpoint)
        .patch(`${entityType}('${entityID}')`, entityBody)
        .query();

      return ProduceResponseBody(res);
    };

    /**
     * Deletes an instance by its entity type and ID.
     * @param {string} entityID The ID related to an existing instance
     * of the entity model.
     * @returns {Promise} Response as JSON object.
     */
    let Delete = async (entityType, entityID) => {
      var res = await o(endpoint)
        .delete(`${entityType}('${entityID}')`)
        .query();

      return ProduceResponseBody(res);
    };

    /**
     * Routes the received request to its proprietary CRUD operation by
     * request type.
     * @param {Object} req The request payload received for initiating
     * an OData request against the DIL.
     * @returns {Promise} Response as JSON object.
     */
    this.IssueODataRequest = async req => {
      var context = {};
      switch (req.requestType) {
        case "GET":
          context.res = await Read(req.entityType, req.query);
          break;
        case "POST":
          context.res = await Create(req.entityType, req.entityBody);
          break;
        case "PUT":
          context.res = await Update(
            req.entityType,
            req.entityID,
            req.entityBody
          );
          break;
        case "PATCH":
          context.res = await Update(
            req.entityType,
            req.entityID,
            req.entityBody
          );
          break;
        case "DELETE":
          context.res = await Delete(req.entityType, req.entityID);
          break;
        default:
          context.res = {
            status: 400,
            body:
              "Invalid protocol. Issue a request with either GET, POST, PUT, or DELETE."
          };
          break;
      }
      return context.res.body;
    };
  }
})();
