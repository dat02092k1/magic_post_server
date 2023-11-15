const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller')


router.post('/user', userController.create);
router.get('/user/:id', userController.getDetail);
router.put('/user/:id', userController.editDetails);

module.exports = router;