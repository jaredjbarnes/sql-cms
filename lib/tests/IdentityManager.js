"use strict";

var assert = _interopRequireWildcard(require("assert"));

var _CmsDatabase = _interopRequireDefault(require("../CmsDatabase"));

var _IdentityManager = _interopRequireDefault(require("../managers/IdentityManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

exports["IdentityManager: constructor with no arguments."] = async () => {
  assert.throws(() => {
    const identityManager = new _IdentityManager.default();
  }, {
    message: "Null Argument Exception: IdentityManager expected an actingIdentity."
  });
};

exports["IdentityManager: constructor with actingIdentity."] = async () => {
  assert.throws(() => {
    const identityManager = new _IdentityManager.default({
      actingIdentity: {
        id: 0,
        name: "johndoe"
      }
    });
  }, {
    message: "Null Argument Exception: IdentityManager expected a cmsDatabase."
  });
};

exports["IdentityManager: constructor with actingIdentity and cmsDatabase."] = async () => {
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  assert.throws(() => {
    const identityManager = new _IdentityManager.default({
      actingIdentity: {
        id: 0,
        name: "johndoe"
      },
      cmsDatabase
    });
  }, {
    message: "Null Argument Exception: IdentityManager expected a secret for hashing passwords."
  });
};

exports["IdentityManager: constructor with valid arguments."] = async () => {
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  const identityManager = new _IdentityManager.default({
    actingIdentity: {
      id: 0,
      name: "johndoe"
    },
    cmsDatabase,
    secret: "secret"
  });
};

exports["IdentityManager: addIdentityAsync."] = async () => {
  const secret = "secret";
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  const identityManager = new _IdentityManager.default({
    actingIdentity: {
      id: 0,
      name: "admin",
      isAdmin: true
    },
    cmsDatabase,
    secret
  });
  await identityManager.addIdentityAsync({
    name: "johndoe"
  }, "password");
  const identity = await identityManager.getIdentityByNameAsync("johndoe");
  const otherIdentityManager = new _IdentityManager.default({
    actingIdentity: identity,
    cmsDatabase,
    secret
  });
  const isValid = await otherIdentityManager.validatePasswordAsync("password");
  assert.equal(isValid, true);
};

exports["IdentityManager: validatePasswordAsync, valid password."] = async () => {
  const secret = "secret";
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  const identityManager = new _IdentityManager.default({
    actingIdentity: {
      id: 0,
      name: "johndoe",
      isAdmin: true
    },
    cmsDatabase,
    secret: secret
  });
  await identityManager.addIdentityAsync({
    name: "johndoe"
  }, "password");
  let identity = await identityManager.getIdentityByNameAsync("johndoe");
  const otherIdentityManager = new _IdentityManager.default({
    actingIdentity: identity,
    cmsDatabase,
    secret
  });
  const isValid = await otherIdentityManager.validatePasswordAsync("password");
  assert.equal(isValid, true);
};

exports["IdentityManager: validatePasswordAsync, invalid password."] = async () => {
  const secret = "secret";
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  const identityManager = new _IdentityManager.default({
    actingIdentity: {
      id: 0,
      name: "johndoe",
      isAdmin: true
    },
    cmsDatabase,
    secret: secret
  });
  await identityManager.addIdentityAsync({
    name: "johndoe"
  }, "password");
  let identity = await identityManager.getIdentityByNameAsync("johndoe");
  const otherIdentityManager = new _IdentityManager.default({
    actingIdentity: identity,
    cmsDatabase,
    secret
  });

  try {
    const isValid = await otherIdentityManager.validatePasswordAsync("BadPa$$word");
  } catch (error) {
    assert.equal(error.message, "Invalid password.");
  }
};

exports["IdentityManager: removeIdentityAsync."] = async () => {
  const secret = "secret";
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  const identityManager = new _IdentityManager.default({
    actingIdentity: {
      id: 0,
      name: "admin",
      isAdmin: true
    },
    cmsDatabase,
    secret
  });
  await identityManager.addIdentityAsync({
    name: "johndoe"
  }, "password");
  let identity = await identityManager.getIdentityByNameAsync("johndoe");
  await identityManager.removeIdentityAsync(identity);
  identity = await identityManager.getIdentityByNameAsync("johndoe");
  assert.equal(identity, null);
};

exports["IdentityManager: resetPasswordAsync."] = async () => {
  const secret = "secret";
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  const identityManager = new _IdentityManager.default({
    actingIdentity: {
      id: 0,
      name: "admin",
      isAdmin: true
    },
    cmsDatabase,
    secret
  });
  await identityManager.addIdentityAsync({
    name: "johndoe"
  }, "password");
  let identity = await identityManager.getIdentityByNameAsync("johndoe");
  await identityManager.resetPasswordAsync(identity, "newPassword");
  const otherIdentityManager = new _IdentityManager.default({
    actingIdentity: identity,
    cmsDatabase,
    secret
  });
  const isValid = await otherIdentityManager.validatePasswordAsync("newPassword");
  assert.equal(isValid, true);
};

exports["IdentityManager: changePasswordAsync."] = async () => {
  const secret = "secret";
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  const identityManager = new _IdentityManager.default({
    actingIdentity: {
      id: 0,
      name: "admin",
      isAdmin: true
    },
    cmsDatabase,
    secret
  });
  await identityManager.addIdentityAsync({
    name: "johndoe"
  }, "password");
  let identity = await identityManager.getIdentityByNameAsync("johndoe");
  const otherIdentityManager = new _IdentityManager.default({
    actingIdentity: identity,
    cmsDatabase,
    secret
  });
  await otherIdentityManager.changePasswordAsync("password", "newPassword");
  const isValid = await otherIdentityManager.validatePasswordAsync("newPassword");
  assert.equal(isValid, true);
};

exports["IdentityManager: changePasswordAsync with invalid password."] = async () => {
  const secret = "secret";
  const cmsDatabase = await _CmsDatabase.default.getCmsDatabaseAsync(":memory:");
  const identityManager = new _IdentityManager.default({
    actingIdentity: {
      id: 0,
      name: "admin",
      isAdmin: true
    },
    cmsDatabase,
    secret
  });
  await identityManager.addIdentityAsync({
    name: "johndoe"
  }, "password");
  let identity = await identityManager.getIdentityByNameAsync("johndoe");
  const otherIdentityManager = new _IdentityManager.default({
    actingIdentity: identity,
    cmsDatabase,
    secret
  });

  try {
    await otherIdentityManager.changePasswordAsync("BadPassword", "newPassword");
  } catch (error) {
    assert.equal(error.message, "Invalid password.");
  }
};
//# sourceMappingURL=IdentityManager.js.map