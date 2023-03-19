import { DataSource } from "typeorm";
import {getConfig} from '@config';

const dbConfig = getConfig();

const AppDataSource = new DataSource({
    type: "postgres",
    host: dbConfig.database.host,
    port: dbConfig.database.port,
    username: dbConfig.database.user,
    password: dbConfig.database.pass,
    database: dbConfig.database.dbName,
    synchronize: true,
    entities: ["./src/models/**/*.ts"],
    migrations: ["./src/db/migrations/**/*.ts"],
    migrationsTableName: "migrations"
});

export default AppDataSource;