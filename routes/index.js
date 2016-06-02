var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index');

router.get('/', indexController.renderHomePage);

router.get('/create', indexController.renderCreatePage);

router.get('/:gif_name', indexController.renderGifPage);

router.get('/loadmore', indexController.handleLoadmoreImage);

module.exports = router;
