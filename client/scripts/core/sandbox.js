var sandbox = function(core, instanceId, options, moduleId) {

    // define your API
    this.namespace = "manadr";

    // e.g. provide the Mediator methods 'on', 'emit', etc.
    core._mediator.installTo(this);

    // ... or define your custom communication methods
    this.myEmit = function(channel, data){
        core.emit(channel + '/' + instanceId, data);
    };

    // maybe you'd like to expose the instance ID
    this.id = instanceId;

    this.options = options;

    //temporarily put on sandbox for ease access
    this.userAgent = new UAParser();

    return this;
};

module.exports = sandbox;