'use strict';

module.exports = function(sandbox){
    let _this = this;

    _this.bindEvents = () => {
        _this.objects.$accordionHeader
            .on('click', function(event){
                event.preventDefault();

                _this.objects.$accordion.addClass('active');
            })
        ;
    }

    _this.init = (data) => {
        _this.data = data || {};

        _this.objects = {};
        _this.objects.$container = $('#segment_instructions');
        _this.objects.$accordion = $('#accordion_instructions');
        _this.objects.$accordionHeader = _this.objects.$accordion.children('.header');

        _this.bindEvents();
    }
    _this.destroy = () => {}

    return {
        init: _this.init,
        destroy: _this.destroy
    }
}