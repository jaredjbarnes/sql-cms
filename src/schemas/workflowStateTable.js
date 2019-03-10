export default {
    name: "workflowState",
    label: "Workflow States",
    description: "Workflow State Table",
    version: "1.0.0",
    columns: [
        {
            type: "INTEGER",
            name: "id",
            label: "Identity"
        },
        {
            type: "INTEGER",
            name: "workflowId",
            label: "Workflow Identifier"
        },
        {
            type: "TEXT",
            name: "name",
            label: "Name"
        },
        {
            type: "TEXT",
            name: "description",
            label: "Description"
        }
    ],
    primaryKeys: ["id"],
    foreignKeys: {
        "workflowId": {
            "label": "Workflow",
            "source": {
                "name": "workflow",
                "version": "1.0.0",
                "label": "States",
                "column": "id"
            }
        }
    }
}