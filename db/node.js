const mongoose = require('mongoose')
const { Schema } = mongoose;
const db = require('db/connection');

const NodeSchema = new Schema({
    name:  String,

    parent: {
        type: Schema.Types.ObjectId,
        ref: 'NodeSchema',
        default: null
    },

    children: [{
        type: Schema.Types.ObjectId,
        ref: 'NodeSchema'
    }],

    transform: {
        position: { type: [Number], default: [0,0,0] },
        rotation: { type: [Number], default: [0,0,0] },
        scale:    { type: [Number], default: [0,0,0] },
    },

    props: Schema.Types.Mixed,
});

module.exports = {
    NodeModel: db.model('Node', NodeSchema),
    NodeSchema
}
