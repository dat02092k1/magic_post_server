const express = require('express');

const router = express.Router();

router.use('/v1/api', require('./auth/index'));
router.use('/v1/api', require('./user/index'));
router.use('/v1/api', require('./department/index'));

module.exports = router;