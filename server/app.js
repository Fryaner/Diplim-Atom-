const routers = require('./routes/index');
require('dotenv').config();
const sequelize = require('./db');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const models = require('./models/models');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', routers)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    }
    catch (e) {
        console.log(e);
    }
}
start()
module.exports = app;
