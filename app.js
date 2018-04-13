require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParse = require("cookie-parser");
const cors = require('cors');
const logger = require('./utility/logger');

const config = require('./config');
const router = require('./router');
const statis = require('./middlewares/statistic');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParse());
app.use(cors(config.cors));

app.use(statis.apiRecord);

app.use('/v1', router);

app.use(errorHandler);

const server = app.listen(config.port || 80, () => {
    const { port, address } = server.address();
    logger.info(`Listening at http://${address}:${port}`);
});