const express = require('express');
const Scene = require('db/scene');
const { SceneCreateVM } = require('./view-models')
const { extractFieldsMiddleware } = require('api/utils')
const router = express.Router();

router.get('/', (req, res, next) => {
    Scene.find({}, (err, docs) => {
        if (err) {
            next(err);
            return;
        }

        res.send(docs);
    })
});

router.post('/', extractFieldsMiddleware(SceneCreateVM, true), (req, res, next) => {
    Scene.create({...req.body})
        .then(scene => res.send(scene))
        .catch(err => next(err))
});

module.exports = router;
