/**
 * Created by kyle on 9/5/16.
 */

var express = require('express');
var router = express.Router();
var controllerPoll = require('../controllers/poll');

router.post('/create', controllerPoll.handleCreatePoll);

router.post('/upload-image', controllerPoll.handleUploadImage);

router.get('/stream/:poll_id', controllerPoll.renderPollStreamPage);

module.exports = router;