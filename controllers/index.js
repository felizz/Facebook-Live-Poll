/**
 * Created by kyle on 18/5/16.
 */
var shortid = require('shortid');
var logger = require('utils/logger');
var validator = require('utils/validator');
var statusCodes = require('infra/status-codes');
var errReason = require('infra/error-reason');
var apiErrors = require('infra/api-errors');
var passport = require('passport');
var config = require('utils/config');

module.exports = {
    renderHomePage: function (req, res) {
        return res.render('home',{req: req});
    }
};