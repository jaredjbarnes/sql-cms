"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class SchemaManager {
  constructor({
    cmsDatabase,
    actingIdentity
  }) {
    this.actingIdentity = actingIdentity;
    this.schemaTable = cmsDatabase.getTable({
      name: "schema",
      version: "1.0.0"
    });
  }

}

exports.default = SchemaManager;
//# sourceMappingURL=SchemaManager.js.map