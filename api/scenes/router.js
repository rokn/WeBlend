const express = require('express');
const Scene = require('db/scene');
const { SceneCreateVM } = require('./view-models')
const { extractFieldsMiddleware } = require('api/utils')
const router = express.Router();

router.get('/', (req, res, next) => {
    Scene.find()
        .then(scenes => res.send(scenes))
        .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
    Scene.findById(req.params.id)
        .then(scene => res.send(scene))
        .catch(_ => res.status(404).end());
});

router.post('/', extractFieldsMiddleware(SceneCreateVM, true), (req, res, next) => {
    Scene.create({...req.body})
        .then(scene => res.send(scene))
        .catch(err => next(err))
});

module.exports = router;
