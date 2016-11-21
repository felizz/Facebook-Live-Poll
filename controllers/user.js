/**
 * Created by kyle on 21/11/16.
 */

var passport = require('passport');
var config = require('utils/config');
var shortid = require('shortid');
var errReason = require('infra/error-reason');
var apiErrors = require('infra/api-errors');
var logger = require('utils/logger');
var validator = require('utils/validator');

var user = {

    handleLogout: function (req, res) {
        //req.user = null;
        req.logout();
        res.redirect('/');
    },


    handleLoginWithFacebook: function (req, res, next) {

        var callbackURL = config.web_prefix + '/user/login/facebook/callback';

        passport.authenticate(
            'facebook',
            {
                callbackURL: callbackURL,
                scope: [ 'email' ]
            }
        )(req, res, next);
    },

    handleFacebookLoginCallback: function (req, res, next) {

        var callbackURL = config.web_prefix + '/user/login/facebook/callback';

        passport.authenticate(
            'facebook',
            {
                callbackURL: callbackURL,
                scope: [ 'email' ]
            }
        )(req,res,next);
    },

    handlePostLogin : function (req, res){
        return res.redirect('/');
    }
};


module.exports = user;


