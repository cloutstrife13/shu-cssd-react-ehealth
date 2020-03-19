# eHealth Mobile Application
The eHealth Mobile Application is a digital healthcare management platform for patients and doctors. It will be commissioned with the intent of accelerating the demand for an openly-accessible healthcare platform in the age of digitalisation.

Healthcare professionals can use it in order to track the health conditions of their patients. Patients can use it like a fitness tracking application where they can record their personal health data via Bluetooth synchronisation or manual user input. Recordable activities include blood pressure reading, weight reading as well as physical exercise that encompass walking, running, and cycling.

This application is currently in development but a pre-release evaluation version can be cloned from this repository for deployment purposes. In order to deploy the eHealth application, please refer to the deployment steps detailed in the "eHealth-Mobile", "eHealth-DIL", and the "eHealth-BluetoothSimulation" directories.

## New features: User Roles and Data Security
**SAP Fiori:** In order to strengthen the user's productivity based on user experience, the eHealth application is now adopting the SAP Fiori guidelines in order to inform the users what they are doing. Actual users can now create an account on the eHealth platform in order to record their personal health data. The registration is smooth and simple due to the fact that it implements the Wizard Floorplan from the SAP Fiori design language in order to eliminate psychological obscurities in favour of user productivity.

**Credential System:** As previously mentioned in the paragraph above, users are now able to create their personal account. The credential system allows users to securely register and log in to the eHealth system based on the capabilities of Semantic Web Technologies in order to locate an account based on their own credentials.

**Robust Data Security:** Users do not have to worry about the misuse of their personal data as the eHealth system in unison implements a multi-layer encryption system on both client and server sides which guarantees a high degree of data security.

**User Roles:** The credential system automatically determines the role of the user which is empowered by Semantics Web Technologies where object-orientated principles are applied. The eHealth System allows two user types: Doctors and Patients. Logging in to a user's personal account will redirect them to their role-based view.

**Patient Management:** Doctors are able to access a pool of available patients that require medical treatments. With the use of Semantic Web Technologies, both users can be digitally associated with each other. This association facilitates the information acquisition of a doctor's patients in order to track their health data diachronically.

**Demo Application:** The previous version included an overview screen for evaluation purposes where users were able to select a fictional user from a preset list of doctors or patients. This section has now been repurposed as a Demo view where curious users can interact with the system prior to creating a new account. Providing an initial look-and-feel to potential new users is very important. 

## Technology Stack
|   eHealth Component    | Technology            | Purpose                               |
|:----------------------:|:---------------------:|:-------------------------------------:|
| Mobile App             | React (JavaScript)    | Application for Mobile Devices        |
| Data Integration Layer | ASP.NET Core 3.1 (C#) | Server for Data Model Management      |
| Bluetooth Simulation   | Express (JavaScript)  | Simulation for Bluetooth Connectivity |
| Semiodesk Trinity      | C#                    | ORM Library for Semantic Databases    |
| OData                  | C#                    | API Library for Open Data Access      |
| OpenLink Virtuoso      |                       | Semantic Database                     |

## System Architecture
![Architecture](./MD-Images/SolutionArchitecture.png)

## Business Ontology
![DataModel](./MD-Images/DataModel.png)

## Data Protection Declaration
The pre-release evaluation version of this application is only meant evaluation purposes. Therefore any data that has been collected through the mobile application will be stored on a locally-hosted Virtuoso instance outside the internet. Should the Data Integration Layer be disconnected, any data stored in Virtuoso will be subject to immediate deletion.

Once this application has reached its release version that will be publically accessible to everyone, GDPR will be enforced that will be guaranteeing the data security and protection of our users without breaching their privacy.

The misuse of this platform is not tolerated as any recorded data contains sensible information. The evaluation of the eHealth application can only be consented on a unilateral basis from the project owner's side. Should you intend to reuse this application for own purposes that includes the possibility of hosting it online, please do consult with us in order to negotiate the terms of third-party usage. Third-party users will be liable to implementing GDPR for their own purposes.

## Changelog
- DIL Migration in ASP.NET Core version from 2.2 to 3.1
- Data protection for users added
  - Client-side: SHA1 password encryption added
  - Server-side: Salted password encryption added
- Home view repurposed to Demo view
  - Demo only contains preset users
  - Demo doctors can only view patient data
- User roles added
  - Login screen added
  - Registration wizard added
  - Unassigned patient pool view for doctor added
  - Successful login redirects to role-based view
  - Doctor can now assign patients to them
- Design changes
  - [SAP Fiori](https://experience.sap.com/fiori-design-web/wizard/) adopted for registration wizard
  - [SAP Semantic Object notation](https://help.sap.com/saphelp_uiaddon10/helpdata/en/bd/8ae3d327ab4541bcce8e7353c046fc/content.htm?no_cache=true) added on URI level
- New Postman integration test sample added in the DIL directory
  - Replicates the scenario where users can conduct tasks based on their role.