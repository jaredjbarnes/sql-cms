import * as assert from "assert";
import CmsDatabase from "../CmsDatabase";
import IdentityManager from "../managers/IdentityManager";

exports["IdentityManager: constructor with no arguments."] = async () => {
    assert.throws(() => {
        const identityManager = new IdentityManager();
    },
        {
            message: "Null Argument Exception: IdentityManager expected an actingIdentity."
        }
    );
}

exports["IdentityManager: constructor with actingIdentity."] = async () => {
    assert.throws(() => {
        const identityManager = new IdentityManager({
            actingIdentity: {
                id: 0,
                name: "johndoe"
            }
        });
    },
        {
            message: "Null Argument Exception: IdentityManager expected a cmsDatabase."
        }
    );
}

exports["IdentityManager: constructor with actingIdentity and cmsDatabase."] = async () => {
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");

    assert.throws(() => {
        const identityManager = new IdentityManager({
            actingIdentity: {
                id: 0,
                name: "johndoe"
            },
            cmsDatabase
        });
    },
        {
            message: "Null Argument Exception: IdentityManager expected a secret for hashing passwords."
        }
    );
}

exports["IdentityManager: constructor with valid arguments."] = async () => {
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");
    const identityManager = new IdentityManager({
        actingIdentity: {
            id: 0,
            name: "johndoe"
        },
        cmsDatabase,
        secret: "secret"
    });
}

exports["IdentityManager: addIdentityAsync."] = async () => {
    const secret = "secret";
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");
    const identityManager = new IdentityManager({
        actingIdentity: {
            id: 0,
            name: "admin",
            isAdmin: true
        },
        cmsDatabase,
        secret
    });

    await identityManager.addIdentityAsync({ name: "johndoe" }, "password");
    const identity = await identityManager.getIdentityByNameAsync("johndoe");

    const otherIdentityManager = new IdentityManager({
        actingIdentity: identity,
        cmsDatabase,
        secret
    });

    const isValid = await otherIdentityManager.validatePasswordAsync("password");
    assert.equal(isValid, true);
}

exports["IdentityManager: validatePasswordAsync, valid password."] = async () => {
    const secret = "secret";
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");
    const identityManager = new IdentityManager({
        actingIdentity: {
            id: 0,
            name: "johndoe",
            isAdmin: true
        },
        cmsDatabase,
        secret: secret
    });

    await identityManager.addIdentityAsync({ name: "johndoe" }, "password");
    let identity = await identityManager.getIdentityByNameAsync("johndoe");

    const otherIdentityManager = new IdentityManager({
        actingIdentity: identity,
        cmsDatabase,
        secret
    });

    const isValid = await otherIdentityManager.validatePasswordAsync("password");
    assert.equal(isValid, true);

}

exports["IdentityManager: validatePasswordAsync, invalid password."] = async () => {
    const secret = "secret";
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");
    const identityManager = new IdentityManager({
        actingIdentity: {
            id: 0,
            name: "johndoe",
            isAdmin: true
        },
        cmsDatabase,
        secret: secret
    });

    await identityManager.addIdentityAsync({ name: "johndoe" }, "password");
    let identity = await identityManager.getIdentityByNameAsync("johndoe");

    const otherIdentityManager = new IdentityManager({
        actingIdentity: identity,
        cmsDatabase,
        secret
    });

    try {
        const isValid = await otherIdentityManager.validatePasswordAsync("BadPa$$word");
    } catch (error) {
        assert.equal(error.message, "Invalid password.");
    }

}

exports["IdentityManager: removeIdentityAsync."] = async () => {
    const secret = "secret";
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");
    const identityManager = new IdentityManager({
        actingIdentity: {
            id: 0,
            name: "admin",
            isAdmin: true
        },
        cmsDatabase,
        secret
    });

    await identityManager.addIdentityAsync({ name: "johndoe" }, "password");
    let identity = await identityManager.getIdentityByNameAsync("johndoe");
    await identityManager.removeIdentityAsync(identity);

    identity = await identityManager.getIdentityByNameAsync("johndoe");

    assert.equal(identity, null);

}

exports["IdentityManager: resetPasswordAsync."] = async () => {
    const secret = "secret";
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");
    const identityManager = new IdentityManager({
        actingIdentity: {
            id: 0,
            name: "admin",
            isAdmin: true
        },
        cmsDatabase,
        secret
    });

    await identityManager.addIdentityAsync({ name: "johndoe" }, "password");
    let identity = await identityManager.getIdentityByNameAsync("johndoe");
    await identityManager.resetPasswordAsync(identity, "newPassword");

    const otherIdentityManager = new IdentityManager({
        actingIdentity: identity,
        cmsDatabase,
        secret
    });

    const isValid = await otherIdentityManager.validatePasswordAsync("newPassword");
    assert.equal(isValid, true);

}

exports["IdentityManager: changePasswordAsync."] = async () => {
    const secret = "secret";
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");
    const identityManager = new IdentityManager({
        actingIdentity: {
            id: 0,
            name: "admin",
            isAdmin: true
        },
        cmsDatabase,
        secret
    });

    await identityManager.addIdentityAsync({ name: "johndoe" }, "password");
    let identity = await identityManager.getIdentityByNameAsync("johndoe");

    const otherIdentityManager = new IdentityManager({
        actingIdentity: identity,
        cmsDatabase,
        secret
    });

    await otherIdentityManager.changePasswordAsync("password", "newPassword");
    const isValid = await otherIdentityManager.validatePasswordAsync("newPassword");
    assert.equal(isValid, true);

}

exports["IdentityManager: changePasswordAsync with invalid password."] = async () => {
    const secret = "secret";
    const cmsDatabase = await CmsDatabase.getCmsDatabaseAsync(":memory:");
    const identityManager = new IdentityManager({
        actingIdentity: {
            id: 0,
            name: "admin",
            isAdmin: true
        },
        cmsDatabase,
        secret
    });

    await identityManager.addIdentityAsync({ name: "johndoe" }, "password");
    let identity = await identityManager.getIdentityByNameAsync("johndoe");

    const otherIdentityManager = new IdentityManager({
        actingIdentity: identity,
        cmsDatabase,
        secret
    });

    try {
        await otherIdentityManager.changePasswordAsync("BadPassword", "newPassword");
    } catch (error) {
        assert.equal(error.message, "Invalid password.");
    }

}
