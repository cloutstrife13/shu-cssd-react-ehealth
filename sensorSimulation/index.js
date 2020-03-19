const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Logger = require('./singletons/Logger');
const eventEmitter = require('./eventsHandler');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app
    .get('/', (req, res) => {
        res.send("got here");
    })
    .get(`/getBluetoothDevices`, (req, res) => {
        Logger.log(`Someone requested devices`);
        eventEmitter.emit('onBluetoothDevicesRequest', res);
    })
    .post(`/synchroniseData`, (req, res) => {
        if (req && req.body) {
            eventEmitter.emit('syncData', {id: req.body.id, res:res});
        }
    })
    .post(`/connectDevice`, (req, res) => {
        if (req && req.body) {
            const deviceId = req.body.id;
            eventEmitter.emit('connectToSensor', {id: deviceId, res: res});
        }
    })
    .post(`/disconnectDevice`, (req, res) => {
        if (req && req.body) {
            const deviceId = req.body.id;
            eventEmitter.emit(`disconnectSensor`, {id: deviceId, res: res});
        }
    })
    .post('/startActivity', (req, res) => {
        if (req && req.body) {
            console.log(req.body)
            Logger.log('[INFO] Activity started')
            eventEmitter.emit('startActivity', {res: res, type: req.body.type})
        }
    })
    .get('/stopActivity', (req, res) => {
        Logger.log('[INFO] Activity has been stopped')
        eventEmitter.emit('stopActivity', {res:res})
    })


app.listen(PORT, () => {
    Logger.log(`[INFO] Server's listening on port ${PORT}`);
    eventEmitter.emit('serverRunning');
});

