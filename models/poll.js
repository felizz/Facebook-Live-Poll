/**
 * Created by kyle on 20/5/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    _id : {type: String, index: true},
    title: {type: String},
    description: {type: String},
    layout: {type: Number, default: 0}, // 0, 1, 2, 3
    background_images: [{type: String}],
    reactions: [{
        type: {type: Number}, // 0, 1, 2, 3, 4, 5
        x : {type: Number},
        y : {type: Number}
    }],
    text : [{
        size: {type: Number}, // 0, 1, 2, 3, 4, 5
        x : {type: Number},
        y : {type: Number}
    }],
    width: {type: Number, default: 600},
    height: {type: Number, default: 375},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Poll', Poll);

