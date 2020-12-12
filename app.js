const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const apiRouter = require('./routes/apiV1');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/apiV1', apiRouter);

module.exports = app;
