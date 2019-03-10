export default class SchemaManager {
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