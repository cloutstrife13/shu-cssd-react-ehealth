using System;
using Semiodesk.Trinity;
using Newtonsoft.Json;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Walking)]
    public class Walking : LegSport
    {
        public Walking(Uri uri) : base(uri) { }
        
        [JsonConstructor]
        public Walking(string uri) : base(new Uri(uri)) { }
    }
}
