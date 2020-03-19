using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    /// <summary>The schema for the Credential class.</summary>
    [RdfClass(EHS.Credential)]
    public class Credential : Master
    {
        /// <summary>The default constructor of the Credential class.</summary>
        /// <param name="uri">The URI of the Credential instance.</param>
        public Credential(Uri uri) : base(uri) {}

        /// <summary>The JSON constructor of the Credential class.</summary>
        /// <param name="uri">The URI of the Credential instance.</param>
        [JsonConstructor]
        public Credential(string uri) : base(new Uri(uri)) { }

        /// <summary>The username of a user's credential.</summary>
        [Required, RdfProperty(EHS.username)]
        public string Username { get; set; }

        /// <summary>The encrypted password of a user's credential.</summary>
        [Required, RdfProperty(EHS.password)]
        public string Password { get; set; }

        /// <summary>The previous salt value used in order to encrypt the password.</summary>
        [RdfProperty(EHS.salt)]
        public string Salt { get; set; }

        /// <summary>The semantic relationship towards the user's account.</summary>
        [Required, RdfProperty(EHS.links_to)]
        public User User { get; set; }
    }
}
