"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionModel = function SessionModel(sessionId, mentorId, menteeId, questions, menteeEmail, status) {
  _classCallCheck(this, SessionModel);

  this.sessionId = sessionId;
  this.mentorId = mentorId;
  this.menteeId = menteeId;
  this.questions = questions;
  this.menteeEmail = menteeEmail;
  this.status = status;
  this.createdOn = (0, _moment["default"])().format('LLLL');
  this.lastModified = (0, _moment["default"])().format('LLLL');
};

var _default = SessionModel;
exports["default"] = _default;