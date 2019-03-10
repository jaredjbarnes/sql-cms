import * as assert from "assert";
import CmsDatabase from "../CmsDatabase";

exports["CmsDatabase: constructor with no sqliteFile"] = async () => {
    assert.throws(() => {
        const cmsDatabase = new CmsDatabase();
    }, {
            message: "Invalid Argument Exception: CmsDatabase needs to have a sqliteFile."
        });
}

exports["CmsDatabase: constructor with sqliteFile"] = async () => {
    const cmsDatabase = new CmsDatabase(":memory:");
}

exports["CmsDatabase: prepareAsync"] =  async () => {
    const cmsDatabase = new CmsDatabase(":memory:");
    return await cmsDatabase.prepareAsync();
}

exports["CmsDatabase: getCmsDatabaseAsync"] =  async () => {
    return await CmsDatabase.getCmsDatabaseAsync(":memory:");
}