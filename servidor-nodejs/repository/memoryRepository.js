'use strict'

const utils = require('util/utils')

const memoryDatabase = {
    "class": {},
    "attendance": {},
    "student": {}
}

const studentDb = memoryDatabase.student
const classDb = memoryDatabase.class
const attendanceDb = memoryDatabase.attendance

module.exports = {

    /* Student database */
    saveClassToStudent: (studentId, classId) => {
        if (studentDb[studentId] === undefined)
            studentDb[studentId] = {}
            
        studentDb[studentId][classId] = Date.now()
    },

    removeClassFromStudent: (studentId, classId) => {
        delete studentDb[studentId][classId]
    },

    getClassFromStudent: (studentId, callback) => {
        let classes = studentDb[studentId] //utils.jsonToIntegerArray(studentDb[studentId])

        if (!classes)
            classes = {};

        callback(classes)
    },

    /* Class database */
    saveDeviceToClass: (classId, device) => {
        classDb[classId] = device
    },

    getDeviceFromClass: (classId, callback) => {
        callback(classDb[classId])
    },

    removeDeviceFromClass: (classId) => {
        delete classDb[classId]
    },

    /* Attendance database */
    saveStudentToAttendance: (studentId, classId) => {
        if (attendanceDb[classId] === undefined)
            attendanceDb[classId] = {}
        
        attendanceDb[classId][studentId] = Date.now()
    },

    removeStudentFromAttendance: (studentId, classId) => {
        if (attendanceDb[classId])
            delete attendanceDb[classId][studentId]
    },

    getAttendanceByClass: (classId, callback) => {
        let attendances = attendanceDb[classId] //utils.jsonToIntegerArray(attendanceDb[classId])

        if (!attendances)
            attendances = {};

        callback(attendances)
    },

    /* Util method */
    getDatabase: memoryDatabase 
}