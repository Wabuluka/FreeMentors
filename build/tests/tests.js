"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var userToken;
var adminToken;
describe('All routes checker', function () {
  it('Should check the landing url', function (done) {
    _chai["default"].request(_server["default"]).get('/').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be.eql('Welcome to FreeMentor');
      done();
    });
  });
  it('Should check the landing url', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1').end(function (err, res) {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      res.body.message.should.be.eql('Welcome to FreeMentor');
      done();
    });
  });
  it('should signup a new user', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send({
      "firstName": "Davies",
      "lastName": "Wabuluka",
      "email": "two@test.com",
      "password": "test123",
      "address": "nalumunye",
      "bio": "a good man",
      "occupation": "teacher",
      "expertise": "cooking"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('object');
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('A user can not create two accounts with same email', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send({
      "firstName": "Davies",
      "lastName": "Wabuluka",
      "email": "two@test.com",
      "password": "test123",
      "address": "nalumunye",
      "bio": "a good man",
      "occupation": "teacher",
      "expertise": "cooking"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('should login a user', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/login').send({
      "email": "two@test.com",
      "password": "test123"
    }).then(function (res) {
      userToken = res.body.data['token'];
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('object');
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('login user not found', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/login').send({
      "email": "twothree@test.com",
      "password": "test123"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('login is denied', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/login').send({
      "email": "two@test.com",
      "password": "test1231"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('should signup a new admin', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/admin/signup').send({
      "email": "test@admin.com",
      "password": "test123"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('object');
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('User already created', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/admin/signup').send({
      "email": "test@admin.com",
      "password": "test123"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('should login admin', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/admin/login').send({
      "email": "test@admin.com",
      "password": "test123"
    }).then(function (res) {
      adminToken = res.body.data['token'];
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('object');
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('user not found', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/admin/login').send({
      "email": "testtest@admin.com",
      "password": "test123"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('login denied', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/admin/login').send({
      "email": "test@admin.com",
      "password": "test1231"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('admin gets all users in the system', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/admin/users/all').set('x-access-token', adminToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('admin gets a user by id from the system', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/admin/users/1').set('x-access-token', adminToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('object');
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('admin gets a user by id from the system but the user doesnt exist', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/admin/users/100').set('x-access-token', adminToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('admin changes a user to mentor', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/admin/users/1').send({
      "isMentor": "true"
    }).set('x-access-token', adminToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('oneUser'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('admin changes a user to mentor who doesnt exist', function (done) {
    _chai["default"].request(_server["default"]).patch('/api/v1/admin/users/11').send({
      "isMentor": "true"
    }).set('x-access-token', adminToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('admin deletes user', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/v1/admin/users/1').set('x-access-token', adminToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('message'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('admin deletes user', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/v1/admin/users/11').set('x-access-token', adminToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('user gets all the mentors but the mentor is deleted', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/mentors').set('x-access-token', userToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('error'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('should signup a new user', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/signup').send({
      "firstName": "Davies",
      "lastName": "Wabuluka",
      "email": "two@test.com",
      "password": "test123",
      "address": "nalumunye",
      "bio": "a good man",
      "occupation": "teacher",
      "expertise": "cooking"
    }).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('object');
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('should login a user', function (done) {
    _chai["default"].request(_server["default"]).post('/api/v1/auth/login').send({
      "email": "two@test.com",
      "password": "test123"
    }).then(function (res) {
      userToken = res.body.data['token'];
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('data');
      (0, _chai.expect)(res.body).to.have.property('data').to.be.an('object');
      done();
    })["catch"](function (err) {
      return done(err);
    });
  });
  it('user gets all the mentors', function (done) {
    _chai["default"].request(_server["default"]).get('/api/v1/mentors').set('x-access-token', userToken).then(function (res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('status');
      (0, _chai.expect)(res.body).to.have.property('message'); // expect(res.body).to.have.property('data').to.be.an('object');

      done();
    })["catch"](function (err) {
      return done(err);
    });
  }); // it('admin changes a user to mentor who doesnt exist', (done) => {
  //     chai
  //         .request(app)
  //         .patch('/api/v1/admin/users/1')
  //         .send({
  //             "isMentor": "true"
  //         })
  //         .set('x-access-token', adminToken)
  //         .then((res) => {
  //             expect(res.body).to.be.an('object');
  //             expect(res.body).to.have.property('status');
  //             expect(res.body).to.have.property('error');
  //             // expect(res.body).to.have.property('data').to.be.an('object');
  //             done();
  //         })
  //         .catch(err => done(err));
  // })
  // it('user gets all the mentors ', (done) => {
  //     chai
  //         .request(app)
  //         .get('/api/v1/mentors')
  //         .set('x-access-token', userToken)
  //         .then((res) => {
  //             expect(res.body).to.be.an('object');
  //             expect(res.body).to.have.property('status');
  //             expect(res.body).to.have.property('message');
  //             // expect(res.body).to.have.property('data').to.be.an('object');
  //             done();
  //         })
  //         .catch(err => done(err));
  // })
});