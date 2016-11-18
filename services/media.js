/**
 * Created by kyle on 19/5/16.
 */


'use strict';
var logger = require('utils/logger');
var knox = require('knox');
var config = require('utils/config');
var S3_IMAGE_PATH = 'fp-images/';
var fs = require('fs');
var SNError = require('infra/errors/sn-error');
var client = knox.createClient({
    key: config.AWS.api_key,
    secret: config.AWS.api_secret,
    bucket: config.AWS.s3_bucket,
    region: "ap-southeast-1",
    style: "path"
});

module.exports = {
    uploadImageToS3 : function (localFilePath, imageName, callback){

        client.putFile(localFilePath , S3_IMAGE_PATH + imageName, { 'x-amz-acl': 'public-read' },function(err, res){

            if(err){
                logger.prettyError(err);
                return callback(new SNError(`Error putting file ${localFilePath} to S3 ${imageName}`));
            }

            if(res.statusCode === 200){
                logger.debug(`Successfuly put file ${localFilePath} to S3 image dir ${imageName} `);
                return callback(null, config.web_endpoint + S3_IMAGE_PATH + imageName);
            }
            else {
                return callback(new SNError(`Error putting file ${localFilePath} to S3. Response code = ` + res.statusCode));
            }
        })
    }
};