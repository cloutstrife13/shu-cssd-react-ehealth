import PAIRED_DEVICES from "../../data/paired_devices";
import ActivityQueries from "../../queries/ActivityQueries";

const PORT = 3000;
const URL = `localhost`;
const connectDevice = `http://${URL}:${PORT}/connectDevice/`;
const disconnectDevice = `http://${URL}:${PORT}/disconnectDevice/`;
const synchorniseDataUrl = `http://${URL}:${PORT}/synchroniseData/`;
let foundDevices = [];

var patient = null;

class BluetoothSynchronisationManager {
  constructor() {
    // A container for all observers that needs to be notifed about new data
    this.observers = [];
    this.devicesObservers = [];
    this.noOfFailedSyncs = 0;
    setInterval(() => {
      this.synchroniseData();
    }, 3000);
  }

  /**
   * Attaches a new observer to a list of Observers
   * @param {Function} observer -> Function that is called, when Observers need to be notified about data change
   */
  attachObserver = observer => {
    this.observers.push(observer);
  };

  attachDevicesObserver = observer => {
    this.devicesObservers.push(observer);
  };

  /**
   * Removes the observer fromt he list of observers
   * @param {Function} observer -> Observer to be removed
   */
  detachObserver = observer => {
    this.observers = this.observers.filter(ob => ob !== observer);
  };

  /**
   * Informs all Observers about the data change
   */
  notifyObservers = () => {
    this.observers.forEach(observer => observer());
  };

  notifyDevicesObservers = () => {
    this.devicesObservers.forEach(observer => observer());
  };

  /**
   * Returns the list of paired devices
   * For the simplicity, paired devices are stored as a constant array
   */
  getPairedDevices = () => {
    foundDevices = PAIRED_DEVICES;
    return foundDevices;
  };

  /**
   * Allows other components to set the patient for BluetoothSynchronisationManager
   * So that this patient can be then used to query the database
   */
  setPatient = p => {
    patient = p;
  };

  getConnectedDevices = () => {
    /**
     * Returns the list of connected devices
     */
    return {};
  };

  /**
   * Connects to the device clicked by the user on the page
   * @param {String} id -> ID of a device the user wants to connect to
   */
  connectToDevice = id => {
    return new Promise(async (resolve, reject) => {
      const connectingDevice = foundDevices.find(device => device.id === id);
      if (connectingDevice) {
        try {
          const response = await fetch(connectDevice, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
          });
          const data = await response.json();
          if (data) {
            resolve(data);
            return;
          } else {
            reject();
            return;
          }
        } catch (err) {
          // Device is disconnected (Simulation server not running)
          // const deviceConnectionStatus = {
          //   connected: false,
          //   connectionStatus: 'FAILED'
          // };
          // reject(deviceConnectionStatus);
          reject();
          return;
        }
      }
    });
  };

  /**
   * Disconnects from the specific device
   * @param {String} id -> ID of the device we want to disconnect from
   */
  disconnect = id => {
    fetch(disconnectDevice, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id })
    });
  };

  /**
   * Disconnects from all connected sensors
   */
  disconnectAll = () => {
    foundDevices.forEach(device => {
      if (device.connected) {
        this.disconnect(device.id);
        device.disconnectPaired();
      }
    });
  };

  /**
   * Synchronises the data from all devices (paired and connected)
   */
  synchroniseData = () => {
    foundDevices.forEach(async device => {
      if (device.connected) {
        try {
          let fetchData = {
            id: device.id
          };
          const response = await fetch(synchorniseDataUrl, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(fetchData)
          });
          const data = await response.json();

          if (data.length !== 0) {
            data.forEach(log => {
              log.data = {
                caloriesburnt: parseFloat(log.kcalBurnt),
                steps: parseFloat(log.stepsCounted),
                startTime: log.startTime,
                endTime: log.stopTime,
                distance: parseFloat(log.distance)
              };
              ActivityQueries.uploadNewExercise(patient, log);
              this.notifyObservers();
            });
          }
        } catch (err) {
          if (this.noOfFailedSyncs++ > 4) {
            this.noOfFailedSyncs = 0;
            device.disconnect();
            this.notifyDevicesObservers();
          }
          console.log(err.message);
        }
      }
    });
  };
}

// BluetoothSynchronisationManager is exported as a Singleton
export default new BluetoothSynchronisationManager();
