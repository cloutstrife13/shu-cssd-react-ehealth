using System;
using System.Collections.Generic;
using System.Linq;
using eHealth_DataBus.Models;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Extensions
{
    /// <summary>The ModelRepository is a class that implements the IRepository interface for embodying the Repository Pattern.</summary>
    /// <typeparam name="T">T represents the Master class which is a subclass of the Resource class.</typeparam>
    public class ModelRepository<T> : IRepository<T> where T : Master
    {
        /// <summary>References the model responsible for enforcing CRUD operations against the Virtuoso database.</summary>
        internal IModel _dbt;

        /// <summary>Default constructor of the ModelRepository class</summary>
        /// <param name="trinity">References the instance of an ontology which enables the data binding capabilities with Virtuoso.</param>
        public ModelRepository(IModel trinity)
        {
            _dbt = trinity;
        }

        public IEnumerable<T> Read()
        {
            // Retrieves a list of every instance related to class T.
            return _dbt.GetResources<T>(true)
                       .ToList();
        }

        public void Create(T obj)
        {
            // Persists a new instance on the database
            _dbt.AddResource(obj);
        }

        public void Update(T obj)
        {
            _dbt.UpdateResource(obj);

            /* According to Semiodesk, the Commit() function is not necessary for persisting
             * the changes on the backend as it is already calling UpdateResource().
             * However, the UpdateResource() function itself is slightly erroneous and I
             * have raised this issue and it aware with the developers responsible for
             * Trinity for fixing the bus. For now, the .Commit() function is required for
             * seeing the changes on the OData layer. The minor error is that the changed
             * data will be adding a new property to a model instead of overwriting it on
             * the DB side. Link: https://github.com/semiodesk/trinity-rdf/issues/7
             */
            obj.Commit();
        }

        public void Delete(Uri uri)
        {
            _dbt.DeleteResource(uri);
        }
    }
}
