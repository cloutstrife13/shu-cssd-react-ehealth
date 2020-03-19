using System;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Patient)]
    public class Patient : User
    {
        public Patient(Uri uri) : base(uri) { }

        [JsonConstructor]
        public Patient(string uri) : base(new Uri(uri)) { }

        [RdfProperty(EHS.is_assigned_to)]
        public Doctor Doctor { get; set; }
    }
}
