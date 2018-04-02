const express = require('express');
const bodyParser = require('body-parser');
const cookieParse = require("cookie-parser");

const config = require('./config');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParse());

const server = app.listen(config.port || 80, () => {
    const { port, address } = server.address()
    console.log(`Listening at http://${host}:${port}`)
});