'use strict'

const logger = require('../logger')
const DEFAULT_TIMEOUT_IN_SECONDS = 120

module.exports = function (router, repository) {

    const specificClass = require('../domain/class')(repository)
    const attendance = require('../domain/attendance')(repository)

    router.route('/class/:id')
        .post((req, res) => {

            const classId = req.params.id;
            const deviceId = req.body.deviceId;
            const timeout = req.body.timeout || DEFAULT_TIMEOUT_IN_SECONDS

            logger.info('Open class %d (%d s) for Beacon %s', classId, timeout, deviceId);
            specificClass.open(classId, deviceId);

            setTimeout(() => {
                logger.info('Closing class %d by timeout (%d seconds)', classId, timeout)
                specificClass.close(classId);
            }, timeout * 1000)

            res.end();
        })

        .delete((req, res) => {

            const classId = req.params.id;

            logger.info('Close class %d', classId);
            specificClass.close(classId);

            res.end();
        })

        .get((req, res) => {

            const classId = req.params.id;

            logger.info('Retrieve attendances to class %d', classId);
            attendance.retrieveAttendances(classId, (attendances) => {
                res.json(attendances)
                res.end()
            });
        });
};