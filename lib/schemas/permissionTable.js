"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: "permission",
  label: "Permissions",
  description: "Permission Table",
  version: "1.0.0",
  columns: [{
    type: "INTEGER",
    name: "id",
    label: "Identity"
  }, {
    type: "INTEGER",
    name: "schemaId",
    label: "Schema Identifier"
  }, {
    type: "INTEGER",
    name: "roleId",
    label: "Role Identifier"
  }, {
    type: "INTEGER",
    name: "workflowStateId",
    label: "Workflow State Identifier"
  }, {
    type: "INTEGER",
    name: "canCreate",
    label: "Can Create"
  }, {
    type: "INTEGER",
    name: "canRead",
    label: "Can Read"
  }, {
    type: "INTEGER",
    name: "canUpdate",
    label: "Can Update"
  }, {
    type: "INTEGER",
    name: "canDelete",
    label: "Can Delete"
  }],
  primaryKeys: ["id"],
  unique: [{
    columns: ["roleId", "schemaId", "workflowStateId"],
    conflictOptions: "REPLACE"
  }],
  foreignKeys: {
    "roleId": {
      "label": "Role",
      "source": {
        "name": "role",
        "version": "1.0.0",
        "label": "Permissions",
        "column": "id"
      }
    },
    "workflowStateId": {
      "label": "Workflow State",
      "source": {
        "name": "workflowState",
        "version": "1.0.0",
        "label": "Permissions",
        "column": "id"
      }
    },
    "schemaId": {
      "label": "Schema",
      "source": {
        "name": "schema",
        "version": "1.0.0",
        "label": "Permissions",
        "column": "id"
      }
    }
  }
};
exports.default = _default;
//# sourceMappingURL=permissionTable.js.map