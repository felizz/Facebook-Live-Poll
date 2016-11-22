/**
 * Created by kyle on 20/5/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');


var Poll = new Schema({
    _id : {type: String, index: true},
    owner_id: {type: String},
    stream_id: {type: String},

    layout: {type: Number, default: 1}, //servicePoll.POLL_LAYOUT
    reactions: [{type: String}],
    texts : [{type: String}],
    images: [{type: String}],

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

