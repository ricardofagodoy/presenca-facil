'use strict'

const utils = require('util/utils')
const firebase = require('firebase')

firebase.initializeApp({
    "databaseURL": "https://presenca-facil-a8cee.firebaseio.com/",
})

const studentDb = firebase.database().ref('student')
const classDb = firebase.database().ref('class')
const attendanceDb = firebase.database().ref('attendance')

module.exports = {

    /* Student database */
    saveClassToStudent: (studentId, classId) => {
        studentDb.child(studentId).child(classId).set(Date.now())
    },

    removeClassFromStudent: (studentId, classId) => {
        studentDb.child(studentId).child(classId).remove()
    },

    getClassFromStudent: (studentId, callback) => {
        studentDb.child(studentId).once('value').then(snapshot => {
            let classes = snapshot.toJSON() 

            if (!classes)
                classes = {};

            //utils.jsonToIntegerArray(snapshot.toJSON())
            callback(classes)
        })
    },

    /* Class database */
    saveDeviceToClass: (classId, device) => {
        classDb.child(classId).set(device)
    },

    getDeviceFromClass: (classId, callback) => {
        classDb.child(classId).once('value').then(snapshot => {
            callback(snapshot.val())
        })
    },

    removeDeviceFromClass: (classId) => {
        classDb.child(classId).remove()
    },

    /* Attendance database */
    saveStudentToAttendance: (studentId, classId) => {
        attendanceDb.child(classId).child(studentId).set(Date.now())
    },

    removeStudentFromAttendance: (studentId, classId) => {
        attendanceDb.child(classId).child(studentId).remove()
    },

    getAttendanceByClass: (classId, callback) => {
        attendanceDb.child(classId).once('value').then(snapshot => {
            let attendances = snapshot.toJSON() 
            
                if (!attendances)
                    attendances = {};
                
                //utils.jsonToIntegerArray(snapshot.toJSON())
            callback(attendances)
        })
    },

    /* Util method */
    getDatabase: "Not available in production!" 
}