"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: "workflow",
  label: "Workflows",
  description: "Workflow Table",
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
  primaryKeys: ["id"]
};
exports.default = _default;
//# sourceMappingURL=workflowTable.js.map