# TODO Web Application

## Prerequisites

In case you intend to set up the project locally, make sure you have the following tools installed on your machine

- Node.js >=20.9.0
- npm >=10.1.0
- PostgreSQL

## Installation & Launch

Before attempting to launch the project, create a configuration `.env` file inside `/server` directory by referencing the provided [example](https://github.com/nkfrv1/automaze-test-task/blob/main/server/.env.example), and fill in the necessary environment variables for full functionality.

- Locally:

    1. Run `npm install` to install all the project dependencies

        *In case you encounter any version-related issues during this process, you can run `npm clean-install` to directly install dependencies of specific versions from a package-lock.json file*

    2. Run `npm run migrate` to create the database, apply migrations and generate prisma client

    3. Use `npm run dev` to run the server in development mode
    
    4. Repeat the first and third steps in the `/client` folder to start the client

- via Docker:

    1. Run `docker compose up` to create and start containers, including the client one
