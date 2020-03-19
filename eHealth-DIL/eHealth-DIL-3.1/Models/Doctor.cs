using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Doctor)]
    public class Doctor : User
    {
        public Doctor(Uri uri) : base(uri) { }

        [JsonConstructor]
        public Doctor(string uri) : base(new Uri(uri)) { }

        [RdfProperty(EHS.provides_treatment_to)]
        public List<Patient> Patients { get; set; }
    }
}
