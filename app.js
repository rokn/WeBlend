const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('app-module-path').addPath(__dirname);
const cors = require('cors')

const apiRouter = require('routes/apiV1');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/apiV1', apiRouter);

module.exports = app;
