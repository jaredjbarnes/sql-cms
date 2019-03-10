"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IdentityManager {
  constructor(options = {}) {
    this._assertOptions(options);

    this.actingIdentity = options.actingIdentity;
    this.identitiesTable = options.cmsDatabase.getTable({
      name: "identity",
      version: "1.0.0"
    });
    this.secret = options.secret;
  }

  _assertOptions({
    cmsDatabase,
    actingIdentity,
    secret
  }) {
    if (actingIdentity == null) {
      throw new Error("Null Argument Exception: IdentityManager expected an actingIdentity.");
    }

    if (cmsDatabase == null) {
      throw new Error("Null Argument Exception: IdentityManager expected a cmsDatabase.");
    }

    if (this._isNullOrEmpty(secret)) {
      throw new Error("Null Argument Exception: IdentityManager expected a secret for hashing passwords.");
    }
  }

  _isNullOrEmpty(value) {
    return value == null || value === "";
  }

  _createHash(value) {
    return _crypto.default.createHmac('sha256', this.secret).update(value, "utf8").digest("hex");
  }

  _assertIsAdmin() {
    if (this.isAdmin) {
      throw new Error("The acting identity needs to be an admin to manage role assignments.");
    }
  }

  _assertValidIdentity(identity, password) {
    if (this._isNullOrEmpty(identity.name)) {
      throw new Error("An identity's name cannot be null or empty.");
    }

    if (this._isNullOrEmpty(password)) {
      throw new Error();
    }
  }

  async addIdentityAsync(identity, password) {
    this._assertIsAdmin();

    this._assertValidIdentity(identity, password);

    identity.hash = this._createHash(password);
    return await this.identitiesTable.addAsync(identity);
  }

  async removeIdentityAsync(identity) {
    this._assertIsAdmin();

    return await this.identitiesTable.removeAsync(identity);
  }

  async validatePasswordAsync(password) {
    const hash = this._createHash(password);

    const identity = await this.identitiesTable.where().column("id").isEqualTo(this.actingIdentity.id).and().column("hash").isEqualTo(hash).getFirstAsync();

    if (identity == null) {
      throw new Error("Invalid password.");
    }

    ;
    return true;
  }

  async resetPasswordAsync(identity, newPassword) {
    this._assertIsAdmin();

    const newHash = this._createHash(newPassword);

    return await this.identitiesTable.where().column("id").isEqualTo(identity.id).updateAsync({
      hash: newHash
    });
  }

  async getIdentityByNameAsync(name) {
    return await this.identitiesTable.where().column("name").isEqualTo(name).getFirstAsync();
  }

  async changePasswordAsync(oldPassword, newPassword) {
    const oldHash = this._createHash(oldPassword);

    const foundIdentity = await this.identitiesTable.where().column("id").isEqualTo(this.actingIdentity.id).and().column("hash").isEqualTo(oldHash).getFirstAsync();

    if (foundIdentity == null) {
      throw new Error("Invalid password.");
    }

    const newHash = this._createHash(newPassword);

    return await this.identitiesTable.where().column("id").isEqualTo(this.actingIdentity.id).and().column("hash").isEqualTo(oldHash).updateAsync({
      hash: newHash
    });
  }

}

exports.default = IdentityManager;
//# sourceMappingURL=IdentityManager.js.map