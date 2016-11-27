var sandbox = require('./../core/sandbox'),
    application = new scaleApp.Core(sandbox)
;

application.use(scaleApp.plugins.ls);
application.use(scaleApp.plugins.util);
application.use(scaleApp.plugins.submodule, {
    inherit: true,             // use all plugins from the parent's Core
    use: ['ls','submodule', 'util'],        // use some additional plugins
    useGlobalMediator: true   // emit and receive all events from the parent's Core
});

application.userAgent = new UAParser();

module.exports = application;