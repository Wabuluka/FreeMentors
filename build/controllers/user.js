"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../models/user"));

var _session = _interopRequireDefault(require("../controllers/session"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _helper = _interopRequireDefault(require("../middleware/helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var users = [];

_dotenv["default"].config();

var UserController =
/*#__PURE__*/
function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, null, [{
    key: "RegisterUser",
    value: function RegisterUser(req, res) {
      var id = users.length + 1;

      var password = _helper["default"].hashPassword(req.body.password);

      var status = "unverified"; // const isMentor = true;

      var userEmail = users.find(function (user) {
        return user.email === req.body.email;
      });

      if (!_helper["default"].isValidEmail(req.body.email)) {
        return res.status(400).json({
          'status': 400,
          'error': 'The email you provided is not valid'
        });
      }

      if (userEmail) {
        return res.status(400).send({
          status: 400,
          error: "User already registered with this email!"
        });
      }

      var user = new _user["default"](id, req.body.firstName, req.body.lastName, req.body.email, password, req.body.address, req.body.occupation, req.body.expertise);

      var token = _helper["default"].generateToken(user.email);

      users.push(user);
      return res.status(201).json({
        status: 201,
        data: {
          token: token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          isMentor: user.isMentor,
          createdOn: user.createdOn
        }
      });
    }
  }, {
    key: "UserLogin",
    value: function UserLogin(req, res) {
      var loginUser = users.find(function (user) {
        return user.email === req.body.email;
      });

      if (!loginUser) {
        return res.status(404).send({
          status: 404,
          error: "User with  was not found"
        });
      }

      var passwordCompared = _helper["default"].comparePassword(loginUser.password, req.body.password);

      if (!passwordCompared) {
        return res.status(401).send({
          status: 401,
          error: "Login was denied"
        });
      }

      var token = _helper["default"].generateToken(loginUser.email);

      return res.status(200).send({
        status: 200,
        data: {
          token: token,
          id: loginUser.id,
          message: "You are logged in successfully"
        }
      });
    }
  }, {
    key: "GetAvailableMentors",
    value: function GetAvailableMentors(req, res) {
      var availableMentors = users.filter(function (user) {
        return user.isMentor == "true";
      });

      if (availableMentors.length <= 0) {
        return res.status(404).send({
          status: 404,
          message: "No available mentors"
        });
      }

      console.log(availableMentors);
      return res.status(200).send({
        status: 200,
        data: availableMentors
      });
    }
  }, {
    key: "GetOneMentor",
    value: function GetOneMentor(req, res) {
      var oneMentor = req.body.id;
      var availableMentor = users.find(function (user) {
        return user.isMentor == "true";
      }, function (user) {
        return user.id === oneMentor;
      });

      if (!availableMentor) {
        return res.status(404).send({
          status: 404,
          error: 'No mentors available at the moment'
        });
      }

      return res.status(200).send({
        status: 200,
        data: availableMentor
      });
    }
  }, {
    key: "mentorViewSessionRequests",
    value: function mentorViewSessionRequests(req, res) {
      var sessionRequests = _session["default"].SessionsData.filter(function (session) {
        return session.mentorId === 1;
      });

      if (sessionRequests <= 0) {
        return res.status(404).send({
          status: 404,
          error: 'No sessions for you'
        });
      }

      return res.status(200).send({
        status: 200,
        data: sessionRequests
      });
    }
  }, {
    key: "mentorViewSingleSessionRequest",
    value: function mentorViewSingleSessionRequest(req, res) {
      var sessionId = req.body.id;

      var sessionRequests = _session["default"].SessionsData.filter(function (session) {
        return session.mentorId === 1;
      }, function (session) {
        return session.id === sessionId;
      });

      if (sessionRequests <= 0) {
        return res.status(404).send({
          status: 404,
          error: 'No sessions for you'
        });
      }

      return res.status(200).send({
        status: 200,
        data: sessionRequests
      });
    }
  }, {
    key: "mentorAcceptsRequest",
    value: function mentorAcceptsRequest(req, res) {
      var sessionId = req.body.id;

      var sessionRequest = _session["default"].SessionsData.find(function (session) {
        return session.mentorId === 1;
      }, function (session) {
        return session.id === sessionId;
      }, function (session) {
        return session.status === "pending";
      });

      if (sessionRequest <= 0) {
        return res.status(404).send({
          status: 404,
          error: 'No sessions for you'
        });
      }

      sessionRequest.status = "accepted";
      return res.status(200).send({
        status: 200,
        data: sessionRequest
      });
    }
  }, {
    key: "mentorDeclinesRequest",
    value: function mentorDeclinesRequest(req, res) {
      var sessionId = req.body.id;

      var sessionRequest = _session["default"].SessionsData.find(function (session) {
        return session.mentorId === 1;
      }, function (session) {
        return session.id === sessionId;
      }, function (session) {
        return session.status === "pending";
      });

      if (sessionRequest <= 0) {
        return res.status(404).send({
          status: 404,
          error: 'No sessions for you'
        });
      }

      sessionRequest.status = "declined";
      return res.status(200).send({
        status: 200,
        data: sessionRequest
      });
    }
  }]);

  return UserController;
}();

var _default = {
  UserController: UserController,
  users: users
};
exports["default"] = _default;