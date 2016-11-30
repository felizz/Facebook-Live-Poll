'use strict';

module.exports = function(sandbox){
    let _this = this;

    _this.init = (data) => {
        console.log('ladning');

        sandbox.sub.register('moduleModalLogin', require('./../modules/modal-login'));

        sandbox.sub.start();
    }
    _this.destroy = () => {}

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}