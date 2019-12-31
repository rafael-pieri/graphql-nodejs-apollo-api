[![Build Status](https://travis-ci.com/rafael-pieri/graphql-nodejs-apollo-api.svg?branch=master)](https://travis-ci.com/rafael-pieri/graphql-nodejs-apollo-api)

## GraphQL with nodeJS and apollo server
To learn more about graphQL, visit its documentation at: `https://graphql.org/`

We can also get more information about Apollo Server at: `https://www.apollographql.com/docs/apollo-server/`

### How to run the application
Execute the following command to provide a database instance:
`docker run --name mysql-instance -p 3306:3306 -e MYSQL_USER=root -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=usermanagerDB -d mysql:5.7`

Once the database is up and working, run the command below in order to create the tables and your default records:
`knex migrate:latest`

An admin user will be created to perform database operations as there are some permission validations in the graphQL API.

To start the application, execute the command: `npm start`.

A graphical interface called playground will be available for making API calls. To access it, go to: `http://localhost:4000`.

Below is an example call to get the token that will be needed on all graphQL API calls:

**Request:**

    query {
        login(
                data: {
            email: "admin@admin.com.br",
            password:"admin123"
            }
        ) {
            name,
            token
        }
    }

**Response:**

    {
        "data": {
            "login": {
            "name": "admin",
            "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20uYnIiLCJwcm9maWxlcyI6WyJhZG1pbmlzdHJhdG9yIl0sImlhdCI6MTU3Nzc2NDIzMSwiZXhwIjoxNTc4MDIzNDMxfQ.3Oh1hU0S8cKUEhsNBtRMLBKWSpcG1enckV2vayik4Ww"
            }
        }
    }

### Tech Stack
- NodeJS
- GraphQL
- Apollo Server
- MySQL
- Knex
- Travis CI

### Improvements that must be made
- Function composition
- Code organization
- Remove code duplication
- Create a docker compose