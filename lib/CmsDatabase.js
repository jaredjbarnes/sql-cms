"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _schemas = _interopRequireDefault(require("./schemas"));

var _sqliteRepository = require("sqlite-repository");

var _sqlite = _interopRequireDefault(require("sqlite3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CmsDatabase {
  constructor(sqliteFile) {
    if (sqliteFile == null) {
      throw new Error("Invalid Argument Exception: CmsDatabase needs to have a sqliteFile.");
    }

    const sqliteDatabase = new _sqlite.default.Database(sqliteFile);
    this.database = new _sqliteRepository.SqliteDatabase({
      database: sqliteDatabase,
      schemas: _schemas.default
    });
  }

  async prepareAsync() {
    await this.database.createTablesFromSchemasAsync();
  }

  static async getCmsDatabaseAsync(sqliteFile) {
    const cmsDatabase = new CmsDatabase(sqliteFile);
    await cmsDatabase.prepareAsync();
    return cmsDatabase.database;
  }

}

exports.default = CmsDatabase;
//# sourceMappingURL=CmsDatabase.js.map