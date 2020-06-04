import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import schema from "./graphql/";

const app = express();
const PORT = process.env.PORT || "4000";
const CONNECTION_URL = "mongodb+srv://dbUser:" +
    process.env.MONGO_ATLAS_PW +
    "@disciplmongodb-wc0s0.mongodb.net/demo?retryWrites=true&w=majority";
const DATABASE_NAME = "demo";


// Connect to MongoDB with Mongoose.
mongoose.connect(CONNECTION_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        throw error;
    }
    console.log("GraphQl playground connected to `" + DATABASE_NAME + "`!");
});

app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressGraphQL({
      schema,
      graphiql: true
    })
  );
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));