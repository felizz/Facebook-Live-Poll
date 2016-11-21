/**
 * Created by kyle on 20/5/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
    _id : {type: String, index: true},
    owner_id: {type: String},
    layout: {type: Number, default: 1}, // 1: Full layout, 2 : Half Layout, 4: Quarter layout
    background_images: [{type: String}],
    reactions: [{
        type: {type: Number}, // 0, 1, 2, 3, 4, 5
        x : {type: Number},
        y : {type: Number}
    }],
    texts : [{
        content: {type: String},
        size: {type: Number}, //
        x : {type: Number},
        y : {type: Number}
    }],
    dimension: {
        width: {type: Number, default: 600},
        height: {type: Number, default: 375}
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Poll', Poll);

