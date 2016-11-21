/**
 * Created by kyle on 20/5/16.
 */

var config = require('utils/config');
var logger = require('utils/logger');
var shortid = require('shortid');
var Poll = require('../models/poll');
var DatabaseError = require('infra/errors/database-error');
var request = require('request');


var servicePoll = {
    createPoll : function (pollData, callback){
        var newPoll = new Poll({
            _id: shortid.generate(),
            layout : pollData.layout,
            reactions: pollData.reactions,
            texts : pollData.texts,
            background_images: pollData.background_images

        });

        if(pollData.dimension){
            newPoll.dimension = pollData.dimension;
        }

        newPoll.save(function (err) {
            if (err) {
                logger.prettyError(err);
                return new DatabaseError('Error saving new images');
            }

            logger.info('New poll successfully saved to database : ' + newPoll._id);
            return callback(null, newPoll);
        });
    },

    getPollById: function (pollId, callback){
        Poll.findById(pollId, function (err, poll) {
            if (err) {
                return callback(new DatabaseError(`Poll Id ${pollId} not found in database`));
            }
            return callback(null, poll);
        });
    },

    getReactionsCountFromFacebook: function(pollId, callback){
        var fbPostId = '10155141000811840';
        var fbAccessToken = 'EAACEdEose0cBAE5SxdSTIyQNbjv42FOm16O0KM4q766ecZAo8YUmZAUHS3zuw7WCmk2Quw69P9koEtMXAqSjOQPSarWPoLSbkvbdFIfWSaOrDEEv3cZA9ddRYXLbX9uMVBTC3iB2UlGZBUDRnZBrKNlvIhjs0x2ZCLvOWyWoxuywZDZD';
        var FACEBOOK_REACTION_COUNT_REQUEST = `https://graph.facebook.com/v2.8?id=${fbPostId}&fields=reactions.type(LIKE).limit(0).summary(total_count).as(reactions_like),reactions.type(LOVE).limit(0).summary(total_count).as(reactions_love),reactions.type(WOW).limit(0).summary(total_count).as(reactions_wow),reactions.type(HAHA).limit(0).summary(total_count).as(reactions_haha),reactions.type(SAD).limit(0).summary(total_count).as(reactions_sad),reactions.type(ANGRY).limit(0).summary(total_count).as(reactions_angry)&access_token=${fbAccessToken}`;

        request.get(FACEBOOK_REACTION_COUNT_REQUEST,
            function optionalCallback(err, httpResponse, body) {
                if (err || httpResponse.statusCode !== 200) {
                    logger.info('Failed to get reaction count for poll : ' + pollId );
                    return callback(err);
                }
                else {
                    logger.debug('successfully get reaction count from facebook for poll ' + pollId);
                    var data = JSON.parse(body);
                    logger.info("Data = " + JSON.stringify(data));

                    var countObject = {
                        like : data.reactions_like.summary.total_count,
                        love : data.reactions_love.summary.total_count,
                        wow : data.reactions_wow.summary.total_count,
                        haha : data.reactions_haha.summary.total_count,
                        sad : data.reactions_sad.summary.total_count,
                        angry : data.reactions_angry.summary.total_count
                    };

                    return callback(null, countObject);
                }
            });


    }
    
};

module.exports = servicePoll;
