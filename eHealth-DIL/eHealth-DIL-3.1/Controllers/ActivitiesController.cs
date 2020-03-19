using System.Collections.Generic;
using eHealth_DataBus.Models;
using eHealth_DataBus.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;

namespace eHealth_DataBus.Controllers
{
    [ODataRoutePrefix("Activities")]
    public class ActivitiesController : ODataController
    {
        private readonly IRepository<Activity> repo;

        public ActivitiesController(DbContextTrinity trinity)
        {
            repo = new ModelRepository<Activity>(trinity.DefaultModel);
        }

        [EnableQuery]
        public IEnumerable<dynamic> Get()
        {
            return repo.Read();
        }
    }
}