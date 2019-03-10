"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class RoleManager {
  constructor({
    cmsDatabase,
    actingIdentity
  }) {
    const version = "1.0.0";
    this.actingIdentity = actingIdentity;
    this.database = cmsDatabase;
    this.rolesTable = this.database.getTable({
      name: "role",
      version
    });
    this.assignmentsTable = this.database.getTable({
      name: "assignment",
      version
    });
    this.isAdmin = actingIdentity.isAdmin !== 0;
  }

  _assertIsAdmin() {
    if (!this.isAdmin) {
      throw new Error("The acting identity needs to be an admin to manage role assignments.");
    }
  }

  async addRoleAsync(role) {
    this._assertIsAdmin();

    return await this.rolesTable.addAsync(role);
  }

  async removeRoleAsync(role) {
    this._assertIsAdmin();

    return await this.rolesTable.removeAsync(role);
  }

  async addRoleToIdentityAsync({
    role,
    identity
  }) {
    this._assertIsAdmin();

    const assignment = {
      roleId: role.id,
      identityId: identity.id
    };
    return await this.assignmentsTable.addAsync(assignment);
  }

  async removeRoleFromIdentityAsync({
    role,
    identity
  }) {
    this._assertIsAdmin();

    return await this.assignmentsTable.where().column("roleId").isEqualTo(role.id).and().column("identityId").isEqualTo(identity.id).removeAsync();
  }

  async getRoleByNameAsync({
    name
  }) {
    this._assertIsAdmin();

    return await this.rolesTable.where().column("name").isEqualTo(name).getFirstAsync();
  }

  async getRolesAsync() {
    const assignments = this.assignmentsTable.where().column("identityId").isEqualTo(this.actingIdentity.id).select({
      id: "id"
    });
    return await this.rolesTable.where().column("id").isIn(assignments).toArrayAsync();
  }

  async getRolesForIdentity(identity) {
    this._assertIsAdmin();

    const assignments = this.assignmentsTable.where().column("identityId").isEqualTo(identity.id).select({
      id: "id"
    });
    return await this.rolesTable.where().column("id").isIn(assignments).toArrayAsync();
  }

  async getAllRolesAsync() {
    this._assertIsAdmin();

    return await this.rolesTable.where().toArrayAsync();
  }

}

exports.default = RoleManager;
//# sourceMappingURL=RoleManager.js.map