const express = require("express");
const routes = require('./routes/tea');
var os = require("os");

require('dotenv').config();

const helmet = require('helmet');
const compression = require('compression');

const app = express();

app.use(helmet());
app.use(compression());

//import mongoose
const mongoose = require('mongoose');

//establish connection to database
mongoose.connect(
    process.env.MONGODB_URI,
    { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

app.use(express.json()); // parses incoming requests with JSON payloads

app.get('/', (req, res) => {
res.end(`<h1>${process.env.MESSAGE}, API End Point /tea </h1>`);}
);

app.use('/', routes); //to use the routes

const listener = app.listen(process.env.PORT || 3004, () => {
    console.log('App is listening on port ' + listener.address().port)
})
