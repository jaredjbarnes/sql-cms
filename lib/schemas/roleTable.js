"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: "role",
  label: "Roles",
  description: "Role Table",
  version: "1.0.0",
  columns: [{
    type: "INTEGER",
    name: "id",
    label: "Identity"
  }, {
    type: "TEXT",
    name: "name",
    label: "Name"
  }, {
    type: "TEXT",
    name: "description",
    label: "Description"
  }],
  primaryKeys: ["id"],
  unique: [{
    columns: ["name"],
    conflictOptions: "FAIL"
  }]
};
exports.default = _default;
//# sourceMappingURL=roleTable.js.map