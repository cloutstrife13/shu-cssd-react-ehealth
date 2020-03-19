const Logger = require('../singletons/Logger');

class SensorData {
    constructor(data) {
        console.log(data)
        const {id, randomData1, randomData2} = data;
    }

    showTheMoney = () => {
        Logger.log(`Created a data with id ${this.id}, randomData1 ${this.randomData1}, randomData2 ${this.randomData2}`)
    }
}

module.exports = SensorData;