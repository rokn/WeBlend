const mongoose = require('mongoose')
let debug = require('debug')('weblend-server:mongoose');

mongoose.connect(process.env.WB_MONGO_DB_URI,
    {useNewUrlParser: true})

const db = mongoose.connection;
db.on('error', () => {
    debug('Mongoose connection error')
})
db.on('open', () => {
    debug("Mongoose initialized");
})

module.exports = db