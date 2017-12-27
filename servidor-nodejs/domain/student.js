'use strict'

module.exports = repository => ({

    makeAttendance: (studentId, classId) => {
        repository.saveClassToStudent(studentId, classId)
    },

    removeAttendance: (studentId, classId) => {
        repository.removeClassFromStudent(studentId, classId)
    },

    retrieveAttendances: (studentId, callback) => {
        repository.getClassFromStudent(studentId, callback)
    }
})