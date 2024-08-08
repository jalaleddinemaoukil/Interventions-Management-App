const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../utilities');

router.post('/create-account', userController.createAccount);
router.post('/login', userController.login);
router.get('/get-user', authenticateToken, userController.getUser);
router.post('/logout', userController.logout);
// router.get('/users', authenticateToken, userController.getUsers);


module.exports = router;
