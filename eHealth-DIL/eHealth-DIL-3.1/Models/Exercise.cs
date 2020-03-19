using System;
using Newtonsoft.Json;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Exercise)]
    public class Exercise : Activity
    {
        public Exercise(Uri uri) : base(uri) { }

        [JsonConstructor]
        public Exercise(string uri) : base(new Uri(uri)) { }
    }
}
