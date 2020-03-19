using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using eHealth_DataBus.Models;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Extensions
{
    /// <summary>The ModelValidator class is responsible for validating the correctness of the models.</summary>
    /// <typeparam name="T">Represents an instance of an RDF class in Virtuoso.</typeparam>
    public class ModelValidator<T> where T : Master
    {
        /// <summary>References the model responsible for enforcing validation operations on an entity against the Virtuoso database.</summary>
        internal IModel _dbt;

        /// <summary>Default constructor of the ModelValidator class</summary>
        /// <param name="trinity">References the instance of an ontology which enables the data binding capabilities with Virtuoso.</param>
        public ModelValidator(IModel trinity)
        {
            _dbt = trinity;
        }

        /// <summary>Validates an instance.</summary>
        /// <param name="obj">Represents the instance.</param>
        /// <returns>Returns a Boolean.</returns>
        public bool ValidateModel(T obj)
        {
            // Add a URI ID to the new Object
            var context = new ValidationContext(obj, serviceProvider: null, items: null);
            var validationResults = new List<ValidationResult>();

            return Validator.TryValidateObject(obj, context, validationResults, true);
        }

        /// <summary>Validates an instance by URI.</summary>
        /// <param name="uri">Represents the URI of an instance.</param>
        /// <returns>Returns a Boolean.</returns>
        public bool ValidateModelByUri(Uri uri)
        {
            // uri.ToString().Contains(typeof(T).Name)
            return _dbt.ContainsResource(uri);
        }

        public bool ValidateUsername(IEnumerable<Credential> creds, string username)
        {
            var cred = creds.Where(x => x.Username == username).ToList();

            return cred.Count == 1;
        }

        public Credential GetCredentialByUsernameValidation(IEnumerable<Credential> creds, string username)
        {
            var cred = creds.Where(x => x.Username == username).ToList();

            if (cred.Count == 1)
                return cred[0];

            return null;
        }
    }
}
