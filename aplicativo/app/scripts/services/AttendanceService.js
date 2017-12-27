import Constants from 'utils/Constants'
import BaseService from 'services/BaseService'
import FirebaseDatabase from 'repository/Firebase'

const db = FirebaseDatabase.ref('class')

export default {

  startClassStatusCheck: (classId, callback) =>
    db.child(classId).on('value', function (snapshot) {
      callback(snapshot.val())
    }),

  stopClassStatusCheck: (classId) =>
    db.child(classId).off(),

  makeAttendance: (classId, deviceId, studentId, success, failure) =>
    BaseService.post(Constants.WS_ATTENDANCE.MAKE_ATTENDANCE, {
      studentId: studentId,
      classId: classId,
      deviceId: deviceId
    }, success, failure),

  makeNoDeviceAttendance: (classId, studentId, success, failure) =>
    BaseService.post(Constants.WS_ATTENDANCE.MAKE_ATTENDANCE, {
      studentId: studentId,
      classId: classId
    }, success, failure),

  removeAttendance: (classId, studentId, success, failure) =>
    BaseService.post(Constants.WS_ATTENDANCE.DELETE_ATTENDANCE, {
      studentId: studentId,
      classId: classId
    }, success, failure),

  openAttendance: (classId, success, failure) =>
    BaseService.get(Constants.WS.OPEN_ATTENDANCE + classId, success, failure),

  findAttendances: (studentId, success, failure) =>
    BaseService.get(Constants.WS_ATTENDANCE.STUDENT_ATTENDANCES + studentId, success, failure, (r) => r.data),


  findClassesFrequency: (studentId, success, failure) =>
    BaseService.get(Constants.WS.STUDENT_CLASSES_FREQUENCY + studentId, success, failure)
}