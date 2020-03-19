using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Activity)]
    public class Activity : Master
    {
        public Activity(Uri uri) : base(uri) { }

        [JsonConstructor]
        public Activity(string uri) : base(new Uri(uri)) { }

        [Required, RdfProperty(EHS.timestamp)]
        public DateTime? Timestamp { get; set; }

        [RdfProperty(EHS.committed_by)]
        public Patient Patient { get; set; }
    }
}
