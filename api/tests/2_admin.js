import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import userDetails from './mocks/mocks';
import app from '../server';


chai.should();
chai.use(chaiHttp);

let adminToken;
const admin = userDetails.admin;

describe('Testing Admin Routes', () =>{
    it('should signup a new admin', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/signup')
            .send({
                "email":admin[0]['email'],
                "password":admin[0]['password']
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });

    it('admin already created', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/signup')
            .send({
                "email":admin[0]['email'],
                "password":admin[0]['password']
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            })
            .catch(err => done(err));
    });

    it('should login admin', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/login')
            .send({
                "email":"test@admin.com",
                "password":"test123"
            })
            .then((res) => {
                adminToken = res.body.data['token'];
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    })

    it('admin user not found', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/login')
            .send({
                "email":"testtest@admin.com",
                "password":"test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            })
            .catch(err => done(err));
    })

    it('login denied', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/login')
            .send({
                "email":"test@admin.com",
                "password":"test1231"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            })
            .catch(err => done(err));
    })
    it('admin gets all users in the system', (done) => {
        chai
            .request(app)
            .get('/api/v1/admin/users/all')
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                done();
            })
            .catch(err => done(err));
    })

    it('admin gets a user by id from the system', (done) => {
        chai
            .request(app)
            .get('/api/v1/admin/users/1')
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    })

    it('admin gets a user by id from the system but the user doesnt exist', (done) => {
        chai
            .request(app)
            .get('/api/v1/admin/users/100')
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            })
            .catch(err => done(err));
    })

    it('admin changes a user to mentor', (done) => {
        chai
            .request(app)
            .patch('/api/v1/admin/users/1')
            .send({
                "isMentor": "true"
            })
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                done();
            })
            .catch(err => done(err));
    })

    it('admin changes a user to mentor who doesnt exist', (done) => {
        chai
            .request(app)
            .patch('/api/v1/admin/users/11')
            .send({
                "isMentor": "true"
            })
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            })
            .catch(err => done(err));
    })

    it('admin deletes user', (done) => {
        chai
            .request(app)
            .delete('/api/v1/admin/users/1')
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('message');
                done();
            })
            .catch(err => done(err));
    })

    it('admin deletes user', (done) => {
        chai
            .request(app)
            .delete('/api/v1/admin/users/11')
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                done();
            })
            .catch(err => done(err));
    })
    
    
})