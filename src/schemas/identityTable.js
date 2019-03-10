export default {
    name: "identity",
    label: "Identities",
    description: "Identity Table",
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
            name: "hash",
            label: "Hash"
        },
        {
            type: "INTEGER",
            name: "isAdmin",
            label: "Is Administration"
        }
    ],
    primaryKeys: ["id"],
    unique: [
        {
            columns: ["name"],
            conflictOptions: "FAIL"
        }
    ],
}