"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _session = _interopRequireDefault(require("../models/session"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SessionsData = [];

var SessionController =
/*#__PURE__*/
function () {
  function SessionController() {
    _classCallCheck(this, SessionController);
  }

  _createClass(SessionController, null, [{
    key: "createSession",
    value: function createSession(req, res) {
      var sessionId = SessionsData.length + 1;
      var status = "pending";
      var menteeId = req.params.token;
      var newSession = new _session["default"](sessionId, req.body.mentorId, menteeId, req.body.questions, req.body.menteeEmail, status);
      SessionsData.push(newSession);
      console.log(menteeId);
      return res.status(201).send({
        status: 201,
        data: newSession
      });
    }
  }]);

  return SessionController;
}();

var _default = {
  SessionController: SessionController,
  SessionsData: SessionsData
};
exports["default"] = _default;