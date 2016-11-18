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

var mediaService = require('../services/media');
var shortid = require('shortid');
var multer  = require('multer');
var passport = require('passport');
var config = require('utils/config');

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

        //var errRes = apiErrors.INVALID_PARAMETERS.new();
        //
        ////Request Validation
        //if(!validator.isURL(req.body.video_url)){
        //    errRes.putError('video_url', errReason.INVALID_FORMAT);
        //}
        //
        //if(!req.body.start_time || !validator.isNumeric(req.body.start_time.replace(/\./g, ""))){
        //    errRes.putError('start_time', errReason.INVALID_FORMAT);
        //}
        //
        //if(!req.body.duration || !validator.isNumeric(req.body.duration.replace(/\./g, ""))){
        //    errRes.putError('duration', errReason.INVALID_FORMAT);
        //}
        //
        //if (errRes.hasError()) {
        //    return errRes.sendWith(res);
        //}
        //
        //var startTime = parseInt(req.body.start_time), duration = parseInt(req.body.duration);
        //
        //if(duration <= 0 || duration > 15) {
        //    errRes.putError('duration', errReason.OUT_OF_BOUND);
        //}
        //
        //if (errRes.hasError()) {
        //    return errRes.sendWith(res);
        //}
        //
        //var imageId = shortid.generate();
        //
        //return res.status(statusCodes.OK).send({image_id : imageId});
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
    }
};

module.exports = poll;


