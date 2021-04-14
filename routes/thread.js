const express = require('express');
const router = express.Router();

const threadCtrl = require('../controllers/thread');
const auth = require('../middleware/auth');

router.post('/', auth, threadCtrl.postThread); //thread - post
router.get('/', auth, threadCtrl.getAllThread); //thread - get
router.get('/:threadId', auth, threadCtrl.getThread); //threadId - get
router.put('/:threadId', auth, threadCtrl.modifyThread); //threadId - put
router.delete('/:threadId', auth, threadCtrl.deleteThread); //threadId - delete
router.post('/:threadId/message', auth, threadCtrl.postMessage); //message - post
router.get('/:threadId/message', auth, threadCtrl.getAllMessage); //message - get
router.get('/:threadId/message/:messageId', auth, threadCtrl.getMessage); //messageId - get
router.put('/:threadId/message/:messageId', auth, threadCtrl.modifyMessage); //messageId - put
router.delete('/:threadId/message/:messageId', auth, threadCtrl.deleteMessage); //messageId - delete
router.get('/:threadId/message/gif', auth, threadCtrl.postGif); //gif - get

module.exports = router;