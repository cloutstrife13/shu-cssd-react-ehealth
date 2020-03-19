using System;
using Semiodesk.Trinity;
using Newtonsoft.Json;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Cycling)]
    public class Cycling : DistanceSport
    {
        public Cycling(Uri uri) : base(uri) { }
        
        [JsonConstructor]
        public Cycling(string uri) : base(new Uri(uri)) { }
    }
}
