# Sensor Simulation
The purpose of this application is to simulate a Bluetooth-enabled fitness device, to which users can connect via eHealth Mobile Application. This Sensor Simulator has been developed as a standalone server in **JavaScript**, using **NodeJS** runtime environment and **ExpressJS** framework. Communication between the main application and the simulation is possible via *HTTP requests*.

The server can be used to:
- Connect/Disconnect a Bluetooth device from eHealth Mobile Application
- Synchronise the data with eHealth Mobile Application
- Start/Stop fitness activities

This application mimics how connecting and synchronising with Bluetooth fitness device could look like, but is not the actual representation of such connection, e.g. when trying to connect to the simulation, there is no exchange of secret keys, if *ID* of the simulated device matches the one from the request call, the connection can be established.

## Folder Structure
```
sensorSimulation
|
│   .gitignore
│   eventsHandler.js
│   index.js
│   package-lock.json
│   package.json
│   README.md
│
├───constants
│       DEVICE_CONNECTION_STATUS.js
│
├───models
│       Sensor.js
│
└───singletons
        Logger.js
```

### Main Folder
- **index.js** - Main NodeJS file, which includes REST API calls and the code to start the server
- **eventsHandler.js** - Part of the application, that is responsible for handling events. NodeJS utilizes event-driven programming via `EventEmitter` class, which also helps implementing subscriber-publisher pattern. Encapsulation of events handling functionality allows this file to be used in other parts of the application.

### Constants Folder:
- **DEVICE_CONNECTION_STATUS.js** - Enumerator object, created to encapsulate different connection's statuses for the Bluetooth device. Doing so creates more stable, easier to reade and less error prone code.

### Models Folder:
- **Sensor.js** - Class to represent Bluetooth-enabled fitness device. It contains the whole logic for device, its properties and operations that the simulated Sensor can perform.

### Singletons Folder:
- **Logger.js** - Logger Singleton was created for debugging purposes. It allows displaying debug logs throughout the code without worrying about leaving `console.log()` anywhere, as the whole logging functionality has been encapsulated inside the Logger.

## Installation
The Sensor Simulation has been written using **NodeJS** JavaScript runtime environment and it requires it to be installed. Together with **NodeJS**, a package manager needs to be installed for installing necessary packages
1. Install **NodeJS** by following [this link](https://nodejs.org/en/). *The application has been tested with **NodeJS** version **10.12.0**. Although, the newest version **12.16.1** should also work*.
2. For the package manager we recommend using **npm**, that comes with **NodeJS**. The other package managers, like **yarn**, can also be used.

## REST API

### Get Bluetooth Devices
----
  Returns the list of Bluetooth devices
* #### URL
  /getBluetoothDevices

* #### Method
  `GET`

* #### URL Params
  **Required**
  None

* #### Success Response
  * **Code** 200 <br />
    **Content** `{devices: []}`

* #### Error Response
  * **Code** Not Expected <br />
    **Content** Not Expected

* #### Sample Call
  * ```javascript
    test
    ```

### Synchronise Data
----
  Synchronises data from all connected Bluetooth devices
* #### URL
  /synchroniseData

* #### Method
  `POST`

* #### URL Params
  **Required**
  `id=[string]`

* #### Success Response
  * **Code** 200 <br />
    **Content** `[array of activities]`

* #### Error Response
  * **Code** Not Expected <br />
    **Content** Not Expected

* #### Sample Call
  * ```javascript
          const response = await fetch('http://localhost:3000/synchroniseData', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
          });
          const data = await response.json();
    ```

### Connect Device
----
  Connects to a Bluetooth Device Simulation
* #### URL
  /connectDevice

* #### Method
  `POST`

* #### URL Params
  **Required**
  `id=[string]`

* #### Success Response
  * **Code** 200 <br />
    **Content** `{connected: boolean, connectionStatus: string}`

* #### Error Response
  * **Code** 400 <br />
    **Content** `boolean`

* #### Sample Call
  * ```javascript
          const response = await fetch('http://localhost:3000/connectToDevice', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
          });
          const data = await response.json();
    ```

### Disconnect Device
----
  Disconnects from the previously connected device
* #### URL
  /disconnectDevice

* #### Method
  `POST`

* #### URL Params
  **Required**
  `id=[string]`

* #### Success Response
  * **Code** 200 <br />
    **Content** `boolean`

* #### Error Response
  * **Code** Not Expected <br />
    **Content** Not Expected

* #### Sample Call
  * ```javascript
    fetch('http://localhost:3000/disconnectDevice', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });
    ```

### Start Activity
----
  Starts a fitness activity
* #### URL
  /startActivity

* #### Method
  `POST`

* #### URL Params
  **Required**
  `type=[string]`

* #### Success Response
  * **Code** 200 <br />
    **Content** `boolean`

* #### Error Response
  * **Code** Not Expected <br />
    **Content** Not Expected

* #### Sample Call
  * ```javascript
    curl -d '{"type":"running"}' -H "Content-Type: application/json" -X POST http://localhost:3000/startActivity
    ```

### Stop Activity
----
  Stops previously started activity
* #### URL
  /stopActivity

* #### Method
  `GET`

* #### URL Params
  **Required**
  None

* #### Success Response
  * **Code** 200 <br />
    **Content** `boolean`

* #### Error Response
  * **Code** Not Expected <br />
    **Content** Not Expected

* #### Sample Call
  * ```javascript
    curl http://localhost:3000/stopActivity
    ```

## Usage
To start the server, do the following:
1. Open up your preferred `command prompt` tool (*We've tested the server using both PowerShell and GitBash*)
2. Inside the `command prompt`, navigate to the `/sensorSimulation` folder (Follow your tool help page to find out which commands to use).
3. Ensure that all dependencies are installed by running `npm install --save`
4. Run the server by typing `npm start`

**To start/stop activities:**
1. Ensure that the server is running first
2. Connect to a Bluetooth Sensor via eHealth Mobile Application (The sensor should show `Connected`)
3. Using your preffered `command prompt` tool type the following to start the activity `curl -d '{"type":"running"}' -H "Content-Type: application/json" -X POST http://localhost:3000/startActivity`
4. To stop the activity, excecute: `curl http://localhost:3000/stopActivity`
