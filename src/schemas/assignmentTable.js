export default {
    name: "assignment",
    label: "Assignments",
    description: "Assignment Table",
    version: "1.0.0",
    columns: [
        {
            type: "INTEGER",
            name: "id",
            label: "Identifier"
        },
        {
            type: "INTEGER",
            name: "roleId",
            label: "Role Identifier"
        },
        {
            type: "INTEGER",
            name: "identityId",
            label: "Identity Identifier"
        }
    ],
    primaryKeys: ["id"],
    foreignKeys: {
        roleId: {
            label: "Role",
            source: {
                name: "role",
                version: "1.0.0",
                label: "Assignments",
                column: "id"
            }
        },
        identityId: {
            label: "Identity",
            source: {
                name: "identity",
                version: "1.0.0",
                label: "Assignments",
                column: "id"
            }
        }
    }
}