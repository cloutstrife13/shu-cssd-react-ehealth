class Logger {

    constructor() {
        this.logs = [];
    }

    log(message) {
        const timestamp = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
        this.logs.push({message, timestamp});
        console.log(`${timestamp} - ${message}`)
    }
}

module.exports = new Logger();