using System;
using eHealth_DataBus.Models;
using eHealth_DataBus.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;

namespace eHealth_DataBus.Controllers
{
    /// <summary>The OData endpoint for receiving the user's credentials in order to login or register.'</summary>
    [ODataRoutePrefix("Credentials")]
    public class CredentialsController : ODataController
    {
        /// <summary>Represents the repository worker for performing CRUD operations against the business ontology for credential instances.</summary>
        private readonly IRepository<Credential> repo;

        /// <summary>Represents the formatter worker for performing data transformation against a JSON that will be transformed into a credential instance.</summary>
        private readonly ModelFormatter<Credential> shaper;

        /// <summary>Represents the validation worker for verifying whether or not the JSON input is complying with the schema of the credential class.</summary>
        private readonly ModelValidator<Credential> checker;

        /// <summary>Represents the cryptography worker for encrypting the password of the credential input based on random salt generation.</summary>
        private readonly CredentialHasher crypto;

        /// <summary>Default constructor for configuring the worker classes for this controller.</summary>
        /// <param name="trinity">The instance required for undertaking data management/verification purposes on the business ontology.</param>
        public CredentialsController(DbContextTrinity trinity)
        {
            repo = new ModelRepository<Credential>(trinity.DefaultModel);
            shaper = new ModelFormatter<Credential>(trinity.DefaultModel.Uri.AbsoluteUri);
            checker = new ModelValidator<Credential>(trinity.DefaultModel);
            crypto = new CredentialHasher();
        }

        /// <summary>An OData function representing the verification process of a username's existence which is uniquely stored in the database.</summary>
        /// <param name="username">The proposed username of a new user who wants to register.</param>
        /// <returns>The status code predicating whether or not the username is already used.</returns>
        [ODataRoute("ValidateUsername(username={username})")]
        public IActionResult ValidateUsername([FromODataUri] string username)
        {
            if (checker.ValidateUsername(repo.Read(), username))
                return BadRequest("Username already taken.");

            return Ok("Username is valid.");
        }

        /// <summary>An OData action representing the registration process of a new user.</summary>
        /// <param name="obj">The JSON request payload representing the user's new credentials.'</param>
        /// <returns>The status code predicating whether or not a registration has been successfully processed.</returns>
        [ODataRoute("Register")]
        public IActionResult Register([FromBody] Object obj)
        {
            // Retrieve actual class of the model
            var resource = shaper.FormatObject(obj);

            // Encrypt the user's credentials for security
            resource = crypto.EncryptUserPassword(resource);

            if (checker.ValidateModel(resource))
            {
                repo.Create(resource);
                return Ok("Registration successful.");
            }

            return BadRequest("Registration failed.");
        }

        /// <summary>An OData action representing the login process of an existing user.</summary>
        /// <param name="obj">The JSON request payload representing the user's credentials.'</param>
        /// <returns>The status code predicating whether or not a login has been successfully processed, and where a success will retrieve the user instance'.</returns>
        [ODataRoute("Login")]
        public IActionResult Login([FromBody] Object obj)
        {
            // Retrieve actual class of the model
            var resource = shaper.FormatObject(obj);

            // Retrieve the resource stored on the database
            var dbCred = checker.GetCredentialByUsernameValidation(repo.Read(), resource.Username);

            // Check if username is valid by instance
            if (dbCred != null)
            {
                // Check if password is valid
                if (crypto.ValidateUser(resource.Password, dbCred.Password))
                {
                    // Update password hash
                    dbCred = crypto.EncryptUserPassword(dbCred, resource.Password);
                    repo.Update(dbCred);

                    return Ok(new { user = dbCred.User });
                }
            }

            return Unauthorized("Credentials invalid. Please try again.");
        }
    }
}