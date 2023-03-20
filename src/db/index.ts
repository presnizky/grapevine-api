import { DataSource } from "typeorm";
import { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_HOST_PORT } from '@config/variables';


export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_HOST_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: true,
    entities: ["./src/models/**/*.ts"],
    migrations: ["./src/db/migrations/**/*.ts"],
    migrationsTableName: "migrations"
});