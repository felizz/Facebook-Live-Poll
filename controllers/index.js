/**
 * Created by kyle on 18/5/16.
 */
var shortid = require('shortid');
var servicePoll = require('../services/poll');
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
    },

    renderPollPage: function (req, res){
        var pollId = req.params.poll_id;
        if(!shortid.isValid(pollId)){
            return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
        }
        servicePoll.getPollById(pollId, function getPollCallback(err, poll) {
            if (err) {
                return apiErrors.INTERNAL_SERVER_ERROR.new().sendWith(res);
            }

            if(!poll){
                return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
            }

            return res.render('poll-view', {poll : poll,req: req});
        });
    }
};