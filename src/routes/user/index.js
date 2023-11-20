const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller')


router.post('/user/create', userController.create);
router.get('/user/get/:id', userController.getDetail);
router.put('/user/edit/:id', userController.editDetail);
router.delete('/user/delete/:id', userController.delete);

router.post('/login', userController.login);


module.exports = router;