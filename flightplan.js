var plan = require('flightplan');

var appName = 'livepoll';
var username = 'lpdeploy';
var buildDirectory = 'public';

var tmpDir = appName + '_' + new Date().toISOString().replace(/T/g, '_').replace(/:/g, '-').replace(/\./g, '_').replace(/Z/g, '');

//Staging Server
plan.target('staging', [
    {
        host: 'ad2.felizz.com',
        username: username,
        privateKey: '/var/lib/jenkins/.ssh/id_rsa',
        agent: process.env.SSH_AUTH_SOCK
    }
]);

plan.target('production', [
    {
        host: 'pollsimply.com',
        username: username,
        privateKey: '/Users/kyle/.ssh/id_rsa',
        agent: process.env.SSH_AUTH_SOCK
    }
]);

// run commands on localhost
plan.local(function(local) {
    local.log('Build the directory');
    local.exec('npm run webpack');

    local.log('Copying files to remote hosts');
    var gitFiles = local.exec('git ls-files', {silent: true});
    local.transfer(gitFiles, '/tmp/' + tmpDir);

    var buildFiles = local.exec('find ' + buildDirectory, { silent: true });
    local.transfer(buildFiles, '/tmp/' + tmpDir);

});

// Deploy on remote server
plan.remote(function(remote) {
    remote.log('Move folder to deploy home directory');
    remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
    remote.rm('-rf /tmp/' + tmpDir);

    remote.log('npm install dependencies');
    remote.exec('npm --prefix ~/' + tmpDir + ' install --production');

    remote.log('Reload application');
    remote.exec('forever stop ' + appName, {failsafe: true});

    remote.sudo('ln -snf ~/' + tmpDir + ' ~/' + appName, {user: username});

    remote.exec('NODE_ENV=production forever --uid ' + appName + ' --append ' + ' --workingDir ~/' + appName + ' --sourceDir ~/' + appName + ' start bin/www');

    remote.log('Deployment finished.');
});
