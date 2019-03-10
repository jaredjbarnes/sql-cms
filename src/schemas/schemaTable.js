export default {
    name: "schema",
    label: "Schemas",
    description: "Schema",
    version: "1.0.0",
    columns: [
        {
            type: "INTEGER",
            name: "id",
            label: "Identity"
        },
        {
            type: "TEXT",
            name: "name",
            label: "Name"
        },
        {
            type: "TEXT",
            name: "version",
            label: "Version"
        },
        {
            type: "TEXT",
            name: "json",
            label: "JSON"
        },
        {
            type: "INTEGER",
            name: "workflowId",
            label: "Workflow Identity"
        }
    ],
    primaryKeys: ["id"],
    unique: [
        {
            columns: ["name", "version"],
            conflictOptions: "FAIL"
        }
    ],
    foreignKeys: {
        workflowId: {
            label: "Workflow",
            source: {
                name: "workflow",
                version: "1.0.0",
                label: "Schemas",
                column: "id"
            }
        }
    }
}