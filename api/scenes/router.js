const express = require('express');
const { SceneModel } = require('db/scene');
const { SceneCreateVM } = require('./view-models')
const { extractFieldsMiddleware } = require('api/utils')
const router = express.Router();

router.get('/', (req, res, next) => {
    SceneModel.find()
        .then(scenes => res.send(scenes))
        .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
    SceneModel.findById(req.params.id)
        .then(scene => (scene !== null) ? res.send(scene) : res.sendStatus(404))
        .catch(_ => res.status(500).end());
});

router.put('/:id', (req, res, next) => {
    SceneModel.findById(req.params.id)
        .then(scene => (scene !== null) ? res.send(scene) : res.sendStatus(404))
        .catch(_ => res.status(500).end());
});

router.delete('/:id', (req, res, next) => {
    SceneModel.findByIdAndDelete(req.params.id)
        .then(deleted => (deleted !== null) ? res.sendStatus(200) : res.sendStatus(404))
        .catch(_ => res.status(500).end());
});

router.post('/', extractFieldsMiddleware(SceneCreateVM, false), (req, res, next) => {
    SceneModel.create({...req.body})
        .then(scene => res.send(scene.id))
        .catch(err => next(err))
});

module.exports = router;
