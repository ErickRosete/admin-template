const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolvers = require("./graphql/resolvers/index");

const externalRequest = require("./middleware/external-requests");

const app = express();

app.use(bodyParser.json());

app.use(externalRequest);

app.use(
    "/graphql",
    expressGraphQL({
        schema: graphqlSchema,
        rootValue: graphqlResolvers,
        graphiql: true
    })
);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASSWORD
        }@admincluster-zdvxr.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
    )
    .then(() => app.listen(5000))
    .catch(err => console.log(err));