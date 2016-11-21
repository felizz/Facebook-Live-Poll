var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../../models/user');
var config = require('utils/config');
var logger = require('utils/logger');

module.exports = function(passport) {

    passport.use('facebook', new FacebookStrategy({
        clientID        : config.facebook.app_id,
        clientSecret    : config.facebook.app_secret,
		profileFields : ['id', 'emails', 'name', 'displayName']
    }, function(access_token, refresh_token, profile, done) {
		
		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
	        User.findOne({ 'fb_id' : profile.id }, function(err, user) {

	        	// if there is an error, stop everything and return that
	        	// ie an error connecting to the database
	            if (err){
					logger.prettyError(err);
					return done(err);
				}

				// if the user is found, then log them in
	            if (user) {
					logger.info(`user ${profile.id} already exist `);
	                return done(null, user); // user found, return that user
	            } else {

					var newUser = new User({
						fb_id : profile.id,
						name : profile.displayName,
						email : profile.emails[0] ? profile.emails[0].value : null,
						avatar : "https://graph.facebook.com/" + profile.id + "/picture",
						fb_access_token : access_token
					});

					// save our user to the database
	                newUser.save(function(err) {
	                    if (err)
	                        throw err;
						logger.info(`Successfuly create new user ${profile.id} `);
	                    // if successful, return the new user
	                    return done(null, newUser);
	                });
	            }

	        });
        });

    }));

};
