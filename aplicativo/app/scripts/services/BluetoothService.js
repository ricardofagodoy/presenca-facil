import Constants from 'utils/Constants'

export default {
    scanDevices: (seconds, deviceFound, failure) => {

        console.log('Scanning bluetooth for devices!')

        if (!window.ble) {
            console.log('Bluetooth plugin not available!')

            // CALLING FAKE FOUND DEVICE WITH BEACON Presenca_00001
            return deviceFound({id: "Presenca_00001"});
        }

        console.log('Scanning nearby devices for ' + seconds + ' seconds...')
        ble.scan([], seconds, deviceFound, failure)
    }
}