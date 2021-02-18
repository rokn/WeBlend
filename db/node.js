const mongoose = require('mongoose')
const { Schema } = mongoose;
const db = require('db/connection');

const NodeSchema = new Schema();
NodeSchema.add({
    name:  String,

    parent: {
        type: NodeSchema,
        default: null
    },

    children: [NodeSchema],

    transform: {
        position: { type: [Number], default: [0,0,0] },
        rotation: { type: [Number], default: [0,0,0] },
        scale:    { type: [Number], default: [1,1,1] },
        origin:   { type: [Number], default: [0,0,0] },
    },

    props: Schema.Types.Mixed,
});

module.exports = {
    NodeModel: db.model('Node', NodeSchema),
    NodeSchema
}
