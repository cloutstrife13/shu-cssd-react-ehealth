using System;
using System.Collections.Generic;
using eHealth_DataBus.Models;
using eHealth_DataBus.Extensions;
using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Routing;
using Microsoft.AspNetCore.Mvc;

namespace eHealth_DataBus.Controllers
{
    [ODataRoutePrefix("Cyclings")]
    public class CyclingsController : ODataController
    {
        private readonly IRepository<Cycling> repo;
        private readonly ModelFormatter<Cycling> shaper;
        private readonly ModelValidator<Cycling> checker;

        public CyclingsController(DbContextTrinity trinity)
        {
            repo = new ModelRepository<Cycling>(trinity.DefaultModel);
            shaper = new ModelFormatter<Cycling>(trinity.DefaultModel.Uri.AbsoluteUri);
            checker = new ModelValidator<Cycling>(trinity.DefaultModel);
        }

        [EnableQuery]
        public IEnumerable<dynamic> Get()
        {
            return repo.Read();
        }

        public IActionResult Post([FromBody] Object obj)
        {
            var resource = shaper.FormatObject(obj);
            if (checker.ValidateModel(resource))
            {
                repo.Create(resource);
                return Created(resource);
            }

            return BadRequest();
        }

        [ODataRoute("{uri_id}")]
        public IActionResult Put([FromBody] Object obj, [FromODataUri] string uri_id)
        {
            var resource = shaper.FormatObject(obj, uri_id);
            if (checker.ValidateModelByUri(resource.Uri))
            {
                repo.Update(resource);
                return Ok();
            }

            return BadRequest();
        }

        [ODataRoute("{uri_id}")]
        public IActionResult Patch([FromBody] Object obj, [FromODataUri] string uri_id)
        {
            var resource = shaper.FormatObject(obj, uri_id);
            if (checker.ValidateModelByUri(resource.Uri))
            {
                repo.Update(resource);
                return Ok();
            }

            return BadRequest();
        }

        [ODataRoute("{uri_id}")]
        public IActionResult Delete([FromODataUri] string uri_id)
        {
            var resource = shaper.GetObjectUriByID(uri_id);
            if (checker.ValidateModelByUri(resource))
            {
                repo.Delete(resource);
                return Ok();
            }

            return BadRequest();
        }
    }
}