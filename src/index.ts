// import "reflect-metadata";
import { startServer } from "./app";
import { AppDataSource } from "@db";

async function main() {
    AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
    const app = await startServer();
}

main();