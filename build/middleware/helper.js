"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword: function hashPassword(password) {
    return _bcrypt["default"].hashSync(password, _bcrypt["default"].genSaltSync(8));
  },

  /**
   * ComparePassword
   * @param {string} hashedPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword: function comparePassword(hashPassword, password) {
    return _bcrypt["default"].compareSync(password, hashPassword);
  },

  /**
   * isValidEmail helper method
   */
  isValidEmail: function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },

  /**
   * isValidEmail helper method
   */
  checkPassword: function checkPassword(password) {
    if (password.length < 8) {
      return res.status(400).send({
        status: 400,
        error: "Password to short"
      });
    }
  },

  /**
   * Generate token
   */
  generateToken: function generateToken(id) {
    var token = _jsonwebtoken["default"].sign({
      userEmail: id
    }, process.env.SECRETKEY, {
      expiresIn: '1d'
    });

    return token;
  },

  /**
   * Verify Token
   */
  verifyToken: function verifyToken(token) {
    return _jsonwebtoken["default"].verify(token, process.env.SECRETKEY);
  }
};
var _default = Helper;
exports["default"] = _default;