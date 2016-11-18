/**
 * Created by kyle on 20/5/16.
 */

var config = require('utils/config');
var logger = require('utils/logger');
var shortid = require('shortid');
var Poll = require('../models/poll');
var DatabaseError = require('infra/errors/database-error');
var SNError = require('infra/errors/sn-error');


var servicePoll = {

    getPollById: function (imageId, callback){
        Poll.findById(imageId, function (err, image) {
            if (err) {
                return callback(new DatabaseError(`Image Id ${imageId} not found in database`));
            }
            return callback(null, image);
        });
    }
    
};

module.exports = servicePoll;
