using System;
using System.ComponentModel.DataAnnotations;
using Semiodesk.Trinity;
using Newtonsoft.Json;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.WeightReading)]
    public class WeightReading : Activity
    {
        public WeightReading(Uri uri) : base(uri) { }

        [JsonConstructor]
        public WeightReading(string uri) : base(new Uri(uri)) { }

        [Required, RdfProperty(EHS.weight)]
        public double? Weight { get; set; }
    }
}
