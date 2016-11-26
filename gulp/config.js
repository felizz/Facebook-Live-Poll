var config = require('../configuration.json');

config.paths.absolute = {};

//generate absolute paths from relative ones
for(key in config.paths.relative){
    config.paths.absolute[key] = __dirname + '/../' + config.paths.relative[key];
}

module.exports = config;