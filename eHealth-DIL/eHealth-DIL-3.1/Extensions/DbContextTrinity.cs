using System;
using System.IO;
using System.Reflection;
using eHealth_DataBus.Models;
using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using Semiodesk.Trinity;
using Semiodesk.Trinity.Store.Virtuoso;

namespace eHealth_DataBus.Extensions
{
    /// <summary>
    /// The DbContextTrinity class creates a Data Access Layer for the business model.
    /// </summary>
    public class DbContextTrinity
    {
        /// <summary>Contains the credentials of connecting to the Virtuoso database.</summary>
        private string _connectionString = "provider=virtuoso;host=127.0.0.1;port=1111;uid=dba;pw=dba;rule=urn:example/ruleset";

        /// <summary>Contains the URI of an Ontology stored in the Virtuoso database.</summary>
        Uri _defaultModelUri = new Uri("http://www.ehealth.ie/semantics");

        /// <summary>Attempts a connection to the Virtuoso database.</summary>
        public IStore Store { get { return StoreFactory.CreateStore(_connectionString); } }

        /// <summary>Retrieves the Ontology from Virtuoso.</summary>
        public IModel DefaultModel { get { return Store.GetModel(_defaultModelUri); } }

        /// <summary>Activates the interaction between the Trinity library and an active Virtuoso database.</summary>
        public void Initialise()
        {
            StoreFactory.LoadProvider<VirtuosoStoreProvider>();
            Store.InitializeFromConfiguration(Path.Combine(Environment.CurrentDirectory, "ontologies.config"));
            OntologyDiscovery.AddAssembly(Assembly.GetExecutingAssembly());
            MappingDiscovery.RegisterCallingAssembly();
        }

        /// <summary>Builds the Entity-Data-Model for enabling OData.</summary>
        /// <returns>The EDM constructed for enabling OData capabilities.</returns>
        public static IEdmModel GetEdmModel()
        {
            // Set up Entity Data Model for OData
            var builder = new ODataConventionModelBuilder();
            SetEntitySets(builder);

            // Activate Credential Actions in OData
            ActivateCredentialManager(builder.EntityType<Credential>());

            return builder.GetEdmModel();
        }

        /// <summary>Registers the references of every entity of the business model in the EDM.</summary>
        /// <param name="b">Reference of the EDM.</param>
        private static void SetEntitySets(ODataConventionModelBuilder b)
        {
            b.EntitySet<Master>("Masters");
            b.EntitySet<User>("Users");
            b.EntitySet<Credential>("Credentials");
            b.EntitySet<Patient>("Patients");
            b.EntitySet<Doctor>("Doctors");
            b.EntitySet<Activity>("Activities");
            b.EntitySet<Exercise>("Exercises");
            b.EntitySet<DistanceSport>("DistanceSports");
            b.EntitySet<LegSport>("LegSports");
            b.EntitySet<Running>("Runnings");
            b.EntitySet<Walking>("Walkings");
            b.EntitySet<Cycling>("Cyclings");
            b.EntitySet<WeightReading>("WeightReadings");
            b.EntitySet<BloodPressureReading>("BloodPressureReadings");
        }

        private static void ActivateCredentialManager<T>(EntityTypeConfiguration<T> c) where T : Credential
        {
            c.Collection.Function("ValidateUsername")
                        .Returns<bool>()
                        .Parameter<string>("username");

            c.Collection.Action("Register");
            c.Collection.Action("Login");
        }
    }
}
