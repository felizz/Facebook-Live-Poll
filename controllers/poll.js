/**
 * Created by kyle on 9/5/16.
 */
/**
 * Created by kyle on 28/12/15.
 */

var statusCodes = require('infra/status-codes');
var errReason = require('infra/error-reason');
var apiErrors = require('infra/api-errors');
var logger = require('utils/logger');
var validator = require('utils/validator');
var IMG_DIR = 'public/images/';
var servicePoll = require('../services/poll');

var mediaService = require('../services/media');
var shortid = require('shortid');
var multer  = require('multer');
var passport = require('passport');
var config = require('utils/config');

var NodeCache = require('node-cache');
var fbCache = new NodeCache();
var CACHING_TTL = 4; //seconds


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, IMG_DIR);
    },

    filename: function (req, file, cb) {
        cb(null, shortid.generate() +  ".jpg");
    }
});

var upload = multer({ storage: storage,   limits: {fileSize: 10 * 1024 * 1024} });


var poll = {
    handleCreatePoll: function (req, res) {
        logger.debug('Request Data = ' + JSON.stringify(req.body));

        servicePoll.createFixedSizePoll(req.user._id, servicePoll.POLL_LAYOUT.DEFAULT, req.body.reactions, req.body.texts, req.body.images, function createPollCallback(err, poll){

            if (err) {
                logger.prettyError(err);
                return apiErrors.UNPROCESSABLE_ENTITY.new('Error during processing file upload.').sendWith(res);
            }

            return res.status(statusCodes.OK).send(poll);
        });
    },

    handleUploadImage: function (req, res) {

        upload.single('fileToUpload')(req, res, function (err) {
            if (err) {
                logger.prettyError(err);
                return apiErrors.UNPROCESSABLE_ENTITY.new('Error during processing file upload.').sendWith(res);
            }

            mediaService.uploadImageToS3(IMG_DIR + req.file.filename, req.file.filename, function uploadS3Callback(err, url){
                return res.status(statusCodes.CREATED).send({url: url});
            });
        });
    },

    renderPollPage: function (req, res){
        var pollId = req.params.poll_id;
        if(!shortid.isValid(pollId)){
            logger.prettyError(err);
            return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
        }
        servicePoll.getPollById(pollId, function getPollCallback(err, poll) {
            if (err) {
                return apiErrors.INTERNAL_SERVER_ERROR.new().sendWith(res);
            }

            if(!poll){
                return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
            }

            return res.render('poll', {poll : poll,req: req});
        });
    },


    renderStreamPage: function (req, res){
        var streamId = req.params.stream_id;
        if(!shortid.isValid(streamId)){
            return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
        }
        servicePoll.getPollByStreamId(streamId, function getPollByStreamIdCallback(err, poll) {
            if (err) {
                logger.prettyError(err);
                return apiErrors.INTERNAL_SERVER_ERROR.new().sendWith(res);
            }

            if(!poll){
                return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
            }

            return res.render('stream', {poll : poll,req: req});
        });
    },

    updateAdditionalInfo: function(req, res){
        var pollId = req.params.poll_id;
        if(!shortid.isValid(pollId)){
            return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
        }

        servicePoll.getPollById(pollId, function getPollCallback(err, poll) {
            if (err) {
                logger.prettyError(err);
                return apiErrors.INTERNAL_SERVER_ERROR.new().sendWith(res);
            }

            if(!poll){
                return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
            }

            poll.fb_video_id = req.body.fb_video_id;
            poll.fb_stream_key = req.body.fb_stream_key;
            poll.save(function (err) {
                if (err) {
                    logger.prettyError(err);
                    return apiErrors.INTERNAL_SERVER_ERROR.new().sendWith(res);
                }

                logger.info('Poll successfully updated : ' + poll._id);
                return res.status(statusCodes.OK).send(poll);
            });
        });
    },

    getReactionsCount: function(req, res){
        var pollId = req.params.poll_id;
        if(!shortid.isValid(pollId)){
            return apiErrors.RESOURCE_NOT_FOUND.new().sendWith(res);
        }

        //Using Node Cache to ensure we doesn't pass Facebook API Request Limit
        fbCache.get(pollId, function (err, cachedCountObject) {
            if (err || !cachedCountObject) {
                servicePoll.getReactionsCountFromFacebook(pollId, function getPollCallback(err, countObject) {
                    if (err || !countObject) {
                        return apiErrors.INTERNAL_SERVER_ERROR.new().sendWith(res);
                    }

                    fbCache.set(pollId, countObject, CACHING_TTL);
                    return res.status(statusCodes.OK).send(countObject);
                });
            }
            else{
                return res.status(statusCodes.OK).send(cachedCountObject);
            }
        });
    }
};

module.exports = poll;


