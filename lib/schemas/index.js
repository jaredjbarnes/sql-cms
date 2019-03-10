"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _permissionTable = _interopRequireDefault(require("./permissionTable"));

var _schemaTable = _interopRequireDefault(require("./schemaTable"));

var _identityTable = _interopRequireDefault(require("./identityTable"));

var _roleTable = _interopRequireDefault(require("./roleTable"));

var _assignmentTable = _interopRequireDefault(require("./assignmentTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [_identityTable.default, _roleTable.default, _assignmentTable.default, _schemaTable.default, _permissionTable.default];
exports.default = _default;
//# sourceMappingURL=index.js.map