/**
 * Class used to create instances of a single bluetooth sensor
 * It consists all attributes and functions that the sensor should have
 * 
 */
const Logger = require('../singletons/Logger');
const DEVICE_CONNECTION_STATUS = require('../constants/DEVICE_CONNECTION_STATUS');
// Based on Kyle's Converter. Average length step is equal to 0.8 m
const STEP_TO_KM_RATE = 0.8;
// Based on a maximum bracket of burning 360 kcal per 5km walk
const KCAL_BY_M_RATE = 0.072;

const ACTIVITY_TYPES = Object.freeze({
    WALKING: 'Walkings',
    RUNNING: 'Runnings',
    CYCLING: 'Cyclings',
    UNKNOWN: 'Unknown'
})

class Activity {
    constructor(startTime, stopTime, stepsCounted, distance, kcalBurnt, type) {
        this.id = new Date().toISOString();

        this.startTime = startTime;
        this.stopTime = stopTime;
        this.stepsCounted = stepsCounted;
        this.distance = distance;
        this.kcalBurnt = kcalBurnt;
        this.type = type;
    }
}

class Sensor {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.batteryLevel = 100.00;
        this.connectionStatus = DEVICE_CONNECTION_STATUS.PAIRED;
        this.stepsCounter = 0;
        this.distance = 0;
        this.kcalBurnt = 0;
        this.currentActivityStartTime = null;
        this.currentActivityStopTime = null;
        this.currentActivityType = null;
        this.connected = false;
        this.measuringActivity = false;
        this.activities = []

        var stepCounterInterval;
        var kcalBurntInterval;
    }

    connectToSensor() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // const deviceConnectionData = {
                //     connected: this.connected,
                //     connectionStatus: this.connectionStatus
                // }
                // Logger.log(`Connecting to ${this.name}`);
                if (this.connected) {
                    // Logger.log(`Fitness tracker already connected to another device.`);
                    // this.connectionStatus = DEVICE_CONNECTION_STATUS.DISCONNECTED;
                    this.connected = !this.connected;
                    const deviceConnectionData = {
                        connected: this.connected,
                        connectionStatus: this.connectionStatus
                    } 
                    resolve(deviceConnectionData);
                    return;
                } else if (this.connected === false && this.batteryLevel > 0) {
                    this.connectionStatus = DEVICE_CONNECTION_STATUS.CONNECTING;
                    this.connected = !this.connected;
                    // Logger.log(`Status: ${this.connected}`);
                    this.connectionStatus = this.connected ? DEVICE_CONNECTION_STATUS.CONNECTED : DEVICE_CONNECTION_STATUS.PAIRED;
                    // Logger.log(`Successfully connected to ${this.name}`);
                    const deviceConnectionData = {
                        connected: this.connected,
                        connectionStatus: this.connectionStatus
                    }
                    resolve(deviceConnectionData);
                    return;
                } else {
                    reject();
                }  
            }, 3000);

        })
    }

    disconnect() {
        this.connected = false;
        this.connectionStatus = DEVICE_CONNECTION_STATUS.DISCONNECTED;
    }

    startActivity(type) {
        // this.cleanActivity()

        if (!this.measuringActivity) {
            this.currentActivityStartTime = new Date().toISOString();
            switch(type.toLowerCase()) {
                case 'walking': {
                    this.currentActivityType = ACTIVITY_TYPES.WALKING;
                    break;
                }
                case 'running': {
                    this.currentActivityType = ACTIVITY_TYPES.RUNNING;
                    break;
                }
                case 'cycling':{
                    this.currentActivityType = ACTIVITY_TYPES.CYCLING;
                    break;
                }
                default:
                    this.currentActivityType = ACTIVITY_TYPES.UNKNOWN;
            }
            this.stepCounterInterval = setInterval(() => {
                this.stepsCounter = this.stepsCounter + 1;
                this.distance = this.stepsCounter * STEP_TO_KM_RATE;
                this.kcalBurnt = this.distance * KCAL_BY_M_RATE;
            }, 2000);
        }
    }

    stopActivity() {
        this.currentActivityStopTime = new Date().toISOString();
        Logger.log(`Stopping: ${this.distance}`)

        this.activities.push(new Activity(this.currentActivityStartTime, this.currentActivityStopTime, this.stepsCounter,
                            this.distance, this.kcalBurnt, this.currentActivityType))
        
        // this.cleanActivity()
    }

    getSyncData() {
        const copyActivities = this.activities
        this.activities = []
        return copyActivities
    }

    /**
     * Clears the intervals for increasing the steps, kcal burnt and distance
     * Also resets the number of steps, kcalBurnt and distance to 0
     */
    cleanActivity() {
        if (this.stepCounterInterval) clearInterval(this.stepCounterInterval);
        if (this.kcalBurntInterval) clearInterval(this.kcalBurntInterval);

        if (this.stepsCounter > 0) this.stepsCounter = 0;
        if (this.kcalBurnt > 0) this.kcalBurnt = 0;
        if (this.distance > 0) this.distance = 0;
    }
}

module.exports = Sensor;