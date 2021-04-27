const express = require('express');
const router = express.Router();

const reactCtrl = require('../controllers/react');
const auth = require('../middleware/auth');

router.post('/:threadId/message/:messageId/react', auth, reactCtrl.postReact); //react - post
router.get('/:threadId/message/:messageId/react', auth, reactCtrl.getAllReacts); //react - get
router.get('/:threadId/message/:messageId/react/:reactId', auth, reactCtrl.getReact); //reactId - get
router.put('/:threadId/message/:messageId/react/:reactId', auth, reactCtrl.modifyReact); //reactId - put
router.delete('/:threadId/message/:messageId/react/:reactId', auth, reactCtrl.deleteReact); //reactId - delete

module.exports = router;