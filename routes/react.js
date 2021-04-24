const express = require('express');
const router = express.Router();

const reactCtrl = require('../controllers/react');
const auth = require('../middleware/auth');

router.post('/', /* auth, */ reactCtrl.postReact); //react - post
router.get('/', /* auth, */ reactCtrl.getAllReact); //react - get
router.get('/:reactId', /* auth, */ reactCtrl.getReact); //reactId - get
router.put('/:reactId', /* auth, */ reactCtrl.modifyReact); //reactId - put
router.delete('/:reactId', /* auth, */ reactCtrl.deleteReact); //reactId - delete

module.exports = router;