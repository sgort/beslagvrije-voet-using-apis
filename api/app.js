const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const Morgan = require("morgan");
const cors = require("cors")

const gemeenteRoutes = require("./api/routes/gemeenten");
const waterschappenRoutes = require("./api/routes/waterschappen");
const userRoutes = require("./api/routes/users");
const invorderingRoutes = require('./api/routes/invorderingen');
const inschrijvingBRP = require('./api/routes/inschrijvingbrp');

const CONNECTION_URL = "mongodb+srv://dbUser:" +
    process.env.MONGO_ATLAS_PW +
    "@disciplmongodb-wc0s0.mongodb.net/demo?retryWrites=true&w=majority";
const DATABASE_NAME = "demo";

const app = Express();

app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.listen(3000, () => {
    mongoose.connect(CONNECTION_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error) {
            throw error;
        }
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

/**
 * Routes which should handle API requests
 */
app.use("/gemeenten", gemeenteRoutes);
app.use("/waterschappen", waterschappenRoutes);
app.use("/users", userRoutes);
app.use("/invorderingen", invorderingRoutes);
app.use("/inschrijvingbrp", inschrijvingBRP);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;