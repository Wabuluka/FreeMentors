"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../controllers/user"));

var _admin = _interopRequireDefault(require("../controllers/admin"));

var _helper = _interopRequireDefault(require("./helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: "verifyAdmin",
    value: function verifyAdmin(req, res, next) {
      var token = req.headers['x-access-token'];

      if (!token) {
        return res.status(400).send({
          'message': 'Token not provided'
        });
      }

      try {
        var decodedAdmin = _helper["default"].verifyToken(token);

        var AdminLoaded = _admin["default"].admins.find(function (a) {
          return a.email === decodedAdmin.userEmail;
        });

        if (!AdminLoaded) {
          return res.status(401).send({
            status: 401,
            error: 'You are not admin'
          });
        }

        next();
      } catch (error) {
        return res.status(401).send({
          status: 401,
          error: 'Invalid Token '
        });
      }
    }
  }, {
    key: "verifyUser",
    value: function verifyUser(req, res, next) {
      var token = req.headers['x-access-token'];

      if (!token) {
        return res.status(400).send({
          'message': 'Token not provided'
        });
      }

      try {
        var decodedUser = _helper["default"].verifyToken(token);

        var loadedUser = _user["default"].users.find(function (u) {
          return u.email === decodedUser.userEmail;
        });

        if (!loadedUser) {
          return res.status(401).send({
            status: 401,
            error: 'You are not a user'
          });
        }

        next();
      } catch (error) {
        return res.status(401).send({
          status: 401,
          error: 'Invalid Token '
        });
      }
    }
  }]);

  return Auth;
}();

var _default = Auth;
exports["default"] = _default;