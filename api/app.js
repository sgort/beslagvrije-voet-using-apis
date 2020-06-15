const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
const Morgan = require("morgan");
const cors = require("cors")

const gemeenteRoutes = require("./routes/gemeenten");
const waterschappenRoutes = require("./routes/waterschappen");
const userRoutes = require("./routes/users");
const invorderingRoutes = require('./routes/invorderingen');
const invorderingBankenRoutes = require('./routes/invorderingen_banken');
const invorderingOverheidRoutes = require('./routes/invorderingen_overheid');
const invorderingWehkampRoutes = require('./routes/invorderingen_wehkamp');
const credentialRoutes = require('./routes/credential');
const inschrijvingBRP = require('./routes/inschrijvingbrp');
const RulesEngineRoutes = require ('./routes/rules');

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

app.listen(9000, () => {
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
app.use("/invorderingenbanken", invorderingBankenRoutes);
app.use("/invorderingenoverheid", invorderingOverheidRoutes);
app.use("/invorderingenwehkamp", invorderingWehkampRoutes);
app.use("/credentials", credentialRoutes);
app.use("/inschrijvingbrp", inschrijvingBRP);
app.use("/rulesengine", RulesEngineRoutes);


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