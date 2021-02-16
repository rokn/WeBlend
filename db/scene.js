const mongoose = require('mongoose')
const { Schema } = mongoose;
const db = require('db/connection');
const { NodeSchema } = require('./node')

const SceneSchema = new Schema({
    name:  String,
    author: String,
    createdDate: { type: Date, default: Date.now },
    root: { type: NodeSchema, default: () => ({name: '__root'}) },

    store: Schema.Types.Mixed,
});

module.exports = {
    SceneModel: db.model('Scene', SceneSchema),
    SceneSchema
}
