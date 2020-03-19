import CONNECTION_STATUS from "../../enums/ConnectionStatus";

class IBluetoothEnabledDevice {
  constructor(
    id,
    name,
    batteryLevel,
    connectionStatus,
    activityStatus,
    connected
  ) {
    this.id = id;
    this.name = name;
    this.batteryLevel = batteryLevel;
    this.connectionStatus = connectionStatus;
    this.connected = connected;

    this.someFunc = sth => {
      console.log(sth);
    };
  }

  connect = deviceConnectionStatus => {
    this.connected = true;
    this.connectionStatus = deviceConnectionStatus.connectionStatus;
  };

  changeConnectionStatus = status => {
    this.connectionStatus = status;
  };

  disconnect = () => {
    this.connected = false;
    this.connectionStatus = CONNECTION_STATUS.DISCONNECTED;
  };

  disconnectPaired = () => {
    console.log("disconnecting here");
    this.connected = false;
    this.connectionStatus = CONNECTION_STATUS.PAIRED;
  };

  failedToConnect = () => {
    this.connected = false;
    this.connectionStatus = CONNECTION_STATUS.FAILED;
  };

  pair = () => {};

  synchronise = () => {};

  getName = () => {};

  getUniqueAddress = () => {};

  getConnectedState = () => {};
}

export default IBluetoothEnabledDevice;
