"use strict";

var assert = _interopRequireWildcard(require("assert"));

var _CmsDatabase = _interopRequireDefault(require("../CmsDatabase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

exports["CmsDatabase: constructor with no sqliteFile"] = async () => {
  assert.throws(() => {
    const cmsDatabase = new _CmsDatabase.default();
  }, {
    message: "Invalid Argument Exception: CmsDatabase needs to have a sqliteFile."
  });
};

exports["CmsDatabase: constructor with sqliteFile"] = async () => {
  const cmsDatabase = new _CmsDatabase.default(":memory:");
};

exports["CmsDatabase: prepareAsync"] = async () => {
  const cmsDatabase = new _CmsDatabase.default(":memory:");
  return await cmsDatabase.prepareAsync();
};

exports["CmsDatabase: getCmsDatabaseAsync"] = async () => {
  return await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
};
//# sourceMappingURL=CmsDatabase.js.map