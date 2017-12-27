const chai = require('chai')
chai.use(require('chai-http'))
const should = chai.should()

const utils = require('../util/utils')
const server = require('../index')
const BASE_PATH = '/attendance'
const classId = 1, studentsId = [2, 3], deviceId = 'ABCD-1234'

describe('Integration tests', () => {

    describe('/ (server up)', () => {
        it('it should return 200 and timstamp', (done) => {

            chai.request(server)
                .get(BASE_PATH)
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        });
    });

    describe('/class/{classId} (open class with device)', () => {
        it('it should open class ' + classId + ' with deviceId ' + deviceId, (done) => {

            chai.request(server)
                .post(BASE_PATH + '/class/' + classId)
                .send({
                    'deviceId': deviceId
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        });
    });

    describe('/attendance (attendance to student in class)', () => {
        it('it should attend student ' + studentsId[0] + ' to class ' + classId, (done) => {

            chai.request(server)
                .post(BASE_PATH)
                .send({
                    'classId': classId,
                    'studentId': studentsId[0]
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        });
    });

    describe('/attendance (attendance to students in class)', () => {
        it('it should attend students ' + studentsId + ' to class ' + classId, (done) => {

            chai.request(server)
                .post(BASE_PATH)
                .send({
                    'classId': classId,
                    'studentId': studentsId
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done()
                });
        });
    });

    describe('/attendance/class/{classId} (get attendances in class)', () => {
        it('it should get attendances in class ' + classId, (done) => {

            chai.request(server)
                .get(BASE_PATH + '/class/' + classId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    utils.jsonToIntegerArray(res.body).should.be.deep.equal([2, 3])
                    done()
                });
        });
    });

    describe('/attendance/student/{studentId} (get attendances to student)', () => {
        it('it should get attendances to student ' + studentsId[0], (done) => {

            chai.request(server)
                .get(BASE_PATH + '/student/' + studentsId[0])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    utils.jsonToIntegerArray(res.body).should.be.deep.equal([1])
                    done()
                });
        });
    });

    describe('/attendance/student/{studentId} (get attendances to student)', () => {
        it('it should get attendances to student ' + studentsId[1], (done) => {

            chai.request(server)
                .get(BASE_PATH + '/student/' + studentsId[1])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    utils.jsonToIntegerArray(res.body).should.be.deep.equal([1])
                    done()
                });
        });
    });
});