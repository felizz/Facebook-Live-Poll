/**
 * Created by kyle on 21/11/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var userController = require('../controllers/user');

router.get('/login', userController.handleUserLogin);

router.get('/logout', userController.handleLogout);

router.get('/login/facebook/callback', userController.handleloginFbCallback, userController.handlePostLogin);

module.exports = router;