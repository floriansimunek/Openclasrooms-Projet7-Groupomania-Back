const express = require('express');
const router = express.Router();

//thread - post
router.post('/',(req, res, next) => {

});


//thread - get
router.get('/',(req, res, next) => {

});


//threadId - get
router.get('/:threadId',(req, res, next) => {

});

//threadId - put
router.put('/:threadId',(req, res, next) => {

});

//threadId - delete
router.delete('/:threadId',(req, res, next) => {

});

//message - post
router.post('/:threadId/message',(req, res, next) => {

});


//message - get
router.get('/:threadId/message',(req, res, next) => {

});

//messageId - get
router.get('/:threadId/message/:messageId',(req, res, next) => {

});

//messageId - put
router.put('/:threadId/message/:messageId',(req, res, next) => {

});

//messageId - delete
router.delete('/:threadId/message/:messageId',(req, res, next) => {

});

//gif - get
router.get('/:threadId/message/gif',(req, res, next) => {

});

module.exports = router;