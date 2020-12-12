const express = require('express');
const router = express.Router();

const scenesRouter = require('api/scene');

router.use('/scenes', scenesRouter);

module.exports = router;
