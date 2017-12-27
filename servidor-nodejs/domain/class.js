'use strict'

module.exports = repository => ({

    open: (classId, deviceId) => {
        repository.saveDeviceToClass(classId, deviceId)
    },

    close: (classId) => {
        repository.removeDeviceFromClass(classId)
    },

    validateDevice: (classId, deviceId, callback) => {
        repository.getDeviceFromClass(classId, (foundDevice) => {

            if (foundDevice === undefined)
                return callback(false)

            callback(deviceId === undefined || deviceId == foundDevice)
        })
    }
})