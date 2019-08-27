"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _admin = _interopRequireDefault(require("../models/admin"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _helper = _interopRequireDefault(require("../middleware/helper"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var admins = [];

_dotenv["default"].config();

var AdminController =
/*#__PURE__*/
function () {
  function AdminController() {
    _classCallCheck(this, AdminController);
  }

  _createClass(AdminController, null, [{
    key: "RegisterAdmin",
    value: function RegisterAdmin(req, res) {
      var id = admins.length + 1;

      var password = _helper["default"].hashPassword(req.body.password);

      var userEmail = admins.find(function (admin) {
        return admin.email === req.body.email;
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

      var admin = new _admin["default"](id, req.body.email, password);

      var token = _helper["default"].generateToken(admin.email);

      admins.push(admin);
      return res.status(201).json({
        status: 201,
        data: {
          token: token,
          id: admin.id,
          email: admin.email,
          password: admin.password,
          createdOn: admin.createdOn
        }
      });
    }
  }, {
    key: "AdminLogin",
    value: function AdminLogin(req, res) {
      var loginAdmin = admins.find(function (admin) {
        return admin.email === req.body.email;
      });

      if (!loginAdmin) {
        return res.status(404).send({
          status: 404,
          error: "User with  was not found"
        });
      }

      var passwordCompared = _helper["default"].comparePassword(loginAdmin.password, req.body.password);

      if (!passwordCompared) {
        return res.status(401).send({
          status: 401,
          error: "Login was denied"
        });
      }

      var token = _helper["default"].generateToken(loginAdmin.email);

      return res.status(200).send({
        status: 200,
        data: {
          token: token,
          id: loginAdmin.id,
          message: "You are logged in successfully"
        }
      });
    }
  }, {
    key: "GetAllUsers",
    value: function GetAllUsers(req, res) {
      var allusers = _user["default"].users;

      if (allusers.length <= 0) {
        return res.status(404).send({
          status: 404,
          message: 'No users found'
        });
      }

      return res.status(200).send({
        status: 200,
        data: allusers
      });
    }
  }, {
    key: "GetOneUser",
    value: function GetOneUser(req, res) {
      var oneUser = _user["default"].users.find(function (user) {
        return user.id == req.params.id;
      });

      if (!oneUser) {
        return res.status(404).send({
          status: 404,
          error: 'User not found'
        });
      }

      return res.status(200).send({
        status: 200,
        data: oneUser
      });
    }
  }, {
    key: "CheckToMentor",
    value: function CheckToMentor(req, res) {
      var oneUser = _user["default"].users.find(function (user) {
        return user.id == req.params.id;
      });

      if (!oneUser) {
        return res.status(404).send({
          status: 404,
          error: 'User not found'
        });
      }

      var modified = (0, _moment["default"])().format('LLLL');
      oneUser.isMentor = req.body.isMentor;
      oneUser.lastModified = modified;
      return res.status(202).send({
        status: 202,
        oneUser: oneUser
      });
    }
  }, {
    key: "DeleteOneUser",
    value: function DeleteOneUser(req, res) {
      var oneUser = _user["default"].users.find(function (user) {
        return user.id == req.params.id;
      });

      if (!oneUser) {
        return res.status(404).send({
          status: 404,
          error: 'Not Found'
        });
      }

      var index = _user["default"].users.indexOf(oneUser);

      var removeOne = _user["default"].users.splice(index, 1);

      if (removeOne) {
        return res.status(200).send({
          status: 200,
          message: 'Successfully Deleted a User'
        });
      }

      return res.status(400).send({
        status: 400,
        message: 'Unable to delete'
      });
    }
  }]);

  return AdminController;
}();

var _default = {
  AdminController: AdminController,
  admins: admins
};
exports["default"] = _default;