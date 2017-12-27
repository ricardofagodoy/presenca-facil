'use strict'

const logger = require('../logger')

module.exports = function (router, repository) {

    const student = require('../domain/student')(repository)

    router.route('/student/:id')
        .get((req, res) => {

            const studentId = req.params.id;

            logger.info('Retrieve student %d attendances', studentId);

            student.retrieveAttendances(studentId, (attendances) => {
                res.json(attendances)
                res.end()
            });
        })
};