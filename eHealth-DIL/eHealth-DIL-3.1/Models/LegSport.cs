using System;
using System.ComponentModel.DataAnnotations;
using Semiodesk.Trinity;
using Newtonsoft.Json;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.LegSport)]
    public class LegSport : DistanceSport
    {
        public LegSport(Uri uri) : base(uri) { }
        
        [JsonConstructor]
        public LegSport(string uri) : base(new Uri(uri)) { }

        [Required, RdfProperty(EHS.steps)]
        public int? Steps { get; set; }
    }
}
