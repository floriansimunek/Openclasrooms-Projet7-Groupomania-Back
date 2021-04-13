const express = require('express');
const router = express.Router();

const reactCtrl = require('../controllers/react');

router.post('/', reactCtrl.postReact); //react - post
router.get('/', reactCtrl.getAllReact); //react - get
router.get('/:reactId', reactCtrl.getReact); //reactId - get
router.put('/:reactId', reactCtrl.modifyReact); //reactId - put
router.delete('/:reactId', reactCtrl.deleteReact); //reactId - delete

module.exports = router;