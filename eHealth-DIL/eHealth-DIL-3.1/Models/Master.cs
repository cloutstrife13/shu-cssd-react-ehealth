using System;
using System.ComponentModel.DataAnnotations;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    /// <summary>The Master class simulates Trinity's resource class with the main responsibility of using the URI ID as unique identifier for each model.</summary>
    public class Master : Resource
    {
        /// <summary>The default constructor of the Master class</summary>
        /// <param name="uri">Represents the URI of an instance.</param>
        public Master(Uri uri) : base(uri) 
        {
            _URI = uri.AbsoluteUri;
        }

        /// <summary>Represents a copy of an instance's URI that necessitates the derivation of its ID.</summary>
        private string _URI;

        /// <summary>Represents the unique identifier of an instance that is a subset of its URI starting after the # symbol.</summary>
        [Key]
        public string ID
        {
            get
            {
                var indexHash = _URI.IndexOf("#") + 1;
                return _URI.Substring(indexHash);
            }
            set { }
        }
    }
}
