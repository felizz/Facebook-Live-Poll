var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index');

router.get('/', indexController.renderHomePage);

router.get('/:poll_id', indexController.renderPollPage);

module.exports = router;

