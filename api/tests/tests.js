import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../index'


chai.should();
chai.use(chaiHttp);

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
                expect(res.body).to.have.property('error');
                // expect(res.body).to.have.property('data').to.be.an('object');
                done();
            })
            .catch(err => done(err));
    });
})

