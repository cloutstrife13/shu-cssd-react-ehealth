using System;
using System.Collections.Generic;
using eHealth_DataBus.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace eHealth_DataBus.Extensions
{
    /// <summary>The ModelFormatter class is responsible for data transformation which translates a simple JSON into a Trinity-compliant object.</summary>
    /// <typeparam name="T">Represents an instance of an RDF class in Virtuoso.</typeparam>
    public class ModelFormatter<T> where T : Master
    {
        private readonly string uri, classType;

        /// <summary>The default constructor of the ModelFormatter class.</summary>
        /// <param name="trinity_uri">The Uri of the Ontology that namespaces every entity related to it.</param>
        public ModelFormatter(string trinity_uri)
        {
            classType = typeof(T).Name;
            uri = trinity_uri;
        }

        /// <summary>Formats a new instance for a Read operation by auto-generating a URI for it.</summary>
        /// <param name="obj">Represents the new instance.</param>
        /// <returns>Returns the new instance as its actual class.</returns>
        public T FormatObject(dynamic obj)
        {
            // Add a URI ID to the new Object
            var generatedUri = $"{uri}#{classType}_{DateTime.Now.ToString("HHmmss_ddMMyyyy")}";
            obj = PortIdToUri(obj, generatedUri);

            return obj.ToObject<T>();
        }

        /// <summary>Formats an existing instance for an Update operation by appending the Ontology URI to its ID.</summary>
        /// <param name="obj">Represents the instance that needs to be changed.</param>
        /// <param name="uri_id">Represents the ID of the instance.</param>
        /// <returns>Returns the changed instance as its actual class.</returns>
        public T FormatObject(dynamic obj, string uri_id)
        {
            obj = PortIdToUri(obj, GetObjectReference(uri_id));
            return obj.ToObject<T>();
        }

        /// <summary>Retrieves an existing instance's URI by its ID.</summary>
        /// <param name="uri_id">Represents the ID of the instance.</param>
        /// <returns>Returns the full URI of the instance.</returns>
        public Uri GetObjectUriByID(string uri_id)
        {
            // Take the URI ID to retrieve the URI of the object
            return new Uri(GetObjectReference(uri_id));
        }

        /// <summary>Constructs the URI of an existing instance's URI by its ID.</summary>
        /// <param name="uri_id">Represents the ID of the instance.</param>
        /// <returns>Returns the full URI of the instance in string representation.</returns>
        public string GetObjectReference(string uri_id)
        {
            return $"{uri}#{uri_id}";
        }

        /// <summary>Transforms an instance that needs to be linked to another one by ID instead of URI.</summary>
        /// <param name="obj">Represents the instance.</param>
        /// <returns>Returns the transformed instance.</returns>
        public dynamic PortIdToUri(dynamic obj, string absoluteUri)
        {
            var objAsDict = new Dictionary<string, object>();

            foreach (var prop in obj)
            {
                var propValue = prop.Value;
                if (prop.Value.GetType().Name.Contains("Array"))
                    propValue = TransformIdsToUris(prop);

                if (prop.Value.GetType().Name.Contains("Object"))
                    propValue = TransformIdToUri(prop);

                objAsDict[prop.Name] = propValue;
            }

            objAsDict["URI"] = absoluteUri;
            var dictAsObj = JsonConvert.SerializeObject(objAsDict);
            return JObject.Parse(dictAsObj);
        }

        /// <summary>Searches for IDs in the list of other existing instances that a changing instance wants to be linked to and rewrites the ID into URI in order to be compliant with the Trinity standards.</summary>
        /// <param name="prop">Represents the list of other existing instances.</param>
        /// <returns>Returns a list of URIs instead of IDs.</returns>
        public dynamic TransformIdsToUris(dynamic prop)
        {
            List<Dictionary<string, string>> uris = new List<Dictionary<string, string>>();
            foreach (var jObj in prop.Value)
            {
                foreach (var ids in jObj)
                {
                    if(ids.Name == "ID") {
                        Dictionary<string, string> uri = new Dictionary<string, string>();
                        uri["URI"] = GetObjectReference(ids.Value.ToString());
                        uris.Add(uri);
                    }
                }
            }

            return uris;
        }

        /// <summary>Searches for an ID in another existing instance that a changing instance wants to be linked to and rewrites the ID into URI in order to be compliant with the Trinity standards.</summary>
        /// <param name="prop">Represents the body of an existing instance.</param>
        /// <returns>Returns the body of an existing instance by its URI instead of ID.</returns>
        public dynamic TransformIdToUri(dynamic prop)
        {
            Dictionary<string, string> uri = new Dictionary<string, string>();
            foreach (var jObj in prop.Value)
            {
                if (jObj.Name == "ID")
                {
                    uri["URI"] = GetObjectReference(jObj.Value.ToString());
                    break;
                }
            }

            return uri;
        }
    }
}
