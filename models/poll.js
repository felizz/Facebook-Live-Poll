/**
 * Created by kyle on 20/5/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');


var Poll = new Schema({
    _id : {type: String, index: true},
    _owner: {type: String, ref : 'User'},
    stream_id: {type: String},

    layout: {type: Number}, //servicePoll.POLL_LAYOUT
    width : {type: Number},
    height: {type: Number},
    reactions: [{type: String}],
    texts : [{type: String}],
    images: [{type: String}],

    fb_video_id: {type: String},
    fb_stream_key: {type: String},

    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

Poll.pre('save', function (next){
    var self = this;

    if(this.isNew){
        self._id = shortid.generate();
        self.stream_id = shortid.generate();
    }

    next();
});

module.exports = mongoose.model('Poll', Poll);

