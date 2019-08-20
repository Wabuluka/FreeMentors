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
    })
})

