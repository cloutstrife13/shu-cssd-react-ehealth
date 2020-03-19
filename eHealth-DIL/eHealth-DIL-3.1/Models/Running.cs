using System;
using Semiodesk.Trinity;
using Newtonsoft.Json;

namespace eHealth_DataBus.Models
{
    [RdfClass(EHS.Running)]
    public class Running : LegSport
    {
        public Running(Uri uri) : base(uri) { }
        
        [JsonConstructor]
        public Running(string uri) : base(new Uri(uri)) { }
    }
}
