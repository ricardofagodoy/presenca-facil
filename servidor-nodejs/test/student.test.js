'use strict'

const sinon = require('sinon')
const interfaceRepository = require('../repository/interfaceRepository')

describe('Student domain unit tests', () => {

    it('make student attendance', () => {

        // Inputs
        const studentId = 1, classId = 2

        // Mock repository interface
        const mock = sinon.mock(interfaceRepository);
        mock.expects("saveClassToStudent").once().withArgs(studentId, classId)

        // Act!
        const student = require('../domain/student')(interfaceRepository)
        student.makeAttendance(studentId, classId)

        // Assert!
        mock.verify()
    })

    it('retrieve student attendance', () => {

        const studentId = 1,
            callback = () => { }

        const mock = sinon.mock(interfaceRepository);
        mock.expects("getClassFromStudent").once().withArgs(studentId, callback)

        // Act!
        const student = require('../domain/student')(interfaceRepository)
        student.retrieveAttendances(studentId, callback)

        // Assert!
        mock.verify()
    })
})