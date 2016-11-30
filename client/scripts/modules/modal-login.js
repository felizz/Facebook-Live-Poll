'use strict';

module.exports = function(sandbox){
    let _this = this;

    _this.show = () => {
        let template = multiline(() => {/*!@preserve
            <p>PollSimply offer free tool to create Live Poll on Facebook. Please Login by Facebook to enjoy those features.</p>
            <p>We will keep this tool remain free forever so if you like it please consider donating to us at the top right corner!</p>
             <a href="/user/login" class="btn btn-primary">Login by Facebook</a>
        */console.log}),
            $modal = bootbox.dialog({
            title: 'Login to create<br/> your first live poll',
            message: swig.render(template),
            className: 'modal-login',
            closeButton: false
        })
    }

    _this.init = (data) => {
        console.log('modal-login');

        _this.show();
    }
    _this.destroy = () => {}

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}