/**
 * Created by kyle on 9/5/16.
 */

var express = require('express');
var router = express.Router();
var pollController = require('../controllers/poll');

/* Create Gif File Here */
router.post('/create-poll', pollController.handleCreatePoll);

router.post('/upload-image', pollController.handleUploadImage);

module.exports = router;