const mongoose = require('mongoose')
const { Schema } = mongoose;
const db = require('db/connection');

const sceneSchema = new Schema({
    name:  String,
    author: String,
    createdDate: { type: Date, default: Date.now },
});

module.exports = db.model('Scene', sceneSchema)
