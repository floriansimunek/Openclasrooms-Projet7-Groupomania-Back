const express = require('express');
const User = require('../models/User');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.get('/', auth, userCtrl.getAllUsers); //user - get
router.post('/login', userCtrl.loginUser); //login - post
router.post('/register', userCtrl.createUser); //register - post
router.get('/me', auth, userCtrl.getUserProfile); //me - get
router.get('/:userId', auth, userCtrl.getUser); //userId - get
router.put('/:userId', auth, userCtrl.modifyUser); //userId - put
router.delete('/:userId', auth, userCtrl.deleteUser); //userId - delete

module.exports = router;