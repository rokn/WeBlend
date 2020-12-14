const express = require('express');
const router = express.Router();

const scenesRouter = require('api/scenes/router');

router.use('/scenes', scenesRouter);

module.exports = router;
