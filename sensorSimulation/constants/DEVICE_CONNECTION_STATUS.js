/**
 * Enumerator type for device's connection status
 * Since the device's connection status may be repeated quite often in the code
 * it is a good practice to use enumerators for that.
 * The use of enumerators reduces the risk of making a mistake (e.g. by misspelling the string)
 * 
 * Here we are using Object.freeze() function, that is built-in into JavaScript
 * This simply makes our Object immutable. That means, we cannot add, remove properties.
 * Using DEVICE_CONNECTION_STATUS as constant (const) ensure that properties can't be updated
 */
const DEVICE_CONNECTION_STATUS = Object.freeze({
    CONNECTED: 'CONNECTED',
    CONNECTING: 'CONNECTING',
    PAIRED: 'PAIRED',
    PAIRING: 'PAIRING',
    DISCONNECTED: 'DISCONNECTED',
    FAILED_TO_CONNECT: 'FAILED_TO_CONNECT',
    FAILED_TO_PAIR: 'FAILED_TO_PAIR',
    UNKNOWN: 'UNKNOWN'
});

module.exports = DEVICE_CONNECTION_STATUS;