/**
 * Created by kyle on 20/5/16.
 */

var config = require('utils/config');
var logger = require('utils/logger');
var Poll = require('../models/poll');
var DatabaseError = require('infra/errors/database-error');
var RecordNotFoundError = require('infra/errors/record-not-found-error');
var request = require('request');
var serviceUser = require('./user');


var POLL_LAYOUT = {
  DEFAULT : 0,
  FULL_SINGLE_BACKGROUND: 1
};

var servicePoll = {
    POLL_LAYOUT : POLL_LAYOUT,

    createFixedSizePoll : function (_owner, layout, reactions, texts, images, callback){
        var newPoll = new Poll({
            _owner: _owner,
            layout : layout,
            reactions: reactions,
            texts : texts,
            images: images
        });

        newPoll.save(function (err) {
            if (err) {
                return callback(err);
            }

            logger.info('New poll successfully saved to database : ' + newPoll._id);
            return callback(null, newPoll);
        });
    },

    getPollById: function (pollId, callback){
        Poll.findById(pollId, function (err, poll) {
            return callback(err, poll);
        });
    },

    getPollByIdWithOwnerInfo: function (pollId, callback){

        Poll
            .findOne({ _id: pollId })
            .populate('_owner', '_id name avatar')
            .exec(function (err, poll) {
                return callback(err, poll);
            });
    },

    getPollByStreamId: function (streamId, callback){
        Poll.findOne({stream_id: streamId}, function (err, poll) {
            if (err) {
                return callback(new DatabaseError(`Poll Id ${streamId} not found in database`));
            }
            return callback(null, poll);
        });
    },

    getReactionsCountFromFacebook: function(pollId, callback){

        //Retrieve PostId and Access token for Facebook API request
        var fbPostId = '10155141000811840';
        var fbAccessToken = 'EAACEdEose0cBAE5SxdSTIyQNbjv42FOm16O0KM4q766ecZAo8YUmZAUHS3zuw7WCmk2Quw69P9koEtMXAqSjOQPSarWPoLSbkvbdFIfWSaOrDEEv3cZA9ddRYXLbX9uMVBTC3iB2UlGZBUDRnZBrKNlvIhjs0x2ZCLvOWyWoxuywZDZD';

        Poll.findById(pollId, function (err, poll) {
            if(err){
                return callback(err);
            }

            if(!poll.fb_video_id){
                return callback(new RecordNotFoundError('Video Id not set'));
            }

            serviceUser.getUserInfoById(poll._owner, function getUserCallback (err, owner){

                fbPostId = poll.fb_video_id;
                fbAccessToken = owner.fb_access_token;
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
            });
        });
    }
};

module.exports = servicePoll;
