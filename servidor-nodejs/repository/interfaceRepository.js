'use strict'

module.exports = {

    /* Student database */
    saveClassToStudent: (studentId, classId) => {},
    getClassFromStudent: (studentId, callback) => {},

    /* Class database */
    saveDeviceToClass: (classId, device) => {},
    getDeviceFromClass: (classId, callback) => {},
    removeDeviceFromClass: (classId) => {},

    /* Attendance database */
    saveStudentToAttendance: (studentId, classId) => {},
    getAttendanceByClass: (classId, callback) => {},

    /* Util method */
    getDatabase: {}
}