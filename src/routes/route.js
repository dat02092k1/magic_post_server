const express = require('express');

const router = express.Router();
const userController = require('../controllers/user.controller')
const verifyMiddileware = require('../middleware/verify');
const { aclMiddleware } = require('../middleware/aclMiddleware');
const userRouter = require('./user/index')

router.use('/v1/api', require('./auth/index'));
router.use('/v1/api', userRouter);
router.use('/v1/api', require('./department/index'));
router.use('/v1/api', require('./admin/index'));
router.use('/v1/api', require('./order/index'));

// router.post('/v1/api/user/create', verifyMiddileware.verifyToken, aclMiddleware, userController.create);

module.exports = router;