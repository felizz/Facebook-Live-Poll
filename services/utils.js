/**
 * Created by kyle on 21/5/16.
 */
var request = require('request');
var logger = require('utils/logger');
module.exports = {

    precacheURLToFacebook : function (url){

        if(process.env.NODE_ENV !== 'production'){
            return;
        }

        var fbCacheURL  = 'https://graph.facebook.com?scrape=true&id=' + url;

        request.post(fbCacheURL, null ,
            function optionalCallback(err, httpResponse, body) {
                if (err) {
                    logger.info('Failed to facebook-cache  url : ' + url);
                }
                else if( httpResponse.statusCode !== 200){
                    logger.info('Retry facebook-cache url: ' + url);
                    request.post(fbCacheURL);
                }
                else {
                    logger.info('successfully facebook-cache url ' + url + ' succeeded : Response: ' + body);
                }
            });
    }
};