/**
 * Created by kyle on 21/11/16.
 */

var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllerUser = require('../controllers/user');

router.get('/logout', controllerUser.handleLogout);

router.get('/login', controllerUser.handleLoginWithFacebook);

router.get('/login/facebook/callback', controllerUser.handleFacebookLoginCallback, controllerUser.handlePostLogin);

module.exports = router;