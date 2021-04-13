const express = require('express');
const User = require('../models/User');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUsers); //user - get
router.post('/login', userCtrl.loginUser); //login - post
router.post('/register', userCtrl.createUser); //register - post
router.get('/me',(req, res, next) => userCtrl.getUserProfile); //me - get
router.get('/:userId',(req, res, next) => userCtrl.getUser); //userId - get
router.put('/:userId',(req, res, next) => userCtrl.modifyUser); //userId - put
router.delete('/:userId',(req, res, next) => userCtrl.deleteUser); //userId - delete

module.exports = router;