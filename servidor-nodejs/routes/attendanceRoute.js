'use strict'

const logger = require('../logger')

module.exports = function (router, repository) {

    const attendance = require('../domain/attendance')(repository)
    const student = require('../domain/student')(repository)
    const specificClass = require('../domain/class')(repository)

    router.route('/')
        .post((req, res) => {

            const studentsId = [].concat(req.body.studentId)
            const classId = req.body.classId;
            const deviceId = req.body.deviceId;

            logger.info('Making attendance to studentsId %s on classId %d (%s)', studentsId, classId, deviceId);

            specificClass.validateDevice(classId, deviceId, (valid) => {

                if (valid) {

                    studentsId.forEach(id => {
                        attendance.makeAttendance(id, classId)
                        student.makeAttendance(id, classId)
                    })

                } else {
                    logger.info('Fail making attendance to studentId %s on classId %d (%s) - Class not open!', studentsId, classId, deviceId);
                    res.status(400)
                }

                res.end()
            })
        })

    router.route('/remove')
        .post((req, res) => {

            const studentsId = [].concat(req.body.studentId)
            const classId = req.body.classId;

            logger.info('Removing attendance from studentsId %s on classId %d', studentsId, classId);

            studentsId.forEach(id => {
                attendance.removeAttendance(id, classId)
                student.removeAttendance(id, classId)
            })

            res.end()
        })
};