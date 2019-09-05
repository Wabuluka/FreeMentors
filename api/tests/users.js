import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';


chai.should();
chai.use(chaiHttp);

let userToken;


describe('Testing routes for the user', () =>{
    it('should signup a new user', (done) => {
        chai
            .request(app)
            .post('/api/v1/auth/signup')
            .send({
                "firstName": "Davies",
                "lastName": "Wabuluka",
                "email": "two@test.com",
                "password": "test@123",
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
                "password": "test@123",
                "address": "nalumunye",
                "bio": "a good man",
                "occupation": "teacher",
                "expertise": "cooking"
            })
            .then((res) => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('error');
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
                "password": "test@123"
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
                done();
            })
            .catch(err => done(err));
    });
    
})
