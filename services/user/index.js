/**
 * Created by kyle on 21/11/16.
 */
var logger = require('utils/logger');
var User = require('../../models/user');
var DatabaseError = require('infra/errors/database-error');
var RecordNotFoundError = require('infra/errors/record-not-found-error');

var user = {
    getUserInfoById: function (userId, callback) {
        User.findById(userId, function (err, user) {
            return callback(err, user);
        });
    }
};

module.exports = user;