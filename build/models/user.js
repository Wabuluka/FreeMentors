"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(id, firstName, lastName, email, password, address, bio, occupation, expertise, status) {
  _classCallCheck(this, User);

  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
  this.address = address;
  this.bio = bio;
  this.occupation = occupation;
  this.expertise = expertise;
  this.status = "available";
  this.isMentor = "false";
  this.createdOn = (0, _moment["default"])().format('LLLL');
  this.lastModified = (0, _moment["default"])().format('LLLL');
};

var _default = User;
exports["default"] = _default;