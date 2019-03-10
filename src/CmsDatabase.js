import schemas from "./schemas";
import { SqliteDatabase as Database } from "sqlite-repository";
import sqlite from "sqlite3";

export default class CmsDatabase  {
    constructor(sqliteFile) {
        if (sqliteFile == null){
            throw new Error("Invalid Argument Exception: CmsDatabase needs to have a sqliteFile.");
        }

        const sqliteDatabase = new sqlite.Database(sqliteFile);

        this.database = new Database ({
            database: sqliteDatabase,
            schemas: schemas
        });

    }

    async prepareAsync(){
        await this.database.createTablesFromSchemasAsync();
    }

    static async getCmsDatabaseAsync(sqliteFile){
        const cmsDatabase = new CmsDatabase(sqliteFile);
        await cmsDatabase.prepareAsync();

        return cmsDatabase.database;
    }
}