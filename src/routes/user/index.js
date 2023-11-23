const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller')
const verifyMiddileware = require('../../middleware/verify');
const { aclMiddleware } = require('../../middleware/aclMiddleware');


router.post('/user/create', verifyMiddileware.verifyToken, aclMiddleware, userController.create);
router.get('/user/get/:id', userController.getDetail);
router.put('/user/edit/:id', userController.editDetail);
router.delete('/user/delete/:id', userController.delete);


module.exports = router;