'use strict'

module.exports = repository => ({

    makeAttendance: function (studentId, classId) {
        repository.saveStudentToAttendance(studentId, classId)
    },

    removeAttendance: function(studentId, classId) {
        repository.removeStudentFromAttendance(studentId, classId)
    },

    retrieveAttendances: function (classId, callback) {
        repository.getAttendanceByClass(classId, callback)
    }
})