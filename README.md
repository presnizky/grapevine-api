# NodeJS project starter

## 👋 Intro

This is basic Nodejs project starter. Its goal is to offer a simple way to start new api applications. It offers:

- Models
- GraphQL
- Services
- Migrations
- Environment specific configurations

## Running the project

### Dependencies

- Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### Commands

1. clone this project
2. run `cd <project_name>`
3. run `cp .env.example .env` to create a local .env file
4. use the following data to configure the database connection.  If you prefer to use another instance of Postgres, modify the connection strings as needed.
    # Database
    DB_HOST=grapevine-db
    DB_DATABASE=grapevine
    DB_USER=grapevine
    DB_PASSWORD=grapevine
    DB_SQLLOG=
    DB_SSL=
    DB_HOST_PORT=5432

    The Dockerfile specifies the node platform to be `--platform=linux/amd64` to allow it to run on M1 Macbooks.  Feel free to remove that setting as needed.
5. run `npm run docker:start:dev` <-- this will create the Docker containers for the app and database
6. run `npm install`
7. run `npm run migrate:up` <-- this will run some migrations to create the database and add initial data
8. run `npm run start:dev` to start the backend service.

visit `http://localhost:3000/graphql` to access the graphql playground.  It's not needed to run this project, but it's useful to run queries or mutations, and check data types, structures, etc.

## Project Structure

The full folder structure of this app is explained below:

| Name                                     | Description                                                                                |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| **src**                                  | Contains the source code                                                                   |
| **src/config**                           | Contains the project general configuration                                                 |
| **src/graphql**                          | Contains the graphql schema definition with its types and resolvers                        |
| **src/models**                           | Models define Sequelize schemas that will be used in storing and retrieving data           |
| **src/services**                         | Services that group logic to process information                                           |
| **src**/index.ts                         | Entry point to the express app                                                             |

