var express = require('express');
var router = express.Router();
var controllerIndex = require('../controllers/index');
var controllerPoll = require('../controllers/poll');

router.get('/', controllerIndex.renderHomePage);

router.get('/poll/:poll_id', controllerPoll.renderPollPage);

router.get('/s/:stream_id', controllerPoll.renderStreamPage);

module.exports = router;

