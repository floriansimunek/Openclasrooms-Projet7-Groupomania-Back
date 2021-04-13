const express = require('express');
const User = require('../models/User');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUsers); //user - get
router.post('/login', userCtrl.loginUser); //login - post
router.post('/register', userCtrl.createUser); //register - post
router.get('/me', userCtrl.getUserProfile); //me - get
router.get('/:userId', userCtrl.getUser); //userId - get
router.put('/:userId', userCtrl.modifyUser); //userId - put
router.delete('/:userId', userCtrl.deleteUser); //userId - delete

module.exports = router;