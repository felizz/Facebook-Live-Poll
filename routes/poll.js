/**
 * Created by kyle on 9/5/16.
 */

var express = require('express');
var router = express.Router();
var controllerPoll = require('../controllers/poll');

router.post('/create', controllerPoll.handleCreatePoll);

router.post('/upload-image', controllerPoll.handleUploadImage);

//For updating Facebook Video Id and Stream Key
router.post('/:poll_id/update-additional-info', controllerPoll.updateAdditionalInfo);

router.get('/:poll_id/reactions-count', controllerPoll.getReactionsCount);


module.exports = router;