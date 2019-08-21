import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index'


chai.should();
chai.use(chaiHttp);

let userToken;
let adminToken;

describe('All routes checker', () =>{
    it('Should check the landing url', (done) =>{
        chai
            .request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Welcome to FreeMentor');
                done();
            });
    });
    it('Should check the landing url', (done) =>{
        chai
            .request(app)
            .get('/api/v1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.eql('Welcome to FreeMentor');
                done();
            });
    });
    it('should signup a new user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                "firstName": "Davies",
                "lastName": "Wabuluka",
                "email": "two@test.com",
                "password": "test123",
                "address": "nalumunye",
                "bio": "a good man",
                "occupation": "teacher",
                "expertise": "cooking"
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
    it('A user can not create two accounts with same email', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                "firstName": "Davies",
                "lastName": "Wabuluka",
                "email": "two@test.com",
                "password": "test123",
                "address": "nalumunye",
                "bio": "a good man",
                "occupation": "teacher",
                "expertise": "cooking"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });

    it('should login a user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .send({
                "email": "two@test.com",
                "password": "test123"
            })
            .then((res) => {
                userToken = res.body.data['token'];
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });

    it('login user not found', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .send({
                "email": "twothree@test.com",
                "password": "test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });
    it('login is denied', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/login')
            .send({
                "email": "two@test.com",
                "password": "test1231"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });

    it('should signup a new admin', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/signup')
            .send({
                "email":"test@admin.com",
	            "password":"test123"
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

    it('User already created', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/admin/signup')
            .send({
                "email":"test@admin.com",
	            "password":"test123"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
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

    it('user not found', (done) => {
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
                // expect(res.body).to.have.property('data').to.be.an('object');
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
                // expect(res.body).to.have.property('data').to.be.an('object');
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
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    })

    it('admin changes a user to mentor', (done) => {
        chai
            .request(app)
            .patch('/api/v1/admin/users/1')
            .send({
                "isMentor": true
            })
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('oneUser');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    })

    it('admin changes a user to mentor who doesnt exist', (done) => {
        chai
            .request(app)
            .patch('/api/v1/admin/users/11')
            .send({
                "isMentor": true
            })
            .set('x-access-token', adminToken)
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
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
                // expect(res.body).to.have.property('data').to.be.an('object');
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
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    })
})

