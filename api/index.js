import mongoose from "mongoose";
import { GraphQLServer, PubSub } from "graphql-yoga";

import schema from "./graphql/";
import { models } from "./config/db/";

const CONNECTION_URL = "mongodb+srv://dbUser:" +
    process.env.MONGO_ATLAS_PW +
    "@disciplmongodb-wc0s0.mongodb.net/demo?retryWrites=true&w=majority";
const DATABASE_NAME = "demo";

const pubsub = new PubSub();

const options = {
  port: process.env.PORT || "4000",
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
};

const context = {
  models,
  pubsub
};

// Connect to MongoDB with Mongoose.
mongoose.connect(CONNECTION_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw error;
    }
    console.log("GraphQl playground connected to `" + DATABASE_NAME + "`!");
});

const server = new GraphQLServer({
    schema,
    context
  });
  
  server.start(options, ({ port }) => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
  