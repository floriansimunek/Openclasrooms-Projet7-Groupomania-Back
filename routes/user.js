const express = require('express');
const User = require('../models/User');
const router = express.Router();

//user - get
router.get('/',(req, res, next) => {
    next();
});


//login - post
router.post('/login',(req, res, next) => {
    next();
});

//register - post
router.post('/register',(req, res, next) => {
    //delete req.body.id;
    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
        .catch(error => res.status(400).json({ error }));
});


//me - get
router.get('/me',(req, res, next) => {
    next();
});


//userId - get
router.get('/:userId',(req, res, next) => {
    next();
});

//userId - put
router.put('/:userId',(req, res, next) => {
    next();
});

//userId - delete
router.delete('/:userId',(req, res, next) => {
    next();
});

module.exports = router;