"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: "workflowOption",
  label: "Workflow Options",
  description: "Workflow Options",
  version: "1.0.0",
  columns: [{
    type: "INTEGER",
    name: "id",
    label: "Identifier"
  }, {
    type: "INTEGER",
    name: "sourceWorkflowStateId",
    label: "Source Workflow Identifer"
  }, {
    type: "INTEGER",
    name: "targetWorkflowStateId",
    label: "Target Workflow Identifer"
  }, {
    type: "INTEGER",
    name: "workflowId",
    label: "Workflow Identifer"
  }],
  primaryKeys: ["id"],
  unique: [{
    columns: ["sourceWorkflowStateId", "targetWorkflowStateId", "workflowId"],
    conflictOptions: "FAIL"
  }],
  foreignKeys: {
    sourceWorkflowStateId: {
      label: "Source",
      source: {
        name: "workflowState",
        version: "1.0.0",
        label: "As Source Workflow Option",
        column: "id"
      }
    },
    targetWorkflowStateId: {
      label: "Target",
      source: {
        name: "workflowState",
        version: "1.0.0",
        label: "As Target Workflow Option",
        column: "id"
      }
    },
    workflowId: {
      label: "Workflow",
      source: {
        name: "workflowState",
        version: "1.0.0",
        label: "Workflow Option",
        column: "id"
      }
    }
  }
};
exports.default = _default;
//# sourceMappingURL=workflowOptionTable.js.map