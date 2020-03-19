using System;
using System.Collections.Generic;
using Semiodesk.Trinity;

namespace eHealth_DataBus.Extensions
{
    /// <summary>IRepository represents an interface that necessitates the implementation of the Repository Pattern.</summary>
    /// <typeparam name="T">T represents any Resource that references an RDF class that is registered on an Ontology in Virtuoso.</typeparam>
    public interface IRepository<T> where T : Resource
    {
        /// <summary>Retrieves every instance related to an RDF class in Virtuoso..</summary>
        /// <returns>Yields a list of every instance related to an RDF class.</returns>
        IEnumerable<T> Read();

        /// <summary>Creates a new instance related to an RDF class in Virtuoso.</summary>
        /// <param name="obj">Represents an instance matching its proprietary RDF class.</param>
        void Create(T obj);

        /// <summary>Amends an existing instance related to an RDF class in Virtuoso.</summary>
        /// <param name="obj">Represents an instance matching its proprietary RDF class.</param>
        void Update(T obj);

        /// <summary>Removes an instance related to an RDF class in Virtuoso by its URI.</summary>
        /// <param name="uri">Represents the URI of an existing instance.</param>
        void Delete(Uri uri);
    }
}
