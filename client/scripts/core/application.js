var manaDrSandbox = require('./../core/sandbox'),
    manaDrApplication = new scaleApp.Core(manaDrSandbox)
;

manaDrApplication.use(scaleApp.plugins.ls);
manaDrApplication.use(scaleApp.plugins.util);
manaDrApplication.use(scaleApp.plugins.submodule, {
    inherit: true,             // use all plugins from the parent's Core
    use: ['ls','submodule', 'util'],        // use some additional plugins
    useGlobalMediator: true   // emit and receive all events from the parent's Core
});

manaDrApplication.userAgent = new UAParser();

module.exports = manaDrApplication;