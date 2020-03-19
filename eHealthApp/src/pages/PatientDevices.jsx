import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonLabel, IonItem, IonAlert } from "@ionic/react";

import DeviceCard from "../components/DeviceCard";
import BackButtonToolbar from "../components/BackButtonToolbar";
import BluetoothSynchronisationManager from "../bluetooth/managers/BluetoothSynchronisationManager";

// Styling
const styles = {
  labelContainer: {
    height: "100%",
    display: "flex"
  },
  noDevicesLabel: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: "30px"
  },
  failText: {
    fontSize: "20px",
    textAlign: "center"
  },
  failButtonContainer: {
    display: "flex",
    justifyContent: "center"
  },
  disconnectModalLabel: {
    textAlign: "center"
  },
  disconnectModalButtonsContainer: {
    display: "flex",
    justifyContent: "space-around"
  },
  button: {
    width: "75px"
  }
};

const PatientDevices = () => {
  /**
   * State holders for:
   * - Paired devices
   * - Displaying the connection failure modal
   * - Displaying the disconnection modal
   * - Clicked device
   */
  const [pairedDevices, setPairedDevices] = useState(
    BluetoothSynchronisationManager.getPairedDevices()
  );
  const [showFailModal, setShowFailModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [clickedDeviceHolder, setClickedDeviceHolder] = useState();

  /**
   * When the component renders, it attaches an Observer function
   */
  useEffect(() => {
    BluetoothSynchronisationManager.attachDevicesObserver(
      rerenderPairedDevices
    );
  }, []);

  /**
   * Observer function used to rerender paired devices
   */
  const rerenderPairedDevices = () => {
    setPairedDevices(BluetoothSynchronisationManager.getPairedDevices());
  };

  /**
   * Handles the clicking event on the device, on the page
   * When the device is paired and disconnected, tries to connect
   * When the device is connected, disconnects
   * @param {String} id - Device clicked by the user on the page
   */
  const deviceClickHandler = id => {
    const clickedDevice = pairedDevices.find(x => x.id === id);
    setClickedDeviceHolder(clickedDevice);
    if (
      (clickedDevice.connectionStatus.toLowerCase() === "paired" ||
        clickedDevice.connectionStatus.toLowerCase() === "disconnected") &&
      clickedDevice.connected === false
    ) {
      // CONNECT
      changeDeviceStatus(id, "CONNECTING");
      BluetoothSynchronisationManager.connectToDevice(id)
        .then(res => {
          clickedDevice.connect(res);
          changeDeviceStatus(id, "CONNECTED");
        })
        .catch(err => {
          changeDeviceStatus(id, "FAILED");
          setShowFailModal(true);
        });
    } else if (
      clickedDevice.connectionStatus.toLowerCase() === "connected" &&
      clickedDevice.connected
    ) {
      // DISCONNECT
      setShowDisconnectModal(true);
    }
  };

  /**
   * Triggered on attempt to close the 'Failed connecting' modal
   * Can be triggered either via button press, or clicking on the background
   * Ensures that the modal is closed, and the device's connection status is cahnged to 'PAIRED'
   */
  const failConnectModalHandler = () => {
    setShowFailModal(false);
    changeDeviceStatus(clickedDeviceHolder.id, "PAIRED");
  };

  /**
   * Handles click of a button on 'Disconnect Device' modal
   * When 'Yes' is selected - disconnects the device
   * When 'No' is selected - closes the modal
   * @param {} disconnect - Flag used to disconnect a connected device
   */
  const disconnectModalHandler = disconnect => {
    setShowDisconnectModal(false);
    if (disconnect) {
      clickedDeviceHolder.disconnect();
      changeDeviceStatus(clickedDeviceHolder.id, "DISCONNECTED");
      BluetoothSynchronisationManager.disconnect(clickedDeviceHolder.id);
      clickedDeviceHolder.disconnect();
    }
  };

  /**
   * Changes the device's connection status using React Hooks
   * Function has been encapsulated as it repeats quite often in this component
   * In order to successfuly rerender the component,
   * the device we are updating has to be removed from the devices array,
   * added back again and then array has to be sorted alphabetically
   * @param {String} id - ID of device
   * @param {String} status - Connection status of the device
   * @return ... TO DO
   */
  const changeDeviceStatus = (id, status) => {
    setPairedDevices(() => {
      const connectingDevice = pairedDevices.find(device => device.id === id);
      connectingDevice.changeConnectionStatus(status);
      const filteredPairedDevices = pairedDevices.filter(
        device => device.id !== id
      );
      filteredPairedDevices.push(connectingDevice);
      filteredPairedDevices.sort((a, b) => a.name.localeCompare(b.name));
      return filteredPairedDevices;
    });
  };

  return (
    <IonPage>
      <BackButtonToolbar title="Devices" />
      <IonAlert
        isOpen={showFailModal}
        onDidDismiss={failConnectModalHandler}
        header={"Failed"}
        message={"Failed pairing with a bluetooth device"}
        buttons={[
          {
            text: "OK",
            role: "ok"
          }
        ]}
      />
      <IonAlert
        isOpen={showDisconnectModal}
        onDidDismiss={disconnectModalHandler.bind(this, false)}
        header={"Disconnect?"}
        message={"Do you want to disconnect from the device?"}
        buttons={[
          {
            text: "Yes",
            handler: () => {
              disconnectModalHandler(true);
            }
          },
          {
            text: "No",
            handler: () => {
              disconnectModalHandler(false);
            }
          }
        ]}
      />
      <IonContent className="ion-padding">
        {pairedDevices.length > 0 ? (
          pairedDevices.map(x => {
            return (
              <DeviceCard
                className={x.id}
                key={x.id}
                title={x.name}
                connected={x.connected}
                connectionStatus={x.connectionStatus}
                onClick={deviceClickHandler.bind(this, x.id)}
              />
            );
          })
        ) : (
          <IonItem lines="none" style={styles.labelContainer}>
            <IonLabel style={styles.noDevicesLabel}>No devices found</IonLabel>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PatientDevices;
