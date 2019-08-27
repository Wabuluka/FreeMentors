"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Admin = function Admin(id, email, password) {
  _classCallCheck(this, Admin);

  this.id = id;
  this.email = email;
  this.password = password;
  this.createdOn = (0, _moment["default"])().format('LLLL');
};

var _default = Admin;
exports["default"] = _default;