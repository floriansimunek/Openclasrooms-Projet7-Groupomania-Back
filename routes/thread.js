const express = require('express');
const router = express.Router();

const threadCtrl = require('../controllers/thread');

router.post('/', threadCtrl.postThread); //thread - post
router.get('/', threadCtrl.getAllThread); //thread - get
router.get('/:threadId', threadCtrl.getThread); //threadId - get
router.put('/:threadId', threadCtrl.modifyThread); //threadId - put
router.delete('/:threadId', threadCtrl.deleteThread); //threadId - delete
router.post('/:threadId/message', threadCtrl.postMessage); //message - post
router.get('/:threadId/message', threadCtrl.getAllMessage); //message - get
router.get('/:threadId/message/:messageId', threadCtrl.getMessage); //messageId - get
router.put('/:threadId/message/:messageId', threadCtrl.modifyMessage); //messageId - put
router.delete('/:threadId/message/:messageId', threadCtrl.deleteMessage); //messageId - delete
router.get('/:threadId/message/gif', threadCtrl.postGif); //gif - get

module.exports = router;