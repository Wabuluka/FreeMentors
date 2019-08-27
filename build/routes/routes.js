"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _admin = _interopRequireDefault(require("../controllers/admin"));

var _session = _interopRequireDefault(require("../controllers/session"));

var _auth = _interopRequireDefault(require("../middleware/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express["default"])(); // Landing Urls

routes.get("/", function (req, res) {
  return res.status(301).redirect("/api/v1");
});
routes.get("/api/v1", function (req, res) {
  return res.status(200).send({
    status: res.statusCode,
    message: "Welcome to FreeMentor"
  });
}); // users create accounts to use the application

routes.post('/api/v1/auth/signup', _user["default"].UserController.RegisterUser); // user can login

routes.post('/api/v1/auth/login', _user["default"].UserController.UserLogin); // admin create account

routes.post('/api/v1/auth/admin/signup', _admin["default"].AdminController.RegisterAdmin); // admin log in

routes.post('/api/v1/auth/admin/login', _admin["default"].AdminController.AdminLogin); // admin can view all users registered

routes.get('/api/v1/admin/users/all', _auth["default"].verifyAdmin, _admin["default"].AdminController.GetAllUsers); // admin get a user by id

routes.get('/api/v1/admin/users/:id', _auth["default"].verifyAdmin, _admin["default"].AdminController.GetOneUser); // admin changes user to mentor or viseversa

routes.patch('/api/v1/admin/users/:id', _auth["default"].verifyAdmin, _admin["default"].AdminController.CheckToMentor); // admin can delete user

routes["delete"]('/api/v1/admin/users/:id', _auth["default"].verifyAdmin, _admin["default"].AdminController.DeleteOneUser); // a user gets all the mentors available

routes.get('/api/v1/mentors', _auth["default"].verifyUser, _user["default"].UserController.GetAvailableMentors); // user gets one mentor

routes.get('/api/v1/mentors/:id', _auth["default"].verifyUser, _user["default"].UserController.GetOneMentor); // users create sessions

routes.post('/api/v1/sessions', _auth["default"].verifyUser, _session["default"].SessionController.createSession); // mentor sees session requests

routes.get('/api/v1/sessions/requests', _auth["default"].verifyUser, _user["default"].UserController.mentorViewSessionRequests); // mentor sees a session request

routes.get('/api/v1/sessions/requests/:id', _auth["default"].verifyUser, _user["default"].UserController.mentorViewSingleSessionRequest); // accept session

routes.patch('/api/v1/sessions/requests/:id/accept', _auth["default"].verifyUser, _user["default"].UserController.mentorAcceptsRequest); // decline session

routes.patch('/api/v1/sessions/requests/:id/decline', _auth["default"].verifyUser, _user["default"].UserController.mentorDeclinesRequest);
var _default = routes;
exports["default"] = _default;